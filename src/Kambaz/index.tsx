import { Routes, Route, Navigate } from "react-router";
import { useState } from "react";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Home from "./Courses/Home";
import "./Kambaz.css";
import * as db from "./Database";
import ProtectedRoute from "./Account/ProtectedRoute";
// import { v4 as uuidv4 } from "uuid";

export default function Kambaz() {
    const [courses, setCourses] = useState(db.courses);
    const [course, setCourse] = useState({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description",
    });

    const addNewCourse = () => {
        const newCourse = { ...course, _id: uuidv4() };
        setCourses([...courses, newCourse]);
    };

    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = () => {
        setCourses(
            courses.map((c) => (c._id === course._id ? course : c))
        );
    };

    return (
        <div id="wd-kambaz">
            {/* Sidebar Navigation */}
            <KambazNavigation />

            {/* Main Content Area with Offset */}
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Account" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route
                        path="/Dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard
                                    courses={courses}
                                    setCourses={setCourses}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                    course={course}
                                    setCourse={setCourse}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/Courses" element={<Courses courses={courses} />} />
                    <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute>} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    <Route path="/Dashboard/Home" element={<Home />} />
                </Routes>
            </div>
        </div>
    );
}
function uuidv4() {
    throw new Error("Function not implemented.");
}

