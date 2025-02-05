import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard"; 
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Home from "./Courses/Home"; 
import "./Kambaz.css"; 

export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      {/* Sidebar Navigation */}
      <KambazNavigation />

      {/* Main Content Area with Offset */}
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
          <Route path="/Dashboard/Home" element={<Home />} /> 
        </Routes>
      </div>
    </div>
  );
}