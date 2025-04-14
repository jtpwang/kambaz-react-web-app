import { FaSignInAlt, FaExclamationCircle } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/useUser";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Failed to login");
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginFailed(false);

    // Form validation
    if (!username || !password) {
      setLoginFailed(true);
      setErrorMessage("Username and password are required");
      setIsLoading(false);
      return;
    }

    try {
      // Use the login function provided by UserContext
      await login(username, password);

      // Redirect to dashboard on successful login
      console.log("Login successful, redirecting to: /Kambaz/Dashboard");
      navigate("/Kambaz/Dashboard", { replace: true });

    } catch (error: any) {
      // Handle login failure
      console.error("Login error:", error);
      setLoginFailed(true);
      setErrorMessage(error.message || "Login failed. Please try again later.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4">
      <h3 className="mb-4">Sign in</h3>

      {loginFailed && (
        <div className="alert alert-danger mb-3" role="alert">
          <FaExclamationCircle className="me-2" />
          {errorMessage}
          <hr />
          <p className="mb-0">
            Don't have an account? <Link to="/Kambaz/Account/Signup" className="alert-link">Sign up</Link>
          </p>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <input
          placeholder="username"
          className="form-control mb-4"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />

        <input
          placeholder="password"
          type="password"
          className="form-control mb-4"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#0275d8", borderColor: "#0275d8" }} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing in...
            </>
          ) : (
            <>
              <FaSignInAlt className="me-2" /> Sign in
            </>
          )}
        </button>
      </form>
    </div>
  );
}
