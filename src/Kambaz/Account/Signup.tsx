import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Signup</h3>
      <Form.Control
        placeholder="username"
        className="wd-username mb-2" />
      <Form.Control
        placeholder="password"
        type="password"
        className="wd-password mb-2"
      />
      <Form.Control
        placeholder="verify password"
        type="password"
        className="wd-password-verify mb-2"
      />
      <Link
        to="/Kambaz/Account/Profile"
        className="btn btn-primary w-100 mb-2">
        Signup
      </Link>
      <Link
        to="/Kambaz/Account/Signin"
        className="btn btn-primary w-100 mb-2">
        Signin
      </Link>
    </div>
  );
}
