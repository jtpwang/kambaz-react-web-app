import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// get user enrollments
export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrollments`);
  return data;
};

// get course enrollments
export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/enrollments`);
  return data;
};

// enroll user in course
export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/enrollments`, { courseId });
  return data;
};

// unenroll user from course
export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}/enrollments/${courseId}`);
  return data;
};

// check if user is enrolled in course
export const isUserEnrolledInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrollments/${courseId}`);
  return data.isEnrolled;
};
