import axios from 'axios';
import { API_BASE } from './api';

// 定義課程類型介面
export interface Course {
  _id: string;
  number: string;
  name: string;
  description: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  credits?: number;
  createdAt?: string;
  updatedAt?: string;
  instructor?: {
    _id: string;
    firstName: string;
    lastName: string;
    email?: string;
  };
  announcements?: Array<{
    _id: string;
    title: string;
    content: string;
    createdAt: string;
  }>;
  isEnrolled?: boolean;  // 添加註冊狀態標記
}

// 定義創建/更新課程的資料介面
export interface CourseInput {
  _id?: string;
  number: string;
  name: string;
  description: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
}

// 定義 API 回應介面
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
  };
}

/**
 * Service for handling course-related API calls
 */
export const CourseService = {
  /**
   * Get all courses with optional pagination and filtering
   * @param page Page number
   * @param limit Items per page
   * @param search Search term
   * @returns Promise with courses data
   */
  getAllCourses: async (page = 1, limit = 10, search = '') => {
    try {
      console.log('正在獲取課程列表...', { page, limit, search });
      const response = await axios.get<ApiResponse<{ courses: Course[] }>>(`${API_BASE}/api/courses`, {
        params: { page, limit, search },
        withCredentials: true
      });
      console.log('獲取課程列表成功:', {
        success: response.data.success,
        coursesCount: response.data.data?.courses?.length || 0
      });
      if (response.data.data?.courses?.length === 0) {
        console.log('警告: 伺服器返回了空的課程列表');
      } else {
        console.log('課程ID:', response.data.data?.courses.map(c => c._id).join(', '));
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },

  /**
   * Get courses for the currently logged in user
   * @param page Page number
   * @param limit Items per page
   * @returns Promise with enrolled courses data
   */
  getEnrolledCourses: async (page = 1, limit = 10) => {
    try {
      console.log('正在獲取已註冊課程數據...', { page, limit });
      
      // 使用 "current" 作為 userId 來表示當前登入的用戶
      const response = await axios.get<Course[]>(`${API_BASE}/api/users/current/courses`, {
        params: { page, limit },
        withCredentials: true
      });
      
      console.log('已註冊課程數據獲取成功:', {
        coursesCount: response.data?.length || 0
      });
      
      if (response.data?.length === 0) {
        console.log('用戶沒有註冊任何課程');
      } else {
        console.log('已註冊課程 ID 列表:', response.data?.map(c => c._id).join(', '));
      }
      
      // 返回統一格式的資料
      return {
        success: true,
        data: { 
          courses: response.data
        }
      };
    } catch (error) {
      console.error('獲取已註冊課程失敗:', error);
      throw error;
    }
  },

  /**
   * Get course by ID
   * @param courseId Course ID
   * @returns Promise with course data
   */
  getCourseById: async (courseId: string) => {
    try {
      const response = await axios.get<ApiResponse<Course>>(`${API_BASE}/api/courses/${courseId}`, {
        withCredentials: true
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Create a new course
   * @param courseData Course data
   * @returns Promise with created course data
   */
  createCourse: async (courseData: CourseInput) => {
    try {
      const response = await axios.post<ApiResponse<Course>>(`${API_BASE}/api/courses`, courseData, {
        withCredentials: true
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  /**
   * Update a course
   * @param courseId Course ID
   * @param courseData Updated course data
   * @returns Promise with updated course data
   */
  updateCourse: async (courseId: string, courseData: Partial<CourseInput>) => {
    try {
      const response = await axios.put<ApiResponse<Course>>(`${API_BASE}/api/courses/${courseId}`, courseData, {
        withCredentials: true
      });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a course
   * @param courseId Course ID
   * @returns Promise with deletion confirmation
   */
  deleteCourse: async (courseId: string) => {
    try {
      const response = await axios.delete<ApiResponse<{ deleted: boolean }>>(`${API_BASE}/api/courses/${courseId}`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Enroll in a course
   * @param courseId Course ID
   * @returns Promise with enrollment confirmation
   */
  enrollInCourse: async (courseId: string) => {
    try {
      console.log(`Enrolling in course: ${courseId}`);
      
      // 移除 MongoDB ObjectID 格式驗證，因為系統使用自定義ID格式
      
      const response = await axios.post<ApiResponse<{ enrolled: boolean }>>(`${API_BASE}/api/courses/${courseId}/enroll`, {}, {
        withCredentials: true
      });
      
      console.log(`Enrolled in course: ${courseId}`);
      return response.data;
    } catch (error) {
      console.error(`Error enrolling in course ${courseId}:`, error);
      throw error;
    }
  },

  /**
   * Unenroll from a course
   * @param courseId Course ID
   * @returns Promise with unenrollment confirmation
   */
  unenrollFromCourse: async (courseId: string) => {
    try {
      const response = await axios.delete<ApiResponse<{ unenrolled: boolean }>>(`${API_BASE}/api/courses/${courseId}/enroll`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      console.error(`Error unenrolling from course ${courseId}:`, error);
      throw error;
    }
  }
};

export default CourseService;
