import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2>
            <hr />
            <div id="wd-dashboard-courses">
                {/* Course 1 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234" className="wd-dashboard-course-link">
                        <img src="/images/reactjs.jpg" width={200} alt="React Course" />
                        <div>
                            <h5>CS101: React Basics</h5>
                            <p className="wd-dashboard-course-title">Introduction to React Development</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 2 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/5678" className="wd-dashboard-course-link">
                        <img src="/images/vuejs.jpg" width={200} alt="Vue Course" />
                        <div>
                            <h5>CS102: Vue.js Essentials</h5>
                            <p className="wd-dashboard-course-title">Building Interfaces with Vue.js</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 3 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/91011" className="wd-dashboard-course-link">
                        <img src="/images/angular.jpg" width={200} alt="Angular Course" />
                        <div>
                            <h5>CS103: Angular Mastery</h5>
                            <p className="wd-dashboard-course-title">Advanced Angular Development</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 4 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/11234" className="wd-dashboard-course-link">
                        <img src="/images/nodejs.jpg" width={200} alt="Node.js Course" />
                        <div>
                            <h5>CS104: Node.js for Backend</h5>
                            <p className="wd-dashboard-course-title">Server-Side Development with Node.js</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 5 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/21234" className="wd-dashboard-course-link">
                        <img src="/images/python.jpg" width={200} alt="Python Course" />
                        <div>
                            <h5>CS105: Python Programming</h5>
                            <p className="wd-dashboard-course-title">Programming Foundations with Python</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 6 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/31234" className="wd-dashboard-course-link">
                        <img src="/images/htmlcss.jpg" width={200} alt="HTML and CSS Course" />
                        <div>
                            <h5>CS106: Web Design Fundamentals</h5>
                            <p className="wd-dashboard-course-title">Creating Stunning Websites with HTML & CSS</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>

                {/* Course 7 */}
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/41234" className="wd-dashboard-course-link">
                        <img src="/images/java.jpg" width={200} alt="Java Course" />
                        <div>
                            <h5>CS107: Java Development</h5>
                            <p className="wd-dashboard-course-title">Object-Oriented Programming with Java</p>
                            <button>Go</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
