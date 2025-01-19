import { Link } from "react-router-dom";
export default function Signin() {
  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      <input placeholder="username" className="wd-username" /> <br />
      <input placeholder="password" type="password" className="wd-password" /> <br />
      <Link id="wd-signin-btn" to="/Kambaz/Dashboard">
        Sign in
      </Link>
      <br />

 
      <Link  to="/Kambaz/Account/Signup"  id="wd-signup-link">Sign up</Link>
    </div>
);}
