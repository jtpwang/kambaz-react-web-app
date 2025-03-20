import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account";
import Dashboard from "./Dashboard"; 
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Home from "./Courses/Home"; 
import "./Kambaz.css"; 
import * as db from "./Database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Kambaz() {
  // State variables moved from Dashboard
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  // Event handlers moved from Dashboard
  const addNewCourse = () => {
    setCourses([...courses, { ...course, id: uuidv4() }]);
  };

  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c.id === course.id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  return (
    <div id="wd-kambaz">
      {/* Sidebar Navigation */}
      <KambazNavigation />

      {/* Main Content Area with Offset */}
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Dashboard" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={
            <Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}
            />
          } />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Courses/:cid/*" element={<Courses courses={courses} />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          <Route path="/Dashboard/Home" element={<Home />} /> 
        </Routes>
      </div>
    </div>
  );
}