import { FaUserPlus, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { API_BASE } from "../../services/api";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setIsLoading(true);

    // Form validation
    if (!username) {
      setError("Username is required");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }

    if (password !== verifyPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Send signup request to backend
      const response = await axios.post(`${API_BASE}/api/users/signup`, {
        username,
        password,
        role: "USER"
      }, {
        withCredentials: true
      });
      

      const data = response.data;

      if (!data) {
        // Signup failed
        setError("Signup failed");
        setIsLoading(false);
        return;
      }

      // Signup successful
      setError("");
      setSuccess(true);
      setIsLoading(false);

      // Delayed redirect to show success message
      setTimeout(() => {
        window.location.href = "/Kambaz/Account/Signin";
      }, 2000);

    } catch (error) {
      setIsLoading(false);

      // Handle different types of errors
      if (axios.isAxiosError(error) && error.response) {
        // Backend returned error
        if (error.response.status === 400) {
          // Check if username is already taken
          if (error.response.data?.message?.includes("Username already taken")) {
            setError(`Username "${username}" already exists, please try another username`);
          } else {
            setError(error.response.data?.message || "Invalid registration data");
          }
        } else if (error.response.status === 500) {
          setError("Server error, please try again later");
        } else {
          setError(`Signup failed: ${error.response.data?.message || error.message}`);
        }
      } else {
        setError("Signup failed");
      }

      console.error("Signup error:", error);
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4">
      <h3 className="mb-4">Sign up</h3>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          <FaExclamationTriangle className="me-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-3" role="alert">
          <FaCheckCircle className="me-2" />
          Registered successfully! Redirecting to signin page...
        </div>
      )}

      <form onSubmit={handleSignup}>
        <input
          placeholder="username"
          className="form-control mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />

        <input
          placeholder="password"
          type="password"
          className="form-control mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <input
          placeholder="verify password"
          type="password"
          className="form-control mb-4"
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          disabled={isLoading}
        />

        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#0275d8", borderColor: "#0275d8" }} disabled={isLoading}>
          {isLoading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Processing...
            </>
          ) : (
            <>
              <FaUserPlus className="me-2" /> Sign up
            </>
          )}
        </button>
      </form>
    </div>
  );
}
