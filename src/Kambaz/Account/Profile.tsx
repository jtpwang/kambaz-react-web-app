import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer"; // Import Redux action

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current user from Redux
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Local state for profile information
  const [profile, setProfile] = useState<any>({});

  // Redirect to Signin if no user is logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, navigate]);

  // Sign out function
  const signout = () => {
    dispatch(setCurrentUser(null)); // Clear user from Redux
    navigate("/Kambaz/Account/Signin"); // Redirect to Signin page
  };

  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>

      {profile && (
        <>
          <Form.Control
            value={profile.username}
            placeholder="Username"
            className="wd-username mb-2"
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <Form.Control
            value={profile.password}
            placeholder="Password"
            type="password"
            className="wd-password mb-2"
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <Form.Control
            value={profile.firstName}
            placeholder="First Name"
            id="wd-firstname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <Form.Control
            value={profile.lastName}
            placeholder="Last Name"
            id="wd-lastname"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <Form.Control
            value={profile.dob}
            className="mb-2"
            type="date"
            id="wd-dob"
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <Form.Control
            value={profile.email}
            type="email"
            id="wd-email"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <Form.Select
            value={profile.role}
            id="wd-role"
            className="mb-2"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>

          <button onClick={signout} className="btn btn-danger w-100">
            Signout
          </button>
        </>
      )}
    </div>
  );
}
