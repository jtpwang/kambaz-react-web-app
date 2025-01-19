import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Route, Routes } from "react-router-dom";

export default function Courses() {
    return (
        <div id="wd-courses">
            <h2>Course 1234</h2>
            <hr />
            <table>
                <tbody>
                    <tr>
                        {/* Left Sidebar: Course Navigation */}
                        <td valign="top">
                            <CourseNavigation />
                        </td>
                        {/* Main Content */}
                        <td valign="top">
                            <Routes>
                                <Route path="Home" element={<Home />} />
                                <Route path="Modules" element={<Modules />} />
                                <Route path="Assignments" element={<Assignments />} />
                                <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                                

                            </Routes>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
