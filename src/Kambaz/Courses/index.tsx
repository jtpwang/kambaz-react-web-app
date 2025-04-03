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
    
    // 如果沒有指定課程 ID，顯示課程列表
    if (!cid) {
        return (
            <div id="wd-courses" className="container-fluid px-0">
                <div className="course-header mb-3">
                    <h2>課程列表</h2>
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
                                        查看課程
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    // 找到當前選擇的課程
    const course = courses.find((course) => course._id === cid);
    
    return (
        <div id="wd-courses" className="container-fluid px-0">
            <div className="course-header mb-3">
                <h2>{course ? course.name : "課程詳情"}</h2>
                <hr />
            </div>
            <div className="d-flex">
                {/* 左側邊欄：課程導航 */}
                <div className="course-nav" style={{ width: "150px", minWidth: "150px" }}>
                    <CourseNavigation />
                </div>
                {/* 主要內容 */}
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