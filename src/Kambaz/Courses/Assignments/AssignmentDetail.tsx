import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Assignment, getAssignmentById, deleteAssignment, toggleAssignmentPublished } from '../../../services/AssignmentService';
import { User } from '../../../contexts/UserContext';
import { formatDate, isDateInFuture, isDateInPast } from '../../../utils/dateUtils';
import './Assignment.css';
import { useUser } from '../../../contexts/useUser';
import { Submission, getUserSubmissions } from '../../../services/SubmissionService';

// Check if user has permission to edit assignments
const hasEditPermission = (user: User | null) => {
  return user && (user.role === 'ADMIN' || user.role === 'FACULTY');
};

export default function AssignmentDetail() {
  // Get parameters from URL
  const { cid, assignmentId } = useParams<{ cid: string, assignmentId: string }>();
  const navigate = useNavigate();
  
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useUser();
  const [userSubmission, setUserSubmission] = useState<Submission | null>(null);
  
  // Handle potential complex paths, extract the actual course ID
  let courseId = cid;
  useEffect(() => {
    if (cid && cid.includes('/')) {
      const pathParts = cid.split('/');
      if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
        courseId = pathParts[0];
      }
      console.log(`AssignmentDetail - Extracting course ID from path '${cid}': '${courseId}'`);
    }
  }, [cid]);
  
  // Get assignment details
  useEffect(() => {
    if (!assignmentId) {
      setError('Assignment ID is missing');
      return;
    }
    
    const fetchAssignment = async () => {
      setLoading(true);
      try {
        console.log(`AssignmentDetail - Attempting to fetch assignment, ID: ${assignmentId}`);
        // Use updated API function, courseId not needed
        const data = await getAssignmentById(courseId || '', assignmentId);
        setAssignment(data);
        
        // Debug date information
        console.log('Assignment data:', data);
        console.log('Assignment due date:', data.dueDate);
        console.log('Current time:', new Date().toISOString());
        console.log('Is past due:', isDateInPast(data.dueDate));
        
        // Get current user's submission information for this assignment
        if (currentUser && assignmentId) {
          try {
            const response = await getUserSubmissions(assignmentId);
            if (response && response.data && response.data.submissions && response.data.submissions.length > 0) {
              // Get the latest submission
              const userSubmissions = response.data.submissions;
              setUserSubmission(userSubmissions[0]);
              console.log('User submission info:', userSubmissions[0]);
            }
          } catch (err) {
            console.error('Error fetching user submissions:', err);
            // Don't block page loading, just log the error
          }
        }
      } catch (err) {
        console.error('Error fetching assignment:', err);
        setError('Unable to load assignment details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAssignment();
  }, [assignmentId, courseId, currentUser]);
  
  // Handle deleting assignment
  const handleDelete = async () => {
    if (!assignmentId) return;
    
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        console.log(`AssignmentDetail - Attempting to delete assignment, ID: ${assignmentId}`);
        // Use updated API function
        await deleteAssignment(courseId || '', assignmentId);
        // After successful deletion, return to assignments list page
        navigate(`/Kambaz/Courses/${courseId}/Assignments`);
      } catch (err) {
        console.error('Error deleting assignment:', err);
        setError('Cannot delete assignment, please try again later.');
      }
    }
  };
  
  // Handle toggling publish status
  const handleTogglePublish = async () => {
    if (!assignmentId || !assignment) return;
    
    try {
      console.log(`AssignmentDetail - Attempting to change publish status, assignment ID: ${assignmentId}`);
      // Use updated API function
      const updatedAssignment = await toggleAssignmentPublished(
        courseId || '', 
        assignmentId, 
        !assignment.isPublished
      );
      
      setAssignment(updatedAssignment);
    } catch (err) {
      console.error('Error toggling assignment publish status:', err);
      setError('Cannot update assignment publish status, please try again later.');
    }
  };
  
  // Handle submitting assignment (student)
  const handleSubmitAssignment = () => {
    if (!assignmentId) return;
    navigate(`/Kambaz/Courses/${courseId}/Assignments/${assignmentId}/submit`);
  };
  
  // Handle viewing submissions list (faculty)
  const handleViewSubmissions = () => {
    if (!assignmentId) return;
    navigate(`/Kambaz/Courses/${courseId}/Assignments/${assignmentId}/submissions`);
  };
  
  if (loading) {
    return <div className="loading">Loading assignment details...</div>;
  }
  
  if (error || !assignment) {
    return (
      <div className="error">
        {error || 'Assignment not found.'}
        <div>
          <Link to={`/Kambaz/Courses/${courseId}/Assignments`} className="back-link">
            Back to Assignments
          </Link>
        </div>
      </div>
    );
  }
  
  const isAvailable = !isDateInFuture(assignment.availableDate);
  const isPastDue = isDateInPast(assignment.dueDate);
  
  return (
    <div className="assignment-detail">
      <div className="assignment-header">
        <h2 className="assignment-title">
          {assignment.title}
          {!assignment.isPublished && <span className="unpublished-badge"> (Unpublished)</span>}
        </h2>
        
        {/* Management buttons */}
        {hasEditPermission(currentUser) && (
          <div className="assignment-actions">
            <button 
              onClick={handleTogglePublish}
              className="publish-btn"
            >
              {assignment.isPublished ? "Unpublish" : "Publish"}
            </button>
            <Link 
              to={`/Kambaz/Courses/${courseId}/Assignments/${assignmentId}/edit`}
              className="edit-btn"
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="delete-btn"
            >
              Delete
            </button>
            <button 
              onClick={handleViewSubmissions}
              className="view-submissions-btn"
            >
              View Submissions
            </button>
          </div>
        )}
      </div>
      
      <div className="assignment-meta">
        <div className="points-info">
          <strong>Points:</strong> {assignment.points}
        </div>
        <div className="date-info">
          <div><strong>Available Date:</strong> {formatDate(assignment.availableDate)}</div>
          <div><strong>Due Date:</strong> {formatDate(assignment.dueDate)}</div>
        </div>
      </div>
      
      <div className="assignment-description">
        <h3>Assignment Description</h3>
        <div className="description-content">
          {assignment.description || 'No description provided.'}
        </div>
      </div>
      
      {/* Display grade information */}
      {userSubmission && userSubmission.grade !== undefined && (
        <div className="submission-grade-section">
          <h3>Your Grade</h3>
          <div className="grade-display">
            <strong>{userSubmission.grade}</strong> / {assignment.points}
          </div>
          {userSubmission.feedback && (
            <div className="feedback-section">
              <h4>Feedback</h4>
              <div className="feedback-content">{userSubmission.feedback}</div>
            </div>
          )}
        </div>
      )}
      
      {/* Submit button - display for all users */}
      {currentUser && isAvailable && (
        <div className="submission-section">
          <button 
            onClick={handleSubmitAssignment}
            className="submit-assignment-btn"
            disabled={isPastDue}
          >
            {isPastDue ? 'Past Due - Cannot Submit' : 'Submit Assignment'}
          </button>
          {isPastDue && <div className="past-due-warning">This assignment has passed the due date.</div>}
        </div>
      )}
      
      <div className="back-link-container">
        <Link to={`/Kambaz/Courses/${courseId}/Assignments`} className="back-link">
          Back to Assignments
        </Link>
      </div>
    </div>
  );
}
