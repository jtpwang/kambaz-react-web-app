import { Link } from "react-router-dom";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            {/* Search Bar and Buttons */}
            <div id="wd-search-bar">
                <input
                    id="wd-search-assignments"
                    placeholder="Search for Assignments"
                />
                <button id="wd-add-assignment-group">+ Group</button>
                <button id="wd-add-assignment">+ Assignment</button>
            </div>
            {/* Assignments Title */}
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>
            {/* Assignments List */}
            <ul id="wd-assignment-list">
                <li className="wd-assignment-list-item">
                    <Link
                        to="/Kambaz/Courses/1234/Assignments/123"
                        className="wd-assignment-link"
                    >
                        A1 - ENV + HTML
                    </Link>
                    <br />
                    <span>
                        Multiple Modules |{" "}
                        <strong>Not available until May 6 at 12:00am</strong>
                    </span>
                    <br />
                    <span>Due May 13 at 11:59pm | 100 pts</span>
                </li>
                <li className="wd-assignment-list-item">
                    <Link
                        to="/Kambaz/Courses/1234/Assignments/124"
                        className="wd-assignment-link"
                    >
                        A2 - CSS + BOOTSTRAP
                    </Link>
                    <br />
                    <span>
                        Multiple Modules |{" "}
                        <strong>Not available until May 13 at 12:00am</strong>
                    </span>
                    <br />
                    <span>Due May 20 at 11:59pm | 100 pts</span>
                </li>
                <li className="wd-assignment-list-item">
                    <Link
                        to="/Kambaz/Courses/1234/Assignments/125"
                        className="wd-assignment-link"
                    >
                        A3 - JAVASCRIPT + REACT
                    </Link>
                    <br />
                    <span>
                        Multiple Modules |{" "}
                        <strong>Not available until May 20 at 12:00am</strong>
                    </span>
                    <br />
                    <span>Due May 27 at 11:59pm | 100 pts</span>
                </li>
                <li className="wd-assignment-list-item">
                    {/* Placeholder for additional assignments */}
                    Complete on Your Own
                </li>
            </ul>
        </div>
    );
}

