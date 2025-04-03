import { createSlice } from "@reduxjs/toolkit";

interface Enrollment {
  _id?: string;
  user: string;
  course: {
    _id: string;
    name?: string;
    description?: string;
    [key: string]: any;
  };
}

const initialState = {
  enrollments: [] as Enrollment[],
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
    enrollCourse: (state, { payload }) => {
      // check if already enrolled
      const isEnrolled = state.enrollments.some(
        (e) => e.user === payload.user && e.course._id === payload.course._id
      );
      
      // if not enrolled, add new enrollment
      if (!isEnrolled) {
        state.enrollments.push(payload);
      }
    },
    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      // filter out the course to be unenrolled
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course._id === courseId)
      );
    },
  },
});

export const { toggleShowAllCourses, setEnrollments, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
