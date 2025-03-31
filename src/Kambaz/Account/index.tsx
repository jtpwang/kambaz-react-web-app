import { Routes, Route, Navigate } from "react-router";
import { useSelector } from "react-redux";
import Signin from "./Signin";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import AccountNavigation from "./Navigation.tsx";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  return (
    <div id="wd-account-screen" className="pt-3">
      <div className="d-flex">
        <div className="account-nav" style={{ width: "150px", minWidth: "150px" }}>
          <AccountNavigation />
        </div>
        <div className="account-content flex-grow-1 ms-3">
          <Routes>
            <Route
              path="/"
              element={
                <Navigate to={
                  currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"
                } />
              }
            />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}