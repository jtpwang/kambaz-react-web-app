import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("Signin component rendered");

  const signin = async () => {
    try {
      setError(null);
      console.log("Attempting signin with:", credentials);

      if (!credentials.username || !credentials.password) {
        setError("please input username and password");
        return;
      }

      const user = await client.signin(credentials);

      if (!user) {
        setError("Failed to authenticate user, please check username and password");
        return;
      }

      console.log("User authenticated successfully:", user);
      dispatch(setCurrentUser(user));
      navigate("/Kambaz/Account/Profile");
    } catch (err) {
      console.error("Error during signin:", err);
      setError("Failed to sign in, please try again later");
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign In</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        className="form-control mb-2"
        placeholder="Username"
        id="wd-username"
      />
      <input
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        className="form-control mb-2"
        placeholder="Password"
        type="password"
        id="wd-password"
      />
      <button
        onClick={signin}
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign In
      </button>
      <div className="mt-2">
        <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
          Register
        </Link>
      </div>
      <div className="mt-3">
        <p className="text-muted">Test accounts:</p>
        <ul className="text-muted">
          <li>Faculty: username: alice, password: alice123</li>
          <li>Student: username: bob, password: bob123</li>
        </ul>
      </div>
    </div>
  );
}
