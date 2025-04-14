import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Submission, 
  SubmissionInput, 
  getUserSubmissions, 
  createSubmission, 
  updateSubmission 
} from '../../../services/SubmissionService';
import { Assignment, getAssignmentById } from '../../../services/AssignmentService';
import { formatDate, isDateInPast } from '../../../utils/dateUtils';
import { useUser } from '../../../contexts/useUser';
import './SubmissionStyle.css';

// Define props interface
interface AssignmentSubmitProps {
  cid?: string;
  assignmentId?: string;
}

export default function AssignmentSubmit({ cid: providedCourseId, assignmentId: providedAssignmentId }: AssignmentSubmitProps) {
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
        console.log(`AssignmentSubmit - Extracting course ID from path '${urlCid}': '${pathParts[0]}'`);
      }
    }
  }, [providedCourseId, urlCid]);
  
  // State
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [previousSubmissions, setPreviousSubmissions] = useState<Submission[]>([]);
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { currentUser } = useUser();
  
  // Get assignment details and previous submissions
  useEffect(() => {
    if (!courseId || !assignmentIdValue) {
      setError('Course ID or assignment ID is missing.');
      return;
    }
    
    const fetchData = async () => {
      try {
        console.log(`AssignmentSubmit - Fetching assignment details, course ID: ${courseId}, assignment ID: ${assignmentIdValue}`);
        
        // Get assignment details
        const assignmentData = await getAssignmentById(courseId, assignmentIdValue);
        setAssignment(assignmentData);
        
        console.log(`AssignmentSubmit - Fetching user submission records, assignment ID: ${assignmentIdValue}`);
        
        // Get previous submissions - now only need to pass assignmentId
        const submissionsResponse = await getUserSubmissions(assignmentIdValue);
        if (submissionsResponse.success) {
          // Sort submissions by submission time (newest first)
          const sortedSubmissions = submissionsResponse.data.submissions.sort(
            (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
          );
          setPreviousSubmissions(sortedSubmissions);
          
          // If there are previous submissions, prefill content
          if (sortedSubmissions.length > 0) {
            setContent(sortedSubmissions[0].content);
            setUploadedFileUrls(sortedSubmissions[0].fileUrls || []);
          }
        } else {
          console.warn('Failed to get previous submissions, might be the first submission');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load assignment data, please try again later.');
      }
    };
    
    fetchData();
  }, [courseId, assignmentIdValue]);
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // Remove selected files
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  // Remove uploaded files
  const handleRemoveUploadedFile = (url: string) => {
    setUploadedFileUrls(prev => prev.filter(fileUrl => fileUrl !== url));
  };
  
  // Handle drag and drop files
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  // Upload files
  const uploadFiles = async (): Promise<string[]> => {
    if (files.length === 0) {
      return uploadedFileUrls; // If no new files, return already uploaded URLs
    }
    
    try {
      setUploading(true);
      
      // Since the backend hasn't implemented file upload functionality, we temporarily just display filenames
      console.log('File upload functionality is currently unavailable, only showing filenames');
      
      // Create a fake URL array containing filenames
      const fakeUrls = files.map(file => `file://${file.name}`);
      
      // Merge existing URLs with new fake URLs
      return [...uploadedFileUrls, ...fakeUrls];
      
      // Original file upload code (currently unavailable)
      /*
      // Upload files one by one
      const promises = files.map(file => uploadSubmissionFile(file));
      const newUrls = await Promise.all(promises);
      
      // Merge existing URLs with new URLs
      return [...uploadedFileUrls, ...newUrls];
      */
    } catch (err) {
      console.error('Error uploading files:', err);
      // When error occurs, still return existing URLs to ensure text content can be submitted
      return uploadedFileUrls;
    } finally {
      setUploading(false);
    }
  };
  
  // Submit assignment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assignmentIdValue || !currentUser) {
      setError('Assignment ID or user data is missing, please relogin or reload the page.');
      return;
    }
    
    // Check if content is filled
    if (!content.trim() && files.length === 0 && uploadedFileUrls.length === 0) {
      setError('Please fill in the submission content or upload files.');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Upload files first
      const fileUrls = await uploadFiles();
      
      // Create submission data
      const submissionData: SubmissionInput = {
        content,
        fileUrls
      };
      
      let newSubmission: Submission;
      
      // Check if there are already submissions
      if (previousSubmissions.length > 0) {
        // Find the latest submission
        const latestSubmission = previousSubmissions[0]; 
        
        console.log(`AssignmentSubmit - Updating existing submission, submission ID: ${latestSubmission._id}`);
        
        // Check if the submission has already been graded
        if (latestSubmission.grade !== undefined && latestSubmission.grade !== null) {
          setError('Cannot update a submission that has already been graded. Please contact your instructor.');
          setSubmitting(false);
          return;
        }
        
        // Strictly include only content and fileUrls fields, don't send other data
        const updateData = {
          content: content,
          fileUrls: fileUrls
        };
        
        try {
          // Use update API - now only need to pass submissionId and submissionData
          newSubmission = await updateSubmission(
            latestSubmission._id,
            updateData
          );
          
          // Update data in the list
          setPreviousSubmissions(prev => {
            const updated = [...prev];
            updated[0] = newSubmission;
            return updated;
          });
        } catch (error: any) {
          // If update fails but submission might be already graded or past due, try creating a new submission
          if (error.message && (
              error.message.includes('already graded') || 
              error.message.includes('been graded') ||
              error.message.includes('due date') ||
              error.message.includes('deadline'))) {
            
            console.log('Attempting to create a new submission instead of updating existing one');
            try {
              // Create new submission
              newSubmission = await createSubmission(assignmentIdValue, submissionData);
              
              // Add to the top of the list
              setPreviousSubmissions(prev => [newSubmission, ...prev]);
            } catch (createError: any) {
              console.error('Creating new submission also failed:', createError);
              throw createError;  // Rethrow error for subsequent handling
            }
          } else {
            // Rethrow original error
            throw error;
          }
        }
      } else {
        console.log(`AssignmentSubmit - Creating new submission, assignment ID: ${assignmentIdValue}`);
        
        // Create new submission
        newSubmission = await createSubmission(assignmentIdValue, submissionData);
        
        // Add to the top of the list
        setPreviousSubmissions(prev => [newSubmission, ...prev]);
      }
      
      // Show success message
      setSuccessMessage('Assignment submitted successfully!');
      
      // Clear form
      setContent('');
      setFiles([]);
      setUploadedFileUrls([]);
    } catch (err) {
      console.error('Error submitting assignment:', err);
      
      // Extract more specific error message
      let errorMessage = 'Assignment submission failed, please try again later.';
      if (err instanceof Error) {
        if (err.message.includes('already submitted')) {
          errorMessage = 'You have already submitted this assignment. Trying to update existing submission...';
          
          // Can add automatic retry logic here, using update API
          try {
            if (previousSubmissions.length > 0) {
              const latestSubmission = previousSubmissions[0];
              const submissionData: SubmissionInput = {
                content,
                fileUrls: await uploadFiles()
              };
              
              const updatedSubmission = await updateSubmission(
                latestSubmission._id,
                submissionData
              );
              
              setPreviousSubmissions(prev => {
                const updated = [...prev];
                updated[0] = updatedSubmission;
                return updated;
              });
              
              setSuccessMessage('Successfully updated existing submission!');
              setFiles([]);
              setSubmitting(false);
              return;
            }
          } catch (retryErr) {
            console.error('Retry updating submission failed:', retryErr);
            errorMessage = 'Failed to update existing submission, please try again later.';
          }
        } else {
          errorMessage = `Submission failed: ${err.message}`;
        }
      }
      
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Check if the user is a student
  const isStudent = currentUser?.role === 'STUDENT';
  
  // Check if the due date has passed
  const isPastDue = assignment ? isDateInPast(assignment.dueDate) : false;
  
  if (!assignment) {
    return <div className="loading">Loading assignment details...</div>;
  }
  
  // If not a student, do not allow submission
  if (!isStudent) {
    return (
      <div className="error-container">
        <div className="error">Only students can submit assignments.</div>
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
    <div className="assignment-submit-container">
      <header className="assignment-header">
        <h2>Submit Assignment: {assignment.title}</h2>
        <div className="assignment-meta">
          <div><strong>Available Date:</strong> {formatDate(assignment.availableDate)}</div>
          <div><strong>Due Date:</strong> {formatDate(assignment.dueDate)}</div>
          <div><strong>Points:</strong> {assignment.points}</div>
        </div>
      </header>
      
      {/* Error and success messages */}
      <div className="error-container">
        {error && <div className="error-message">{error}</div>}
      </div>
      
      <div className="success-container">
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
      
      {/* Submission form */}
      <form onSubmit={handleSubmit} className="submission-form">
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            placeholder="Write your assignment submission here..."
          />
        </div>
        
        {/* Uploaded files list */}
        {uploadedFileUrls.length > 0 && (
          <div className="uploaded-files">
            <h3>Uploaded Files</h3>
            <ul>
              {uploadedFileUrls.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url.split('/').pop()}
                  </a>
                  <button 
                    type="button"
                    onClick={() => handleRemoveUploadedFile(url)}
                    className="remove-button"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* File upload area */}
        <div 
          className="file-upload-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Drag and drop files here, or click to select files</p>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            multiple
            className="file-input"
          />
          <label htmlFor="file-upload" className="file-label">Select Files</label>
        </div>
        
        {/* Selected files list */}
        {files.length > 0 && (
          <div className="selected-files">
            <h3>Selected Files</h3>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  <button 
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="remove-button"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Submit button */}
        <div className="form-buttons">
          <Link 
            to={`/Kambaz/Courses/${courseId}/Assignments/${assignmentIdValue}`}
            className="cancel-button"
          >
            Cancel
          </Link>
          <button 
            type="submit" 
            className="submit-button"
            disabled={submitting || uploading}
          >
            {submitting ? 'Submitting...' : (isPastDue ? 'Submit Late' : 'Submit Assignment')}
          </button>
        </div>
      </form>
      
      {/* Previous submissions */}
      {previousSubmissions.length > 0 && (
        <div className="previous-submissions">
          <h3>Previous Submissions</h3>
          {previousSubmissions.map((submission) => (
            submission && (
              <div key={submission._id || 'no-id'} className="submission-item">
                <div className="submission-header">
                  <div className="submission-date">
                    Submitted: {submission.submittedAt ? formatDate(submission.submittedAt) : 'Unknown date'}
                  </div>
                  {submission.grade !== undefined && assignment && (
                    <div className="submission-grade">
                      Grade: <strong>{submission.grade}</strong> / {assignment.points}
                    </div>
                  )}
                </div>
                
                <div className="submission-content">
                  <strong>Content:</strong>
                  <div className="content-text">{submission.content || 'No content provided'}</div>
                </div>
                
                {submission.fileUrls && submission.fileUrls.length > 0 && (
                  <div className="submission-files">
                    <strong>Files:</strong>
                    <ul>
                      {submission.fileUrls.map((url, fileIndex) => (
                        url && (
                          <li key={fileIndex}>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                              {url.split('/').pop() || 'Download file'}
                            </a>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                )}
                
                {submission.feedback && (
                  <div className="submission-feedback">
                    <strong>Feedback:</strong>
                    <div className="feedback-text">{submission.feedback}</div>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
