import { useState, useEffect, useReducer } from "react";
import { FaExclamationTriangle, FaCheckCircle, FaSave } from "react-icons/fa";
import { useUser } from "../../contexts/useUser";
import axios from "axios";
import { eventEmitter } from "../../utils/EventEmitter";

export default function Profile() {
  // Use UserContext
  const { currentUser, updateProfile } = useUser();

  // Counter to force re-rendering
  const [renderCount, forceUpdate] = useReducer(x => x + 1, 0);

  // User data state
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    role: "USER"
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Listen for user data update events
  useEffect(() => {
    // Event handler
    const handleUserUpdated = (updatedUser: any) => {
      console.log("Profile received user update event:", updatedUser.role);
      // Use functional update to ensure latest state
      setUserData(prevData => ({
        username: updatedUser.username || prevData.username,
        password: "", // Clear password field
        firstName: updatedUser.firstName || prevData.firstName,
        lastName: updatedUser.lastName || prevData.lastName,
        dob: updatedUser.dob ? new Date(updatedUser.dob).toISOString().split('T')[0] : prevData.dob,
        email: updatedUser.email || prevData.email,
        role: updatedUser.role || prevData.role
      }));

      // Force re-render
      forceUpdate();
    };

    // Register event listener
    eventEmitter.on('user:updated', handleUserUpdated);

    // Cleanup on unmount
    return () => {
      eventEmitter.off('user:updated', handleUserUpdated);
    };
  }, [renderCount]); // Include renderCount to re-register on force update

  // Load user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      console.log("Updating profile display:", currentUser.role, "Render count:", renderCount);
      setUserData(prevData => ({
        username: currentUser.username || prevData.username,
        password: "", // Do not show actual password
        firstName: currentUser.firstName || prevData.firstName,
        lastName: currentUser.lastName || prevData.lastName,
        dob: currentUser.dob ? new Date(currentUser.dob).toISOString().split('T')[0] : prevData.dob,
        email: currentUser.email || prevData.email,
        role: currentUser.role || prevData.role
      }));
      setIsLoading(false);
    } else {
      // If no user in context, fetch from API as fallback
      fetchUserProfile();
    }
  }, [currentUser, renderCount]);

  // Fetch user profile from backend (fallback when UserContext is empty)
  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:4000/api/users/profile", {
        withCredentials: true
      });

      if (!response.data) {
        throw new Error("Failed to fetch profile data");
      }

      const data = response.data;

      // Set user data, leave password field empty
      setUserData({
        username: data.username || "",
        password: "", // Don't display actual password
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "",
        email: data.email || "",
        role: data.role || "USER"
      });

      setIsLoading(false);
    } catch (errorObj) {
      const errorMessage = errorObj instanceof Error ? errorObj.message : "Failed to retrieve profile data";
      setError(`${errorMessage}. Please try again later.`);
      setIsLoading(false);
    }
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, name, value } = e.target;
    const fieldName = id ? id.replace("wd-", "") : name;

    setUserData(prevData => ({
      ...prevData,
      [fieldName]: value
    }));
  };

  // Save user data
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!userData.username) {
        setError("Username is required");
        setIsSaving(false);
        return;
      }

      // Prepare update data
      const updateData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
      } as any;

      if (userData.dob) {
        updateData.dob = userData.dob;
      }

      if (userData.password) {
        updateData.password = userData.password;
      }

      console.log("Sending data to backend...");

      console.log("Locally updating role display to:", updateData.role);

      try {
        // Await backend response
        const updatedUser = await updateProfile(updateData);
        console.log("Backend update successful:", updatedUser.role);

        // Sync local UI after successful backend update
        setSuccess("Profile updated successfully");

        // Force re-render to ensure event handlers receive the latest state
        setTimeout(() => {
          forceUpdate();
          console.log("Forced re-render complete");
        }, 200);
      } catch (apiError: any) {
        console.error("Backend update failed:", apiError);
        setError(apiError.message || "Error updating profile. Please try again later.");
      }
    } catch (error: any) {
      // Handle local errors
      console.error("Local processing error:", error);
      setError(error.message || "Error updating profile. Please try again later.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper function to display role options as readable names
  const getRoleDisplayName = (role: string): string => {
    switch (role) {
      case "ADMIN": return "Administrator";
      case "FACULTY": return "Faculty";
      case "STUDENT": return "Student";
      case "USER": return "User";
      default: return role;
    }
  };

  if (isLoading) {
    return (
      <div id="wd-profile-screen" className="p-4">
        <h3>Profile</h3>
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="wd-profile-screen" className="p-4">
      <h3 className="mb-4">Profile</h3>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          <FaExclamationTriangle className="me-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-3" role="alert">
          <FaCheckCircle className="me-2" />
          {success}
        </div>
      )}

      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="wd-username" className="form-label">Username</label>
          <input
            id="wd-username"
            className="form-control"
            placeholder="Username"
            value={userData.username}
            onChange={handleChange}
            readOnly  // Username should not be modified
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-password" className="form-label">Password</label>
          <input
            id="wd-password"
            type="password"
            className="form-control"
            placeholder="Enter new password to change, leave empty to keep unchanged"
            value={userData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-firstName" className="form-label">First Name</label>
          <input
            id="wd-firstName"
            className="form-control"
            placeholder="First Name"
            value={userData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-lastName" className="form-label">Last Name</label>
          <input
            id="wd-lastName"
            className="form-control"
            placeholder="Last Name"
            value={userData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-dob" className="form-label">Date of Birth</label>
          <input
            id="wd-dob"
            type="date"
            className="form-control"
            value={userData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-email" className="form-label">Email</label>
          <input
            id="wd-email"
            type="email"
            className="form-control"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="wd-role" className="form-label">Role</label>
          <select
            id="wd-role"
            className="form-control"
            value={userData.role}
            onChange={handleChange}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Administrator</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <strong>Current role:</strong> {getRoleDisplayName(userData.role)} ({userData.role})
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Saving...
              </>
            ) : (
              <>
                <FaSave className="me-2" /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
