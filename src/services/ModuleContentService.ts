import axios from 'axios';
import { API_BASE } from './api';

// 模組內容類型定義
export enum ContentType {
  TEXT = 'text',
  FILE = 'file',
  VIDEO = 'video',
  LINK = 'link',
  IMAGE = 'image'
}

// 模組內容介面
export interface ModuleContent {
  _id: string;
  moduleId: string;
  title: string;
  contentType: ContentType;
  content: string;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ModuleContentInput {
  title: string;
  contentType: ContentType;
  content: string;
  order?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 獲取模組的所有內容
export const getAllModuleContents = async (courseId: string, moduleId: string): Promise<ApiResponse<{ moduleContents: ModuleContent[] }>> => {
  try {
    const response = await axios.get<ApiResponse<{ moduleContents: ModuleContent[] }>>(
      `${API_BASE}/api/courses/${courseId}/modules/${moduleId}/contents`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching module contents:', error);
    throw error;
  }
};

// 獲取單個內容項目
export const getModuleContentById = async (courseId: string, moduleId: string, contentId: string): Promise<ModuleContent> => {
  try {
    const response = await axios.get<ApiResponse<ModuleContent>>(
      `${API_BASE}/api/courses/${courseId}/modules/${moduleId}/contents/${contentId}`,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching module content with ID ${contentId}:`, error);
    throw error;
  }
};

// 創建新的內容項目
export const createModuleContent = async (courseId: string, moduleId: string, contentData: ModuleContentInput): Promise<ModuleContent> => {
  try {
    const response = await axios.post<ApiResponse<ModuleContent>>(
      `${API_BASE}/api/courses/${courseId}/modules/${moduleId}/contents`,
      contentData,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error('Error creating module content:', error);
    throw error;
  }
};

// 更新內容項目
export const updateModuleContent = async (
  courseId: string, 
  moduleId: string, 
  contentId: string, 
  contentData: ModuleContentInput
): Promise<ModuleContent> => {
  try {
    const response = await axios.put<ApiResponse<ModuleContent>>(
      `${API_BASE}/api/courses/${courseId}/modules/${moduleId}/contents/${contentId}`,
      contentData,
      { withCredentials: true }
    );
    return response.data.data;
  } catch (error) {
    console.error(`Error updating module content with ID ${contentId}:`, error);
    throw error;
  }
};

// 刪除內容項目
export const deleteModuleContent = async (courseId: string, moduleId: string, contentId: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_BASE}/api/courses/${courseId}/modules/${moduleId}/contents/${contentId}`,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(`Error deleting module content with ID ${contentId}:`, error);
    throw error;
  }
};

// 更新內容順序
export const updateContentOrder = async (
  courseId: string, 
  moduleId: string, 
  contentOrders: { contentId: string, order: number }[]
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const response = await axios.patch<ApiResponse<{ success: boolean }>>(
      `${API_BASE}/api/courses/${courseId}/modules/${moduleId}/contents/reorder`,
      { contentOrders },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating content order:', error);
    throw error;
  }
};

// 上傳文件作為內容
export const uploadContentFile = async (file: File): Promise<string> => {
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

const ModuleContentService = {
  getAllModuleContents,
  getModuleContentById,
  createModuleContent,
  updateModuleContent,
  deleteModuleContent,
  updateContentOrder,
  uploadContentFile
};

export default ModuleContentService;
