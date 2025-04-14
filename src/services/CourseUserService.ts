import axios from 'axios';
import { User } from '../contexts/UserContext';
import { API_BASE } from './api';

// 課程參與者接口
export interface CourseParticipant {
  _id: string;
  user: User;
  role: 'INSTRUCTOR' | 'STUDENT';
  joinedDate: string;
}

// 分頁回應接口
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 分頁請求參數
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

// 獲取課程參與者（帶分頁）
export const getCourseParticipants = async (
  courseId: string, 
  params: PaginationParams = { page: 1, limit: 10 }
): Promise<PaginatedResponse<CourseParticipant>> => {
  try {
    const { page, limit, search } = params;
    let url = `${API_BASE}/api/courses/${courseId}/users`;
    
    // 後端目前不支援分頁和搜尋，但我們仍保留這些參數以便未來擴展
    
    // 獲取用戶列表
    const response = await axios.get<any[]>(url, { withCredentials: true });
    const users = response.data;
    
    console.log("API response:", users);
    
    // 處理用戶數據，將其轉換為 CourseParticipant 格式
    const participants: CourseParticipant[] = users.map(user => {
      return {
        _id: user._id || `temp_${Math.random().toString(36).substring(2, 9)}`,
        user: user,
        role: user.role === 'FACULTY' ? 'INSTRUCTOR' : 'STUDENT',
        joinedDate: user.createdAt || new Date().toISOString()
      };
    });
    
    console.log("Transformed participants:", participants);
    
    // 進行手動篩選（如果有搜尋關鍵詞）
    let filteredParticipants = participants;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredParticipants = participants.filter(p => {
        const fullName = `${p.user.firstName} ${p.user.lastName}`.toLowerCase();
        const email = p.user.email?.toLowerCase() || '';
        return fullName.includes(searchLower) || email.includes(searchLower);
      });
    }
    
    // 手動分頁
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedParticipants = filteredParticipants.slice(startIndex, endIndex);
    
    // 返回符合 PaginatedResponse 格式的數據
    return {
      data: paginatedParticipants,
      total: filteredParticipants.length,
      page,
      limit,
      totalPages: Math.ceil(filteredParticipants.length / limit)
    };
  } catch (error) {
    console.error("Error fetching course participants:", error);
    throw new Error("Failed to fetch course participants");
  }
};

// 獲取所有課程參與者（不分頁）
export const getAllCourseParticipants = async (courseId: string): Promise<CourseParticipant[]> => {
  try {
    const response = await axios.get<{ participants: CourseParticipant[] }>(
      `${API_BASE}/api/courses/${courseId}/users/all`, 
      { withCredentials: true }
    );
    return response.data.participants;
  } catch (error) {
    console.error("Error fetching all course participants:", error);
    throw new Error("Failed to fetch all course participants");
  }
};

// 添加用戶到課程
export const addUserToCourse = async (
  courseId: string, 
  userId: string, 
  role: 'INSTRUCTOR' | 'STUDENT'
): Promise<CourseParticipant> => {
  try {
    const response = await axios.post<{ participant: CourseParticipant }>(
      `${API_BASE}/api/courses/${courseId}/users`, 
      { userId, role },
      { withCredentials: true }
    );
    return response.data.participant;
  } catch (error) {
    console.error("Error adding user to course:", error);
    throw new Error("Failed to add user to course");
  }
};

// 從課程中移除用戶
export const removeUserFromCourse = async (courseId: string, userId: string): Promise<void> => {
  try {
    await axios.delete(
      `${API_BASE}/api/courses/${courseId}/users/${userId}`, 
      { withCredentials: true }
    );
  } catch (error) {
    console.error("Error removing user from course:", error);
    throw new Error("Failed to remove user from course");
  }
};

// 更改用戶在課程中的角色
export const updateUserRole = async (
  courseId: string, 
  userId: string, 
  role: 'INSTRUCTOR' | 'STUDENT'
): Promise<CourseParticipant> => {
  try {
    const response = await axios.put<{ participant: CourseParticipant }>(
      `${API_BASE}/api/courses/${courseId}/users/${userId}`, 
      { role },
      { withCredentials: true }
    );
    return response.data.participant;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw new Error("Failed to update user role");
  }
};
