import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Signin component rendered");

  const signin = () => {
    setError(null);
    console.log("Attempting signin with:", credentials);

    if (!credentials.username || !credentials.password) {
      setError("please input username and password");
      return;
    }

    console.log("Database users:", db.users);
    const user = db.users.find(
      (u: any) => u.username === credentials.username && u.password === credentials.password);

    console.log("Found user:", user);

    if (!user) {
      setError("username or password is incorrect");
      return;
    }

    try {
      console.log("Dispatching user to store:", user);
      dispatch(setCurrentUser(user));
      console.log("User dispatched successfully");

      navigate("/Kambaz/Dashboard");
    } catch (err) {
      console.error("Error dispatching user:", err);
      setError("sign in failed");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="username"
        id="wd-username"
      />
      <input
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />
      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </button>
      <div className="mt-2">
        <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
          Sign up
        </Link>
      </div>
      <div className="mt-3">
        <p className="text-muted">test accounts:</p>
        <ul className="text-muted">
          <li>Faculty: username: alice, password: alice123</li>
          <li>Student: username: bob, password: bob123</li>
        </ul>
      </div>
    </div>
  );
}