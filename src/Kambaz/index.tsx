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
          
          {/* 公開路由 - Account 區域處理自己的授權邏輯 */}
          <Route path="/Account/*" element={<Account />} />
          
          {/* 受保護路由 - 需要登入才能訪問 */}
          <Route path="/Dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          {/* 保護所有課程相關路徑 */}
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
