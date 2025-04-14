import axios from "axios";
import { User } from "../../contexts/UserContext";

const axiosWithCredentials = axios.create({ withCredentials: true });

// Vite uses import.meta.env instead of process.env
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER || "http://localhost:4000";
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const findAllUsers = async (): Promise<User[]> => {
  const response = await axiosWithCredentials.get(USERS_API);
  return response.data;
};

export const findUsersByRole = async (role: string): Promise<User[]> => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string): Promise<User[]> => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string): Promise<User> => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<{ success: boolean; message: string }> => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
