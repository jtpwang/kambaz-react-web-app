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
    // Directly log query parameters for debugging
    console.log(`Getting the module of course ${courseId}, API path: ${API_BASE}/api/modules?courseId=${courseId}`);

    const response = await axios.get(
      `${API_BASE}/api/modules?courseId=${courseId}`,
      { withCredentials: true }
    );

    console.log("Original data responded by the backend:", response.data);

    // Check the backend response format
    const { modules = [] } = response.data || {};

    // Regardless of the backend response, we convert it to the format required by the front end
    return {
      success: true,
      data: { modules: Array.isArray(modules) ? modules : [] },
      message: "Module loaded successfully"
    };
  } catch (error) {
    console.error('Error fetching modules:', error);
    // Return a malformed response
    return {
      success: false,
      data: { modules: [] },
      message: error instanceof Error ? error.message : "An unknown error occurred while getting the module"
    };
  }
};

// Get a single module by ID
export const getModuleById = async (moduleId: string): Promise<Module> => {
  try {
    // Directly use the module ID to access the API
    console.log(`Get module details, ID: ${moduleId}`);

    const response = await axios.get(
      `${API_BASE}/api/modules/${moduleId}`,
      { withCredentials: true }
    );

    // Return the module data responded by the backend
    return response.data;
  } catch (error) {
    console.error(`Error fetching module with ID ${moduleId}:`, error);
    throw error;
  }
};

// Create a new module
export const createModule = async (courseId: string, moduleData: ModuleInput): Promise<Module> => {
  try {
    // Add courseId to the request body
    const requestData = {
      ...moduleData,
      courseId
    };

    console.log(`Create a new module, course ID: ${courseId}`, requestData);

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
    console.log(`Update module, ID: ${moduleId}`, moduleData);

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
    console.log(`Delete module, ID: ${moduleId}`);

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
    console.log(`Switch module publishing status, ID: ${moduleId}, new status: ${isPublished ? 'Publish' : 'Unpublish'}`);

    const response = await axios.put(
      `${API_BASE}/api/modules/${moduleId}/publish`,
      { isPublished },
      { withCredentials: true }
    );

    console.log(`Module status updated successfully, ID: ${moduleId}, response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error toggling published status for module with ID ${moduleId}:`, error);
    const errorMessage = error instanceof Error
      ? error.message
      : "An unknown error occurred while updating the module release status";

    throw new Error(`Unable to update module release status: ${errorMessage}`);
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
