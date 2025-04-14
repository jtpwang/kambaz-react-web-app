import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios, { AxiosError } from 'axios';
import { eventEmitter } from '../utils/EventEmitter';
import { API_BASE } from '../services/api';

// Define user type
export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'FACULTY' | 'STUDENT' | 'USER';
  email?: string;
  dob?: string;
}

// Define error response type
interface ErrorResponse {
  message: string;
  [key: string]: unknown;
}

// Define context type
export interface UserContextType {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<User>;
}

// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);

  // Fetch current user info
  const fetchCurrentUser = async () => {
    try {
      setLoading(true);

      // Try to get user data from localStorage first
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setCurrentUser(parsedUser);
          setError(null);

          // Asynchronously verify session, attempt to re-establish if needed
          try {
            await axios.get(`${API_BASE}/api/users/profile`, {
              withCredentials: true
            });
            // Session is valid
            console.log('Session is valid');
          } catch (sessionErr) {
            // If it's a 401 error, session is invalid — try auto login
            if (axios.isAxiosError(sessionErr) && sessionErr.response?.status === 401) {
              console.log('Session expired, attempting auto-login');
              try {
                if (parsedUser.username) {
                  // Use a special auto-login API
                  const autoLoginResponse = await axios.post(`${API_BASE}/api/users/auto-signin`, {
                    userId: parsedUser._id,
                    username: parsedUser.username
                  }, {
                    withCredentials: true
                  });

                  // Save updated user info
                  setCurrentUser(autoLoginResponse.data);
                  localStorage.setItem('currentUser', JSON.stringify(autoLoginResponse.data));

                  console.log('Auto-login successful');

                  // Small delay to ensure session is established
                  await new Promise(resolve => setTimeout(resolve, 100));

                  // Verify session again
                  try {
                    await axios.get(`${API_BASE}/api/users/profile`, {
                      withCredentials: true
                    });
                    console.log('Session verified after auto-login');
                  } catch (verifyErr) {
                    console.error('Session verification failed after auto-login:', verifyErr);
                  }
                }
              } catch (autoLoginErr) {
                console.error('Auto-login failed:', autoLoginErr);
                // Don't clear user from localStorage — let user keep browsing
              }
            }
          }

          // Return early — we’re using user data from localStorage
          setLoading(false);
          return;
        } catch (parseErr) {
          // If JSON parsing fails, remove corrupted data
          localStorage.removeItem('currentUser');
        }
      }

      // If no local data or parsing failed, fetch from API
      try {
        const response = await axios.get(`${API_BASE}/api/users/profile`, {
          withCredentials: true
        });
        setCurrentUser(response.data);
        setError(null);
      } catch (apiErr) {
        // 401 = user not logged in — handle silently
        if (axios.isAxiosError(apiErr) && apiErr.response?.status === 401) {
          console.log('User not logged in');

          // If no local user data, mark for redirect
          const storedUser = localStorage.getItem('currentUser');
          if (!storedUser) {
            console.log('Setting redirect flag to login page');
            localStorage.removeItem('currentUser'); // Clear corrupted data
            setCurrentUser(null);
            setRedirectToLogin(true);
          }
        } else {
          console.error('Error fetching user profile:', apiErr);
        }
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE}/api/users/signin`, {
        username,
        password
      }, {
        withCredentials: true
      });

      setCurrentUser(response.data);

      localStorage.setItem('currentUser', JSON.stringify(response.data));

      setError(null);
    } catch (err: unknown) {
      console.error('Login failed:', err);
      let errorMessage = 'Login failed. Please try again.';

      if (err instanceof AxiosError && err.response?.data) {
        const errorData = err.response.data as ErrorResponse;
        errorMessage = errorData.message || errorMessage;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/api/users/signout`, {}, {
        withCredentials: true
      });
      setCurrentUser(null);
      setError(null);
    } catch (err: unknown) {
      console.error('Logout failed:', err);
      let errorMessage = 'Logout failed. Please try again.';

      if (err instanceof AxiosError && err.response?.data) {
        const errorData = err.response.data as ErrorResponse;
        errorMessage = errorData.message || errorMessage;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData: Partial<User>) => {
    try {
      setLoading(true);
      if (!currentUser) {
        throw new Error('User is not logged in');
      }

      console.log("Current user before update:", currentUser.role);
      console.log("Submitting update data:", userData.role);

      // Request to backend
      const response = await axios.put(`${API_BASE}/api/users/${currentUser._id}`, userData, {
        withCredentials: true
      });

      const updatedUserData = response.data;
      console.log("Updated user data from backend:", updatedUserData.role);

      try {
        // Create a new user object by merging current and updated data
        const newUserState = {
          ...currentUser,
          ...updatedUserData
        };

        // Update context state
        setCurrentUser(newUserState);

        // Small delay to ensure the context updates before continuing
        await new Promise(resolve => setTimeout(resolve, 50));

        // Save updated user data to localStorage
        localStorage.setItem('currentUser', JSON.stringify(newUserState));
        console.log("update localStorage:", newUserState.role);

        // Emit a delayed event to ensure previous operations are completed
        setTimeout(() => {
          // Emit user update event to notify listening components
          eventEmitter.emit('user:updated', newUserState);
          console.log("User update event emitted");
        }, 100);

        setError(null);
      } catch (updateErr) {
        console.error("Failed to update user state:", updateErr);
      }

      // Ensure this runs after all operations complete
      setLoading(false);

      // Return updated user data
      return updatedUserData;
    } catch (err: unknown) {
      console.error('Profile update failed:', err);
      let errorMessage = 'Profile update failed. Please try again later.';

      if (err instanceof AxiosError && err.response?.data) {
        const errorData = err.response.data as ErrorResponse;
        errorMessage = errorData.message || errorMessage;
      }

      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  // Fetch user info on component mount
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Handle redirect to Sign In page if necessary
  useEffect(() => {
    if (redirectToLogin && !loading) {
      console.log('Executing redirect to login page');

      // Check if already on the Sign In page to avoid redirect loops
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/Kambaz/Account/Signin')) {
        // Use absolute path to ensure correct navigation
        window.location.href = `${window.location.origin}/Kambaz/Account/Signin`;
      } else {
        // If already on Sign In, reset the redirect flag
        setRedirectToLogin(false);
      }
    }
  }, [redirectToLogin, loading]);

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    updateProfile
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
