import { Link, useLocation } from "react-router-dom";
import { FaUser, FaSignInAlt, FaUserPlus, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import { useEffect, useState } from "react";
import { eventEmitter } from "../../utils/EventEmitter";

export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useUser();

  // Add local state to track user role
  const [userRole, setUserRole] = useState<string | undefined>(currentUser?.role);

  // Listen for user data update events
  useEffect(() => {
    // Update local role state when currentUser changes
    setUserRole(currentUser?.role);

    // Define the event handler
    const handleUserUpdated = (updatedUser: any) => {
      console.log("Navigation received user update event:", updatedUser.role);
      setUserRole(updatedUser.role);
    };

    // Register event listener
    eventEmitter.on('user:updated', handleUserUpdated);

    // Remove listener when the component unmounts
    return () => {
      eventEmitter.off('user:updated', handleUserUpdated);
    };
  }, [currentUser]);

  // Determine the active state based on current path
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation" className="list-group">
      {!currentUser ? (
        // Not logged in – show Sign In / Sign Up options
        <>
          <Link
            to="/Kambaz/Account/Signin"
            className={`list-group-item ${active("Signin")}`}
          >
            <FaSignInAlt className="me-2" /> Sign in
          </Link>

          <Link
            to="/Kambaz/Account/Signup"
            className={`list-group-item ${active("Signup")}`}
          >
            <FaUserPlus className="me-2" /> Sign up
          </Link>
        </>
      ) : (
        // Logged in – show Profile and Logout options
        <>
          <Link
            to="/Kambaz/Account/Profile"
            className={`list-group-item ${active("Profile")}`}
          >
            <FaUser className="me-2" /> Profile
          </Link>

          <Link
            to="/Kambaz/Account/Logout"
            className={`list-group-item ${active("Logout")}`}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </Link>

          {userRole === "ADMIN" && (
            <Link
              to="/Kambaz/Account/Users"
              className={`list-group-item ${active("Users")}`}
            >
              <FaUsers className="me-2" /> Users
            </Link>
          )}
        </>
      )}
    </div>
  );
}
