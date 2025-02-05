import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes } from "react-router-dom";
import PeopleTable from "./People/Table";

export default function Courses() {
    return (
        <div id="wd-courses">
            <h2 className="text-danger">Course 1234</h2>
            <hr />

            {/* Flexbox Layout */}
            <div className="d-flex">
                {/* Sidebar (Course Navigation) */}
                <div className="d-none d-md-block">
                    <CourseNavigation />
                </div>

                {/* Main Content */}
                <div className="flex-fill">
                    <Routes>
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
