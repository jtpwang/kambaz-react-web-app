import axios from 'axios';

import { API_BASE } from './api';

// Submission types
export interface Submission {
  _id: string;
  assignmentId: string;
  userId: string;
  content: string;
  fileUrls: string[];
  submittedAt: string;
  grade?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubmissionInput {
  content: string;
  fileUrls?: string[];
}

export interface SubmissionGradeInput {
  grade: number;
  feedback: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Get all submissions for an assignment
export const getAllSubmissions = async (assignmentId: string): Promise<ApiResponse<{ submissions: Submission[] }>> => {
  try {
    console.log(`Fetching assignment submissions list, assignment ID: ${assignmentId}`);
    const response = await axios.get(
      `${API_BASE}/api/assignments/${assignmentId}/submissions`,
      { withCredentials: true }
    );
    
    console.log('Submission list response data:', response.data);
    
    // Check response format and adapt accordingly
    if (response.data && Array.isArray(response.data)) {
      // If response is directly an array, convert to standard format
      return {
        success: true,
        data: { submissions: response.data }
      };
    } else if (response.data && response.data.assignments) {
      // If response is in { assignments: [] } format
      return {
        success: true,
        data: { submissions: response.data.assignments }
      };
    } else if (response.data && response.data.submissions) {
      // If response is already in { submissions: [] } format
      return {
        success: true,
        data: { submissions: response.data.submissions }
      };
    } else if (response.data) {
      // Other cases, but at least has data
      return {
        success: true,
        data: { submissions: [] }  // Return empty array to avoid errors
      };
    }
    
    // If no suitable format identified, return standard response
    return response.data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
};

// Get submissions for current user
export const getUserSubmissions = async (assignmentId: string): Promise<ApiResponse<{ submissions: Submission[] }>> => {
  try {
    // Get current user ID from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      throw new Error('User not logged in');
    }
    
    const currentUser = JSON.parse(storedUser);
    const userId = currentUser._id;
    
    console.log(`Fetching user submissions list, user ID: ${userId}, assignment ID: ${assignmentId}`);
    
    // Use correct API path: /api/users/:userId/submissions
    const response = await axios.get(
      `${API_BASE}/api/users/${userId}/submissions?assignmentId=${assignmentId}`,
      { withCredentials: true }
    );
    
    // Check response format and adapt accordingly
    if (response.data && Array.isArray(response.data)) {
      // If response is directly an array, convert to standard format
      return {
        success: true,
        data: { submissions: response.data }
      };
    } else if (response.data && response.data.data && response.data.data.submissions) {
      // If response is in { data: { submissions: [] } } format
      return {
        success: true,
        data: { submissions: response.data.data.submissions }
      };
    } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
      // If response is in { data: [] } format
      return {
        success: true,
        data: { submissions: response.data.data }
      };
    } else if (response.data && (response.data as any).submissions) {
      // If response is in { submissions: [] } format
      return {
        success: true,
        data: { submissions: (response.data as any).submissions }
      };
    } else {
      // Other cases, but at least has data
      console.log('API response format not as expected, returning empty array:', response.data);
      return {
        success: true,
        data: { submissions: [] }  // Return empty array to avoid errors
      };
    }
  } catch (error) {
    console.error('Error fetching user submissions:', error);
    throw error;
  }
};

// Get a single submission by ID
export const getSubmissionById = async (submissionId: string): Promise<Submission> => {
  try {
    const response = await axios.get<ApiResponse<Submission>>(
      `${API_BASE}/api/submissions/${submissionId}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching submission with ID ${submissionId}:`, error);
    throw error;
  }
};

// Create a new submission
export const createSubmission = async (assignmentId: string, submissionData: SubmissionInput): Promise<Submission> => {
  try {
    console.log(`Creating assignment submission, assignment ID: ${assignmentId}`);
    const response = await axios.post<ApiResponse<Submission>>(
      `${API_BASE}/api/assignments/${assignmentId}/submissions`,
      submissionData,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw error;
  }
};

// Update an existing submission
export const updateSubmission = async (
  submissionId: string, 
  submissionData: SubmissionInput
): Promise<Submission> => {
  try {
    console.log(`Updating assignment submission, submission ID: ${submissionId}`);
    console.log('Update data:', JSON.stringify(submissionData, null, 2));
    
    // Use correct API path, matching backend implementation
    const response = await axios.put<ApiResponse<Submission>>(
      `${API_BASE}/api/submissions/${submissionId}`,
      submissionData,
      { withCredentials: true }
    );
    
    // Check response format
    if (response.data && response.data.data) {
      return response.data.data;
    } else if (response.data && !response.data.data) {
      // The response might be the object itself
      return response.data as unknown as Submission;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error: any) {
    // Capture and display more detailed error information
    const errorMessage = error.response?.data?.error || error.message;
    console.error(`Error updating submission with ID ${submissionId}:`, error);
    console.error(`Detailed error message:`, errorMessage);
    
    // Enhance error object with more detailed information
    const enhancedError = new Error(`Update submission failed: ${errorMessage}`);
    throw enhancedError;
  }
};

// Grade a submission
export const gradeSubmission = async (
  submissionId: string, 
  gradeData: SubmissionGradeInput
): Promise<Submission> => {
  try {
    console.log(`Grading submission, submission ID: ${submissionId}`);
    
    // Use correct API path and method (PUT instead of PATCH)
    const response = await axios.put<ApiResponse<Submission>>(
      `${API_BASE}/api/submissions/${submissionId}/grade`,
      gradeData,
      { withCredentials: true }
    );
    
    // Check response format
    if (response.data && response.data.data) {
      return response.data.data;
    } else if (response.data && !response.data.data) {
      // The response might be the object itself
      return response.data as unknown as Submission;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error(`Error grading submission with ID ${submissionId}:`, error);
    throw error;
  }
};

// Delete a submission
export const deleteSubmission = async (assignmentId: string, submissionId: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_BASE}/api/assignments/${assignmentId}/submissions/${submissionId}`,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(`Error deleting submission with ID ${submissionId}:`, error);
    throw error;
  }
};

// Upload file for submission
export const uploadSubmissionFile = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axios.post<ApiResponse<{ fileUrl: string }>>(
      `${API_BASE}/api/upload`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    
    return response.data.data.fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const SubmissionService = {
  getAllSubmissions,
  getUserSubmissions,
  getSubmissionById,
  createSubmission,
  updateSubmission,
  gradeSubmission,
  deleteSubmission,
  uploadSubmissionFile
};

export default SubmissionService;
