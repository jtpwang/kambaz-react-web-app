import { Route, Routes, useLocation } from "react-router";
import CourseNavigation from "./Navigation.tsx";
import { Navigate, useParams } from "react-router-dom";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor.tsx";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table.tsx";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === cid);
    return (
        <div id="wd-courses">
            <div className="mt-3 d-none d-md-block">
                <h2 className="text-danger">
                    <FaAlignJustify className=" fs-4 me-4" />
                    {course && course.name} &gt; {pathname.split("/")[4]}
                    <hr />
                </h2>
            </div>
            <div className="d-md-none sticky-top">

            </div>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Quizzes" element={<h2>Quizzes</h2>} />
                        <Route path="Grades" element={<h2>Grades</h2>} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
