import { Routes, Route, Navigate }
  from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import * as db from "./Database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    description: "New Description",
  });

  const addNewCourse = () => {
    const newCourse = {
      ...course,
      _id: uuidv4(),
    };
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((c: any) => c._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c: any) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
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
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
              />
            </ProtectedRoute>
          } />
          <Route path="/Courses/:cid/*" element={
            <ProtectedRoute>
              <Courses courses={courses} />
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
  );
}