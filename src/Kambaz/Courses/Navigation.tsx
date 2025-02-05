import { Link } from "react-router-dom";

export default function CourseNavigation() {
    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            <Link to="/Kambaz/Courses/1234/Home" id="wd-course-home-link"
                className="list-group-item active border-0" aria-current="true">
                Home
            </Link>

            <Link to="/Kambaz/Courses/1234/Modules" id="wd-course-modules-link"
                className="list-group-item list-group-item-action text-danger border-0">
                Modules
            </Link>

            <a id="wd-course-piazza-link"
                href="https://piazza.com/class/m5h5iqr0wds2l5"
                target="_blank"
                rel="noopener noreferrer"
                className="list-group-item list-group-item-action text-danger border-0">
                Piazza
            </a>

            <a id="wd-course-zoom-link"
                href="https://zoom.us/myhome"
                target="_blank"
                rel="noopener noreferrer"
                className="list-group-item list-group-item-action text-danger border-0">
                Zoom Meetings
            </a>

            <Link to="/Kambaz/Courses/1234/Assignments" id="wd-course-assignments-link"
                className="list-group-item list-group-item-action text-danger border-0">
                Assignments
            </Link>

            <a id="wd-course-quizzes-link"
                href="https://northeastern.instructure.com/courses/206195/quizzes"
                target="_blank"
                rel="noopener noreferrer"
                className="list-group-item list-group-item-action text-danger border-0">
                Quizzes
            </a>

            <a id="wd-course-grades-link"
                href="https://northeastern.instructure.com/courses/206195/grades"
                target="_blank"
                rel="noopener noreferrer"
                className="list-group-item list-group-item-action text-danger border-0">
                Grades
            </a>

            <Link to="/Kambaz/Courses/1234/People" id="wd-course-people-link"
                className="list-group-item list-group-item-action text-danger border-0">
                People
            </Link>

            <Link to="/Kambaz/Courses/1234/Settings" id="wd-course-settings-link"
                className="list-group-item list-group-item-action text-danger border-0">
                Settings
            </Link>
        </div>
    );
}
