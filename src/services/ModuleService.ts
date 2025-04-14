import axios from 'axios';
import { API_BASE } from './api';

// Module types
export interface Module {
  _id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ModuleInput {
  title: string;
  description: string;
  order?: number;
  isPublished?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Get all modules for a course
export const getAllModules = async (courseId: string): Promise<ApiResponse<{ modules: Module[] }>> => {
  try {
    // 直接記錄查詢參數，以便調試
    console.log(`正在獲取課程 ${courseId} 的模組，API 路徑: ${API_BASE}/api/modules?courseId=${courseId}`);
    
    const response = await axios.get(
      `${API_BASE}/api/modules?courseId=${courseId}`,
      { withCredentials: true }
    );

    console.log("後端回應的原始數據:", response.data);

    // 檢查後端回應格式
    const { modules = [] } = response.data || {};

    // 無論後端回應如何，我們都轉換為前端需要的格式
    return {
      success: true,
      data: { modules: Array.isArray(modules) ? modules : [] },
      message: "模組載入成功"
    };
  } catch (error) {
    console.error('Error fetching modules:', error);
    // 返回一個錯誤格式的回應
    return {
      success: false,
      data: { modules: [] },
      message: error instanceof Error ? error.message : "獲取模組時發生未知錯誤"
    };
  }
};

// Get a single module by ID
export const getModuleById = async (moduleId: string): Promise<Module> => {
  try {
    // 直接使用模組 ID 存取 API
    console.log(`獲取模組詳細資訊，ID: ${moduleId}`);
    
    const response = await axios.get(
      `${API_BASE}/api/modules/${moduleId}`,
      { withCredentials: true }
    );

    // 返回後端回應的模組數據
    return response.data;
  } catch (error) {
    console.error(`Error fetching module with ID ${moduleId}:`, error);
    throw error;
  }
};

// Create a new module
export const createModule = async (courseId: string, moduleData: ModuleInput): Promise<Module> => {
  try {
    // 將 courseId 加入到請求體中
    const requestData = {
      ...moduleData,
      courseId
    };

    console.log(`創建新模組，課程 ID: ${courseId}`, requestData);
    
    const response = await axios.post(
      `${API_BASE}/api/modules`,
      requestData,
      { withCredentials: true }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error creating module:', error);
    throw error;
  }
};

// Update an existing module
export const updateModule = async (moduleId: string, moduleData: ModuleInput): Promise<Module> => {
  try {
    console.log(`更新模組，ID: ${moduleId}`, moduleData);
    
    const response = await axios.put(
      `${API_BASE}/api/modules/${moduleId}`,
      moduleData,
      { withCredentials: true }
    );
    
    return response.data;
  } catch (error) {
    console.error(`Error updating module with ID ${moduleId}:`, error);
    throw error;
  }
};

// Delete a module
export const deleteModule = async (moduleId: string): Promise<void> => {
  try {
    console.log(`刪除模組，ID: ${moduleId}`);
    
    await axios.delete(
      `${API_BASE}/api/modules/${moduleId}`,
      { withCredentials: true }
    );
  } catch (error) {
    console.error(`Error deleting module with ID ${moduleId}:`, error);
    throw error;
  }
};

// Toggle module publication status
export const toggleModulePublished = async (moduleId: string, isPublished: boolean): Promise<Module> => {
  try {
    console.log(`切換模組發佈狀態，ID: ${moduleId}, 新狀態: ${isPublished ? '發布' : '取消發布'}`);
    
    const response = await axios.put(
      `${API_BASE}/api/modules/${moduleId}/publish`,
      { isPublished },
      { withCredentials: true }
    );
    
    console.log(`模組狀態更新成功，ID: ${moduleId}, 響應:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error toggling published status for module with ID ${moduleId}:`, error);
    const errorMessage = error instanceof Error 
      ? error.message 
      : "更新模組發布狀態時發生未知錯誤";
    
    throw new Error(`無法更新模組發布狀態: ${errorMessage}`);
  }
};

const ModuleService = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
  toggleModulePublished
};

export default ModuleService;
