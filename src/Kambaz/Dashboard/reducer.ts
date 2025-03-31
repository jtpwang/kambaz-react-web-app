import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";

const initialState = {
  enrollments: dbEnrollments,
  showAllCourses: false,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    toggleShowAllCourses: (state) => {
      state.showAllCourses = !state.showAllCourses;
    },
    enrollCourse: (state, { payload: { userId, courseId } }) => {
      // check if already enrolled
      const isEnrolled = state.enrollments.some(
        (e) => e.user === userId && e.course === courseId
      );
      
      // if not enrolled, add new enrollment
      if (!isEnrolled) {
        state.enrollments.push({
          user: userId,
          course: courseId,
        });
      }
    },
    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      // filter out the course to be unenrolled
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId)
      );
    },
  },
});

export const { toggleShowAllCourses, enrollCourse, unenrollCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;