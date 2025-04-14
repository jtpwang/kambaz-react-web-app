import { Link } from "react-router-dom";
import { FaUniversity, FaUser, FaTachometerAlt, FaBook, FaCalendarAlt, FaInbox, FaFlask } from "react-icons/fa";

export default function KambazNavigation() {
    return (
        <div id="wd-kambaz-navigation" className="text-white" style={{ width: "120px", height: "100vh", backgroundColor: "#003262" }}>
            <ul className="list-unstyled p-0 m-0">
                <li className="text-center p-3">
                    <Link to="https://www.northeastern.edu/" id="wd-neu-link" target="_blank" className="text-white text-decoration-none">
                        <FaUniversity className="d-block mx-auto mb-1 fs-3" />
                        <span className="small" style={{ fontSize: "0.7rem", wordWrap: "break-word" }}>Northeastern</span>
                    </Link>
                </li>
                <li className="text-center p-3">
                    <Link to="/Kambaz/Account" id="wd-account-link" className="text-white text-decoration-none">
                        <FaUser className="d-block mx-auto mb-1 fs-3" />
                        <span className="small">Account</span>
                    </Link>
                </li>
                <li className="text-center p-3">
                    <Link to="/Kambaz/Dashboard" id="wd-dashboard-link" className="text-white text-decoration-none">
                        <FaTachometerAlt className="d-block mx-auto mb-1 fs-3" />
                        <span className="small">Dashboard</span>
                    </Link>
                </li>
                <li className="text-center p-3">
                    <Link to="/Kambaz/Courses" id="wd-courses-link" className="text-white text-decoration-none">
                        <FaBook className="d-block mx-auto mb-1 fs-3" />
                        <span className="small">Courses</span>
                    </Link>
                </li>
                <li className="text-center p-3">
                    <Link to="/Kambaz/Calendar" id="wd-calendar-link" className="text-white text-decoration-none">
                        <FaCalendarAlt className="d-block mx-auto mb-1 fs-3" />
                        <span className="small">Calendar</span>
                    </Link>
                </li>
                <li className="text-center p-3">
                    <Link to="/Kambaz/Inbox" id="wd-inbox-link" className="text-white text-decoration-none">
                        <FaInbox className="d-block mx-auto mb-1 fs-3" />
                        <span className="small">Inbox</span>
                    </Link>
                </li>
                <li className="text-center p-3">
                    <Link to="/Labs" id="wd-labs-link" className="text-white text-decoration-none">
                        <FaFlask className="d-block mx-auto mb-1 fs-3" />
                        <span className="small">Labs</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
