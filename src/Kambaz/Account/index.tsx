import { Routes, Route, Navigate } from "react-router";

import Signin from "./Signin";
import Profile from "./Profile.tsx";
import Signup from "./Signup.tsx";
import AccountNavigation from "./Navigation.tsx";

export default function Account() {
  return (
    <div id="wd-account-screen" className="pt-3">
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/Kambaz/Account/Signin" />}
              />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}