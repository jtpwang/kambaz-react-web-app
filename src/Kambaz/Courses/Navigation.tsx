import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router";

export default function CourseNavigation() {
    const { cid } = useParams();
    const { pathname } = useLocation();

    const links = [
        "Home",
        "Modules",
        "Piazza",
        "Zoom",
        "Assignments",
        "Quizzes",
        "Grades",
        "People",
    ];
    
    return (
        <div id="wd-courses-navigation" className="list-group fs-6">
            {links.map((link, index) => {
                const isActive = pathname.includes(link);
                return (
                    <Link
                        key={index}
                        to={`/Kambaz/Courses/${cid}/${link}`}
                        id={`wd-course-${link.toLowerCase()}-link`}
                        className={`list-group-item py-2 border-0 ${isActive ? "active fw-bold" : ""}`}
                        style={{ 
                            color: isActive ? "red" : "#666",
                            backgroundColor: "transparent",
                            borderRadius: 0
                        }}
                    >
                        {link}
                    </Link>
                );
            })}
        </div>
    );
}