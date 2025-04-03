import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

export default function KambazNavigation() {
    const { pathname } = useLocation();
    const links = [
        {
            label: "Dashboard"
            , path: "/Kambaz/Dashboard"
            , icon: AiOutlineDashboard
        },
        {
            label: "Courses"
            , path: "/Kambaz/Courses"
            , icon: LiaBookSolid
        },
        {
            label: "Calendar"
            , path: "/Kambaz/Calendar"
            , icon: IoCalendarOutline
        },
        {
            label: "Inbox"
            , path: "/Kambaz/Inbox"
            , icon: FaInbox
        },
        {
            label: "Labs"
            , path: "/Labs"
            , icon: LiaCogSolid
        },
    ];
    return (
        <div
            id="wd-kambaz-navigation"
            className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black"
            style={{ width: "60px" }}
        >
            {/* Northeastern Logo */}
            <a id="wd-neu-link" href="https://www.northeastern.edu/" target="_blank"
                className="list-group-item bg-black border-0 text-center p-1">
                <img src="/images/northeastern.jpg" width="40px" alt="Northeastern Logo" />
            </a>

            <Link to=
                "/Kambaz/Account" className={`list-group-item text-center border-0 py-2 px-0
${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
                <FaRegCircleUser className={`fs-4 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
                <div className="small mt-1" style={{ fontSize: "0.65rem" }}>Account</div>
            </Link>
            {links.map((link) => (
                <Link key={link.path} to={link.path} className={`list-group-item text-center border-0 py-2 px-0
${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
                    {link.icon({ className: `fs-4 ${pathname.includes(link.label) ? "text-danger" : "text-white"}` })}
                    <div className="small mt-1" style={{ fontSize: "0.65rem" }}>{link.label}</div>
                </Link>
            ))}

        </div>
    );
}
