export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  role: "USER" | "ADMIN" | "FACULTY" | "STUDENT" | "TA";
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
}

export interface Course {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
  image?: string;
  department?: string;
  credits?: number;
  author?: string;
}

export interface Enrollment {
  _id?: string;
  user: string;
  course: string;
  role?: "FACULTY" | "STUDENT" | "TA";
}

export interface Assignment {
  _id: string;
  title: string;
  course: string;
  description: string;
  points: number;
  due?: string;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
}

export interface Lesson {
  _id: string;
  name: string;
  description: string;
  module: string;
}

export interface Module {
  _id: string;
  name: string;
  course: string;
  description?: string;
  lessons?: Lesson[];
}

export const users: User[];
export const courses: Course[];
export const enrollments: Enrollment[];
export const assignments: Assignment[];
export const modules: Module[];
