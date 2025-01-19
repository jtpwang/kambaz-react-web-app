import { Link } from "react-router-dom";

export default function CourseNavigation() {
    return (
        <div id="wd-courses-navigation">
            <ul>
                <li>
                    <Link to="/Kambaz/Courses/1234/Home" id="wd-course-home-link">Home</Link>
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link">Modules</Link>
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Piazza" id="wd-course-piazza-link">Piazza</Link>
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Zoom" id="wd-course-zoom-link">Zoom</Link>
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Assignments" id="wd-course-assignments-link">Assignments</Link>
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Quizzes" id="wd-course-quizzes-link">Quizzes</Link>
                </li>
                <li>
                    <Link to="/Kambaz/Courses/1234/Grades" id="wd-course-grades-link">Grades</Link>
                </li>
            </ul>
        </div>
    );
}
