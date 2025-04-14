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
    // 記錄 API 調用
    console.log(`正在獲取課程 ${courseId} 的作業，API 路徑: ${API_BASE}/api/courses/${courseId}/assignments`);
    
    const response = await axios.get(
      `${API_BASE}/api/courses/${courseId}/assignments`,
      { withCredentials: true }
    );

    console.log("後端回應的原始數據:", response.data);

    // 檢查後端回應格式
    const { assignments = [], pagination: _pagination = {} } = response.data || {};
    // const { assignments = [], pagination = {} } = response.data || {};


    // 無論後端回應如何，我們都轉換為前端需要的格式
    return {
      success: true,
      data: { assignments: Array.isArray(assignments) ? assignments : [] },
      message: "作業載入成功"
    };
  } catch (error) {
    console.error('Error fetching assignments:', error);
    // 返回一個錯誤格式的回應
    return {
      success: false,
      data: { assignments: [] },
      message: error instanceof Error ? error.message : "獲取作業時發生未知錯誤"
    };
  }
};

// Get a single assignment by ID
export const getAssignmentById = async (courseId: string, assignmentId: string): Promise<Assignment> => {
  try {
    console.log(`獲取作業詳細資訊，課程ID: ${courseId}，作業ID: ${assignmentId}`);
    
    // 修正 API 路徑 - 使用正確的後端端點 /api/assignments/:assignmentId
    const response = await axios.get(
      `${API_BASE}/api/assignments/${assignmentId}`,
      { withCredentials: true }
    );

    console.log("獲取單個作業的回應:", response.data);
    
    // 直接返回後端回應的數據
    return response.data;
  } catch (error) {
    console.error(`Error fetching assignment with ID ${assignmentId}:`, error);
    throw error;
  }
};

// Create a new assignment
export const createAssignment = async (courseId: string, assignmentData: AssignmentInput): Promise<Assignment> => {
  try {
    console.log(`創建新作業，課程 ID: ${courseId}`, assignmentData);
    
    const response = await axios.post(
      `${API_BASE}/api/courses/${courseId}/assignments`,
      assignmentData,
      { withCredentials: true }
    );

    console.log("創建作業的回應:", response.data);
    
    // 直接返回後端回應的數據
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
    
    // 修正 API 路徑 - 使用正確的後端端點 /api/assignments/:assignmentId
    const response = await axios.put(
      `${API_BASE}/api/assignments/${assignmentId}`,
      assignmentData,
      { withCredentials: true }
    );

    console.log("更新作業的回應:", response.data);
    
    // 直接返回後端回應的數據
    return response.data;
  } catch (error) {
    console.error(`Error updating assignment with ID ${assignmentId}:`, error);
    throw error;
  }
};

// Delete an assignment
export const deleteAssignment = async (courseId: string, assignmentId: string): Promise<void> => {
  try {
    console.log(`刪除作業，課程ID: ${courseId}，作業ID: ${assignmentId}`);
    
    // 修正 API 路徑 - 使用正確的後端端點 /api/assignments/:assignmentId
    await axios.delete(
      `${API_BASE}/api/assignments/${assignmentId}`,
      { withCredentials: true }
    );
    
    console.log("作業已成功刪除");
  } catch (error) {
    console.error(`Error deleting assignment with ID ${assignmentId}:`, error);
    throw error;
  }
};

// Toggle assignment publication status
export const toggleAssignmentPublished = async (courseId: string, assignmentId: string, isPublished: boolean): Promise<Assignment> => {
  try {
    console.log(`切換作業發佈狀態，課程ID: ${courseId}，作業ID: ${assignmentId}，新狀態: ${isPublished}`);
    
    // 修正 API 路徑 - 使用正確的後端端點 /api/assignments/:assignmentId/publish
    const response = await axios.put(
      `${API_BASE}/api/assignments/${assignmentId}/publish`,
      { isPublished },
      { withCredentials: true }
    );

    console.log("切換作業發佈狀態的回應:", response.data);
    
    // 直接返回後端回應的數據
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
