import { Routes, Route } from "react-router-dom";
import CourseDetail from "./CourseDetail";
import CourseForm from "./CourseForm";

/**
 * Main Courses component that handles course-related routes
 */
export default function Courses() {
    return (
        <div id="wd-courses">
            <Routes>
                <Route path="/create" element={<CourseForm />} />
                <Route path="/:courseId/edit" element={<CourseForm />} />
                <Route path="/:courseId/home" element={<CourseDetail />} />
                <Route path="/:courseId/modules" element={<CourseDetail />} />
                <Route path="/:courseId/assignments" element={<CourseDetail />} />
                <Route path="/:courseId/people" element={<CourseDetail />} />
                <Route path="/:courseId" element={<CourseDetail />} />
                <Route path="/*" element={<CourseDetail />} />
            </Routes>
        </div>
    );
}
