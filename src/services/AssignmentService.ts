import axios from 'axios';
import { API_BASE } from './api';

// Assignment types
export interface Assignment {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  availableDate: string;
  points: number;
  isPublished: boolean;
  moduleIds: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AssignmentInput {
  title: string;
  description: string;
  dueDate: string;
  availableDate: string;
  points: number;
  isPublished?: boolean;
  moduleIds?: string[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Get all assignments for a course
export const getAllAssignments = async (courseId: string): Promise<ApiResponse<{ assignments: Assignment[] }>> => {
  try {
    // Log API call
    console.log(`Fetching assignments for course ${courseId}, API path: ${API_BASE}/api/courses/${courseId}/assignments`);

    const response = await axios.get(
      `${API_BASE}/api/courses/${courseId}/assignments`,
      { withCredentials: true }
    );

    console.log("Raw data from backend response:", response.data);

    // Check backend response format
    const { assignments = [], pagination: _pagination = {} } = response.data || {};
    // const { assignments = [], pagination = {} } = response.data || {};


    // Normalize response format for frontend usage
    return {
      success: true,
      data: { assignments: Array.isArray(assignments) ? assignments : [] },
      message: "Assignments loaded successfully"
    };
  } catch (error) {
    console.error('Error fetching assignments:', error);
    // Return error response format
    return {
      success: false,
      data: { assignments: [] },
      message: error instanceof Error ? error.message : "Unknown error occurred while fetching assignments"
    };
  }
};

// Get a single assignment by ID
export const getAssignmentById = async (courseId: string, assignmentId: string): Promise<Assignment> => {
  try {
    console.log(`Fetching assignment details, course ID: ${courseId}, assignment ID: ${assignmentId}`);

    // Correct API path - use proper backend endpoint /api/assignments/:assignmentId
    const response = await axios.get(
      `${API_BASE}/api/assignments/${assignmentId}`,
      { withCredentials: true }
    );

    console.log("Response for fetching single assignment:", response.data);

    // Return backend response data directly
    return response.data;
  } catch (error) {
    console.error(`Error fetching assignment with ID ${assignmentId}:`, error);
    throw error;
  }
};

// Create a new assignment
export const createAssignment = async (courseId: string, assignmentData: AssignmentInput): Promise<Assignment> => {
  try {
    console.log(`Creating new assignment, course ID: ${courseId}`, assignmentData);

    const response = await axios.post(
      `${API_BASE}/api/courses/${courseId}/assignments`,
      assignmentData,
      { withCredentials: true }
    );

    console.log("Response from creating assignment:", response.data);

    // Return backend response data directly
    return response.data;
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw error;
  }
};

// Update an existing assignment
export const updateAssignment = async (courseId: string, assignmentId: string, assignmentData: AssignmentInput): Promise<Assignment> => {
  try {
    console.log(`更新作業，課程ID: ${courseId}，作業ID: ${assignmentId}`, assignmentData);

    // Correct API path
    const response = await axios.put(
      `${API_BASE}/api/assignments/${assignmentId}`,
      assignmentData,
      { withCredentials: true }
    );

    console.log("Response from updating assignment:", response.data);

    // Return backend response data directly
    return response.data;
  } catch (error) {
    console.error(`Error updating assignment with ID ${assignmentId}:`, error);
    throw error;
  }
};

// Delete an assignment
export const deleteAssignment = async (courseId: string, assignmentId: string): Promise<void> => {
  try {
    console.log(`Deleting assignment, course ID: ${courseId}, assignment ID: ${assignmentId}`);

    // Correct API path - use proper backend endpoint /api/assignments/:assignmentId
    await axios.delete(
      `${API_BASE}/api/assignments/${assignmentId}`,
      { withCredentials: true }
    );

    console.log("Assignment deleted successfully");
  } catch (error) {
    console.error(`Error deleting assignment with ID ${assignmentId}:`, error);
    throw error;
  }
};

// Toggle assignment publication status
export const toggleAssignmentPublished = async (courseId: string, assignmentId: string, isPublished: boolean): Promise<Assignment> => {
  try {
    console.log(`Toggling assignment publish status, course ID: ${courseId}, assignment ID: ${assignmentId}, new status: ${isPublished}`);

    // Correct API path - use proper backend endpoint /api/assignments/:assignmentId/publish
    const response = await axios.put(
      `${API_BASE}/api/assignments/${assignmentId}/publish`,
      { isPublished },
      { withCredentials: true }
    );

    console.log("Response from toggling publish status:", response.data);

    // Return backend response data directly
    return response.data;
  } catch (error) {
    console.error(`Error toggling published status for assignment with ID ${assignmentId}:`, error);
    throw error;
  }
};

const AssignmentService = {
  getAllAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  toggleAssignmentPublished
};

export default AssignmentService;
