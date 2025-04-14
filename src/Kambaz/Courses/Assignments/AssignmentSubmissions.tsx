import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Assignment, getAssignmentById } from '../../../services/AssignmentService';
import { Submission, getAllSubmissions, gradeSubmission, SubmissionGradeInput } from '../../../services/SubmissionService';
import { formatDate } from '../../../utils/dateUtils';
import { User } from '../../../contexts/UserContext';
import './SubmissionStyle.css';
import { useUser } from '../../../contexts/useUser';

// Check if user has permission to view and grade submissions (ADMIN or FACULTY roles)
const hasGradingPermission = (user: User | null) => {
  return user && (user.role === 'ADMIN' || user.role === 'FACULTY');
};

// Define props interface
interface AssignmentSubmissionsProps {
  cid?: string;
  assignmentId?: string;
}

export default function AssignmentSubmissions({ cid: providedCourseId, assignmentId: providedAssignmentId }: AssignmentSubmissionsProps) {
  // Get course and assignment IDs from URL parameters if not provided via props
  const params = useParams<{ cid: string, assignmentId: string }>();
  const urlCid = params.cid;
  const urlAssignmentId = params.assignmentId;
  
  // Prioritize values provided through props, then use URL parameters
  const [courseId, setCourseId] = useState<string | undefined>(providedCourseId || urlCid);
  const assignmentIdValue = providedAssignmentId || urlAssignmentId;
  
  useEffect(() => {
    // Handle potential complex paths, extract the actual course ID (for non-wrapper component cases)
    if (!providedCourseId && urlCid && urlCid.includes('/')) {
      const pathParts = urlCid.split('/');
      // If the first part is not a known path name, consider it as the course ID
      if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
        setCourseId(pathParts[0]);
        console.log(`AssignmentSubmissions - Extracting course ID from path '${urlCid}': '${pathParts[0]}'`);
      }
    }
  }, [providedCourseId, urlCid]);
  
  // State
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { currentUser } = useUser();
  
  // Grading related state
  const [gradingSubmissionId, setGradingSubmissionId] = useState<string | null>(null);
  const [gradeValue, setGradeValue] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  
  // Get assignment details and all submissions
  useEffect(() => {
    if (!courseId || !assignmentIdValue) {
      setError('Course ID or assignment ID is missing.');
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(`AssignmentSubmissions - Attempting to fetch assignment details, course ID: ${courseId}, assignment ID: ${assignmentIdValue}`);
        
        // Get assignment details - provide empty string fallback values to satisfy TypeScript type checking
        const assignmentData = await getAssignmentById(courseId || '', assignmentIdValue || '');
        setAssignment(assignmentData);
        
        console.log(`AssignmentSubmissions - Attempting to fetch submission list, assignment ID: ${assignmentIdValue}`);
        
        // Get all submissions - now only need to pass assignmentId
        const submissionsResponse = await getAllSubmissions(assignmentIdValue || '');
        if (submissionsResponse.success) {
          // Sort submissions by submission time (newest first)
          const sortedSubmissions = submissionsResponse.data.submissions.sort(
            (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          );
          setSubmissions(sortedSubmissions);
        } else {
          throw new Error('Failed to fetch submission list');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [courseId, assignmentIdValue]);
  
  // Start grading a submission
  const handleStartGrading = (submission: Submission) => {
    setGradingSubmissionId(submission._id);
    
    // Initialize input fields with existing values
    // If submission is already graded, use existing value, otherwise use 0
    setGradeValue(submission.grade !== undefined ? submission.grade : 0);
    
    // If there's existing feedback, use that, otherwise use empty string
    setFeedback(submission.feedback || '');
  };
  
  // Cancel grading
  const handleCancelGrading = () => {
    setGradingSubmissionId(null);
    setGradeValue(0);
    setFeedback('');
  };
  
  // Submit grade
  const handleSubmitGrade = async (submissionId: string) => {
    if (!assignmentIdValue) return;
    
    // Check if grade is within valid range
    if (assignment && (gradeValue < 0 || gradeValue > assignment.points)) {
      setError(`Grade must be between 0 and ${assignment.points}`);
      return;
    }
    
    try {
      const gradeData: SubmissionGradeInput = {
        grade: gradeValue,
        feedback: feedback
      };
      
      // Update function call, remove unnecessary assignmentId parameter
      const updatedSubmission = await gradeSubmission(
        submissionId, 
        gradeData
      );
      
      // Update submission list
      setSubmissions(prev => 
        prev.map(sub => 
          sub._id === submissionId ? updatedSubmission : sub
        )
      );
      
      setSuccessMessage('Grade successfully submitted!');
      setGradingSubmissionId(null);
    } catch (err) {
      console.error('Error submitting grade:', err);
      setError('Unable to submit grade, please try again later.');
    }
  };
  
  // Get user name display function (would normally get user info from API, simplified to show user ID here)
  const getUserDisplayName = (userId: string) => {
    return userId;
  };
  
  if (loading && !assignment) {
    return <div className="loading">Loading submissions...</div>;
  }
  
  // If user does not have grading permission, do not allow access
  if (!hasGradingPermission(currentUser)) {
    return (
      <div className="error-container">
        <div className="error">Only faculty and administrators can view and grade submissions.</div>
        <Link 
          to={`/Kambaz/Courses/${courseId}/Assignments/${assignmentIdValue}`} 
          className="back-link"
        >
          Back to Assignment
        </Link>
      </div>
    );
  }

  return (
    <div className="assignment-submissions-container">
      <div className="assignment-header">
        <h2>{assignment?.title || 'Assignment'} - Submissions</h2>
        {assignment && (
          <div className="assignment-meta">
            <div className="points-info">
              <strong>Points:</strong> {assignment.points}
            </div>
            <div className="date-info">
              <div><strong>Due date:</strong> {formatDate(assignment.dueDate)}</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Error and success messages */}
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      {/* Submission list */}
      <div className="submissions-list">
        <h3>All Submissions ({submissions.length})</h3>
        
        {submissions.length === 0 ? (
          <div className="no-submissions">No submissions yet.</div>
        ) : (
          submissions.map(submission => (
            <div key={submission._id} className="submission-item">
              <div className="submission-header">
                <div className="submission-user">
                  <strong>Student:</strong> {getUserDisplayName(submission.userId)}
                </div>
                <div className="submission-date">
                  <strong>Submitted:</strong> {formatDate(submission.submittedAt)}
                </div>
              </div>
              
              <div className="submission-content">
                <strong>Content:</strong>
                <div className="content-text">{submission.content}</div>
              </div>
              
              {submission.fileUrls && submission.fileUrls.length > 0 && (
                <div className="submission-files">
                  <strong>Files:</strong>
                  <ul>
                    {submission.fileUrls.map((url, fileIndex) => (
                      <li key={fileIndex}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          {url.split('/').pop()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Grading area */}
              {gradingSubmissionId === submission._id ? (
                <div className="grading-form">
                  <h4>Grade this submission</h4>
                  <div className="form-group">
                    <label htmlFor={`grade-${submission._id}`}>
                      Grade (0-{assignment?.points || 100})
                    </label>
                    <input
                      type="number"
                      id={`grade-${submission._id}`}
                      value={gradeValue}
                      onChange={(e) => setGradeValue(Number(e.target.value))}
                      min={0}
                      max={assignment?.points || 100}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`feedback-${submission._id}`}>Feedback</label>
                    <textarea
                      id={`feedback-${submission._id}`}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={4}
                      placeholder="Provide feedback for the student..."
                    />
                  </div>
                  
                  <div className="grading-buttons">
                    <button 
                      type="button" 
                      onClick={handleCancelGrading}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleSubmitGrade(submission._id)}
                      className="submit-button"
                    >
                      Submit Grade
                    </button>
                  </div>
                </div>
              ) : (
                <div className="submission-grade-info">
                  {submission.grade !== undefined ? (
                    <div className="graded-submission">
                      <div className="grade-display">
                        <strong>Grade:</strong> {submission.grade} / {assignment?.points || 100}
                      </div>
                      
                      {submission.feedback && (
                        <div className="feedback-display">
                          <strong>Feedback:</strong>
                          <div className="feedback-text">{submission.feedback}</div>
                        </div>
                      )}
                      
                      <button 
                        onClick={() => handleStartGrading(submission)}
                        className="edit-grade-button"
                      >
                        Edit Grade
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleStartGrading(submission)}
                      className="grade-button"
                    >
                      Grade Submission
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      <div className="back-link-container">
        <Link to={`/Kambaz/Courses/${courseId}/Assignments/${assignmentIdValue}`} className="back-link">
          Back to Assignment
        </Link>
      </div>
    </div>
  );
}
