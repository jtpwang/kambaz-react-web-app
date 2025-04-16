import axios from 'axios';
import { User } from '../contexts/UserContext';
import { API_BASE } from './api';

export interface CourseParticipant {
  _id: string;
  user: User;
  role: 'INSTRUCTOR' | 'STUDENT';
  joinedDate: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export const getCourseParticipants = async (
  courseId: string,
  params: PaginationParams = { page: 1, limit: 10 }
): Promise<PaginatedResponse<CourseParticipant>> => {
  try {
    const { page, limit, search } = params;
    let url = `${API_BASE}/api/courses/${courseId}/users`;


    // get user list
    const response = await axios.get<any[]>(url, { withCredentials: true });
    const users = response.data;

    console.log("API response:", users);

    // Process user data and convert it into CourseParticipant format
    const participants: CourseParticipant[] = users.map(user => {
      return {
        _id: user._id || `temp_${Math.random().toString(36).substring(2, 9)}`,
        user: user,
        role: user.role === 'FACULTY' ? 'INSTRUCTOR' : 'STUDENT',
        joinedDate: user.createdAt || new Date().toISOString()
      };
    });

    console.log("Transformed participants:", participants);

    // Perform manual filtering (if there are search keywords)
    let filteredParticipants = participants;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredParticipants = participants.filter(p => {
        const fullName = `${p.user.firstName} ${p.user.lastName}`.toLowerCase();
        const email = p.user.email?.toLowerCase() || '';
        return fullName.includes(searchLower) || email.includes(searchLower);
      });
    }

    // Manual paging
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedParticipants = filteredParticipants.slice(startIndex, endIndex);

    // Return data that conforms to the PaginatedResponse format
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

// Get all course participants (no paging)
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

// Add user to course
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

// Remove the user from the course
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

// Change the user's role in the course
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
