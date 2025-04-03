import { Route, Routes } from "react-router";
import CourseNavigation from "./Navigation";
import { Link, Navigate, useParams } from "react-router-dom";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import People from "./People";

export default function Courses({ courses, currentUser }: { courses: any[], currentUser?: any }) {
    const { cid } = useParams();
    
    // If no course ID is specified, show the course list
    if (!cid) {
        return (
            <div id="wd-courses" className="container-fluid px-0">
                <div className="course-header mb-3">
                    <h2>Course List</h2>
                    <hr />
                </div>
                <div className="row">
                    {courses.map((course) => (
                        <div className="col-md-4 mb-3" key={course._id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{course.name}</h5>
                                    <p className="card-text">{course.description}</p>
                                    <Link to={`/Kambaz/Courses/${course._id}`} className="btn btn-primary">
                                        View Course
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    // Find the currently selected course
    const course = courses.find((course) => course._id === cid);
    
    return (
        <div id="wd-courses" className="container-fluid px-0">
            <div className="course-header mb-3">
                <h2>{course ? course.name : "Course Details"}</h2>
                <hr />
            </div>
            <div className="d-flex">
                {/* Sidebar: Course Navigation */}
                <div className="course-nav" style={{ width: "150px", minWidth: "150px" }}>
                    <CourseNavigation />
                </div>
                {/* Main Content */}
                <div className="course-content flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules currentUser={currentUser} />} />
                        <Route path="Assignments" element={<Assignments currentUser={currentUser} />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor currentUser={currentUser} />} />
                        <Route path="People" element={<People currentUser={currentUser} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
