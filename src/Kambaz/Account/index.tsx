import AccountNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import { useUser } from "../../contexts/useUser";

import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import Users from "./Users";
import Logout from "./Logout";

export default function Account() {
  // Use the useUser hook to get the current user state
  const { currentUser } = useUser();

  return (
    <div id="wd-account-screen">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route path="/" element={
                  currentUser
                    ? <Navigate to="/Kambaz/Account/Profile" />
                    : <Navigate to="/Kambaz/Account/Signin" />
                } />
                <Route path="/Signin" element={
                  currentUser
                    ? <Navigate to="/Kambaz/Account/Profile" />
                    : <Signin />
                } />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Signup" element={
                  currentUser
                    ? <Navigate to="/Kambaz/Account/Profile" />
                    : <Signup />
                } />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/Users/:uid" element={<Users />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
