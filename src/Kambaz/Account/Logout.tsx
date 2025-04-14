import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/useUser";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Use the logout function provided by UserContext
        await logout();

        // After successful logout, navigate to the Sign In page
        navigate("/Kambaz/Account/Signin");
      } catch (error) {
        console.error("Logout error:", error);
        // Even if an error occurs, still try to navigate to the Sign In page
        navigate("/Kambaz/Account/Signin");
      }
    };

    // Execute logout immediately when component is mounted
    performLogout();
  }, [navigate, logout]);

  // This component renders nothing meaningful, it just performs the logout operation
  return (
    <div className="text-center p-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Logging out...</span>
      </div>
      <p className="mt-3">Logging out...</p>
    </div>
  );
}
