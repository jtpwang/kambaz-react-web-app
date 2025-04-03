import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// lookup users enrolled in course
export const findUsersEnrolledInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
};

// create user (only available to teachers)
export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}`, user);
  return data;
};

// update user info
export const updateUser = async (userId: string, user: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${userId}`, user);
  return data;
};

// delete user
export const deleteUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return data;
};

// lookup user by id
export const findUserById = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  return data;
};

// get current logged in user
export const getCurrentUser = async () => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return data;
};
