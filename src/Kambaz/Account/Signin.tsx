import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Signin</h3>
      <Form.Control
        placeholder="username"
        className="wd-username mb-2" />
      <Form.Control
        placeholder="password"
        type="password"
        className="wd-password mb-2"
      />
      <Link
        to="/Kambaz/Dashboard"
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </Link>
      <Link
        to="/Kambaz/Account/Signup"
        id="wd-signup-link"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>
    </div>
  );
}

