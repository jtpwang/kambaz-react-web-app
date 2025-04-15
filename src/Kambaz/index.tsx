import { Routes, Route, Navigate }
  from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Kambaz() {
  return (
    <div id="wd-kambaz" style={{ display: 'flex', width: '100%' }}>
      <div style={{ flexShrink: 0 }}>
        <KambazNavigation />
      </div>
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          
          <Route path="/Account/*" element={<Account />} />
          
          <Route path="/Dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/Courses" element={
            <ProtectedRoute>
              <Navigate to="/Kambaz/Dashboard" replace />
            </ProtectedRoute>
          } />
          
          <Route path="/Courses/:cid/*" element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          } />
          
          <Route path="/Calendar" element={
            <ProtectedRoute>
              <h1>Calendar</h1>
            </ProtectedRoute>
          } />
          
          <Route path="/Inbox" element={
            <ProtectedRoute>
              <h1>Inbox</h1>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
}
