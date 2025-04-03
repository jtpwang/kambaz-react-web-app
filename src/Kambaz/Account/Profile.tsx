import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchProfile = useCallback(() => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  }, [currentUser, navigate]);

  const updateProfile = async () => {
    try {
      setMessage(null);
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Failed to update profile, please try again later");
    }
  };

  const signout = async () => {
    try {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kambaz/Account/Signin");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {message && <div className={message.includes("success") ? "alert alert-success" : "alert alert-danger"}>{message}</div>}
      {profile && (
        <div>
          <div className="mb-2">
            <label htmlFor="wd-username" className="form-label">Username</label>
            <input
              defaultValue={profile.username}
              id="wd-username"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="wd-password" className="form-label">Password</label>
            <input
              defaultValue={profile.password}
              id="wd-password"
              className="form-control"
              type="password"
              onChange={(e) => setProfile({ ...profile, password: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="wd-firstname" className="form-label">First Name</label>
            <input
              defaultValue={profile.firstName}
              id="wd-firstname"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="wd-lastname" className="form-label">Last Name</label>
            <input
              defaultValue={profile.lastName}
              id="wd-lastname"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="wd-dob" className="form-label">Date of Birth</label>
            <input
              defaultValue={profile.dob}
              id="wd-dob"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              type="date"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="wd-email" className="form-label">Email</label>
            <input
              defaultValue={profile.email}
              id="wd-email"
              className="form-control"
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div className="mb-2">
            <label htmlFor="wd-role" className="form-label">Role</label>
            <select
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              className="form-control"
              id="wd-role"
              defaultValue={profile.role}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </select>
          </div>

          <button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
            id="wd-update-btn"
          >
            Update Profile
          </button>

          <button
            onClick={signout}
            className="btn btn-danger w-100 mb-2"
            id="wd-signout-btn"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}