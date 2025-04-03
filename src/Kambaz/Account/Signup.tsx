import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      setError(null);

      if (!user.username || !user.password) {
        setError("Please enter username and password");
        return;
      }

      const currentUser = await client.signup(user);

      if (!currentUser) {
        setError("Failed to register, please try again later");
        return;
      }

      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (err: any) {
      console.error("Error during signup:", err);
      const errorMessage = err.response?.data?.message || "Failed to register, please try again later";
      setError(errorMessage);
    }
  };

  return (
    <div id="wd-signup-screen">
      <h1>Sign Up</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <input
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control mb-2 wd-username"
        placeholder="Username"
      />

      <input
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        className="form-control mb-2 wd-password"
        placeholder="Password"
      />

      <button
        onClick={signup}
        className="btn btn-primary w-100 mb-2 wd-signup-btn">
        Sign Up
      </button>

      <div className="mt-2">
        <Link to="/Kambaz/Account/Signin" className="wd-signin-link">
          Already have an account? Login
        </Link>
      </div>
    </div>
  );
}
