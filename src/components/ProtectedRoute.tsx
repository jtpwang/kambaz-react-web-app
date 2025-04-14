import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/useUser';

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protects routes that require authentication.
 * If the user is not logged in, they will be redirected to the Sign In page.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { currentUser, loading } = useUser();
  const location = useLocation();

  // Show a loading indicator while user authentication is being verified
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // If user is not logged in, redirect to the Sign In page
  if (!currentUser) {
    // Prevent redirect loop if already on the Sign In or Sign Up page
    const isAuthPage =
      location.pathname.includes('/Account/Signin') ||
      location.pathname.includes('/Account/Signup');

    if (!isAuthPage) {
      console.log('User not logged in, redirecting to Sign In page', location.pathname);

      // Save the original location for post-login redirect
      return <Navigate to="/Kambaz/Account/Signin" state={{ from: location }} replace />;
    }
  }

  // User is authenticated; render the protected content
  return <>{children}</>;
}
