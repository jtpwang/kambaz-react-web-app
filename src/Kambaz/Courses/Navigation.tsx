import { Link, useParams } from "react-router-dom";

export default function CourseNavigation() {
    const { courseId } = useParams<{ courseId: string }>();

    return (
        <div className="wd-courses-navigation">
            <ul>
                <li>
                    <Link to={`/Kambaz/Courses/${courseId}/Home`} className="wd-course-home-link">Home</Link>
                </li>
                <li>
                    <Link to={`/Kambaz/Courses/${courseId}/Modules`} className="wd-course-modules-link">Modules</Link>
                </li>
                <li>
                    <Link to={`/Kambaz/Courses/${courseId}/Piazza`} className="wd-course-piazza-link">Piazza</Link>
                </li>
                <li>
                    <Link to={`/Kambaz/Courses/${courseId}/Zoom`} className="wd-course-zoom-link">Zoom</Link>
                </li>
                <li>
                    <Link to={`/Kambaz/Courses/${courseId}/Assignments`} className="wd-course-assignments-link">Assignments</Link>
                </li>
                <li>
                    <Link to={`/Kambaz/Courses/${courseId}/Quizzes`} className="wd-course-quizzes-link">Quizzes</Link>
                </li>
                <li>
                    <Link to={`/Kambaz/Courses/${courseId}/Grades`} className="wd-course-grades-link">Grades</Link>
                </li>
            </ul>
        </div>
    );
}
