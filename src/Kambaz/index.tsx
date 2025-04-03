import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import { useState, useEffect, useCallback } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { useSelector } from "react-redux";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchAllCourses = useCallback(async () => {
    try {
      console.log("Starting to fetch all courses...");
      // Using userClient.findAllCourses()
      const allCoursesData = await userClient.findAllCourses();
      console.log("Fetched all courses:", allCoursesData);

      if (Array.isArray(allCoursesData) && allCoursesData.length > 0) {
        console.log(`Successfully set ${allCoursesData.length} courses to allCourses state`);
        setAllCourses(allCoursesData);
      } else {
        console.error("API returned an invalid course format:", allCoursesData);
      }
    } catch (error) {
      console.error("Failed to fetch all courses:", error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      console.log("Starting to fetch user courses...");
      const courses = await userClient.findMyCourses();
      console.log("Fetched user courses:", courses);
      setCourses(courses);

      // After fetching user courses, also refresh all courses
      fetchAllCourses();
    } catch (error) {
      console.error("Failed to fetch user courses:", error);
      // Even if fetching user courses fails, attempt to fetch all courses
      fetchAllCourses();
    }
  }, [fetchAllCourses]);

  useEffect(() => {
    fetchCourses();
  }, [currentUser, fetchCourses]);

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("failed to create course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((c: any) => c._id !== courseId));
    } catch (error) {
      console.error("failed to delete course:", error);
    }
  };

  const updateCourse = async () => {
    try {
      await courseClient.updateCourse(course);
      setCourses(
        courses.map((c: any) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        })
      );
    } catch (error) {
      console.error("failed to update course:", error);
    }
  };

  return (
    <Session>
      <div id="wd-kambaz" className="d-flex vh-100">
        <div className="wd-navigation" style={{
          width: "60px",
          background: "#222",
          color: "white",
          position: "fixed",
          height: "100vh",
          zIndex: 1000
        }}>
          <KambazNavigation />
        </div>
        <div className="wd-main-content-offset p-3" style={{
          flex: "1",
          marginLeft: "60px",
          width: "calc(100% - 60px)"
        }}>
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  allCourses={allCourses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                  refreshCourses={fetchCourses}
                />
              </ProtectedRoute>
            } />
            <Route path="/Courses" element={
              <ProtectedRoute>
                <Courses courses={currentUser?.role === "FACULTY" ? allCourses : courses} currentUser={currentUser} />
              </ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={
              <ProtectedRoute>
                <Courses courses={currentUser?.role === "FACULTY" ? allCourses : courses} currentUser={currentUser} />
              </ProtectedRoute>
            } />
            <Route path="/Calendar" element={
              <ProtectedRoute>
                <h1>Calendar</h1>
              </ProtectedRoute>
            } />
            <Route path="/Inbox" element={
              <ProtectedRoute>
                <h1>Inbox</h1>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Session>
  );
}