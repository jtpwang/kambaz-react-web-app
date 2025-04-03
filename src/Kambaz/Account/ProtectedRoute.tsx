import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {
    const location = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    console.log("===== ProtectedRoute Debugging =====");
    console.log("Current Location:", location.pathname);
    console.log("Current User:", currentUser);
    console.log("Enrollments:", enrollments);

    // If the user is not logged in, redirect to the signin page
    if (!currentUser) {
        console.log("Not logged in, redirecting to Signin page");
        return <Navigate to="/Kambaz/Account/Signin" />;
    }

    // Check if it's a course-related route
    const isCourseRoute = location.pathname.includes("/Kambaz/Courses/");
    console.log("Is course route:", isCourseRoute);
    
    // If it's not a course route, or the user is a faculty member, allow access
    if (!isCourseRoute || currentUser.role === "FACULTY") {
        console.log("Not a course page or user is faculty, access granted");
        return children;
    }
    
    // If a student is accessing a course page, check if they're enrolled
    if (currentUser.role === "STUDENT") {
        console.log("User is a student, checking enrollment status");
        const pathParts = location.pathname.split("/");
        const courseIndex = pathParts.findIndex(part => part === "Courses");
        
        if (courseIndex !== -1 && pathParts.length > courseIndex + 1) {
            const courseId = pathParts[courseIndex + 1];
            console.log("Attempting to access course ID:", courseId);
            
            console.log("Checking enrollment status for course ID:", courseId);
            console.log("Enrollments detail:", JSON.stringify(enrollments, null, 2));
            
            // Enhanced logic to verify enrollment
            let isEnrolled = false;
            
            if (enrollments && Array.isArray(enrollments)) {
                console.log("Starting enrollment list check...");
                enrollments.forEach((enrollment: any, index) => {
                    console.log(`Checking enrollment record ${index}:`, enrollment);
                    
                    if (enrollment.course && typeof enrollment.course === 'object' && enrollment.course._id) {
                        console.log(`Record ${index} course ID:`, enrollment.course._id);
                        if (enrollment.course._id === courseId) {
                            console.log(`Match found! ${enrollment.course._id} === ${courseId}`);
                            isEnrolled = true;
                        }
                    } else if (typeof enrollment.course === 'string') {
                        console.log(`Record ${index} course ID (string):`, enrollment.course);
                        if (enrollment.course === courseId) {
                            console.log(`Match found! ${enrollment.course} === ${courseId}`);
                            isEnrolled = true;
                        }
                    }
                });
            } else {
                console.log("No valid enrollment data or enrollments is not an array");
            }
            
            console.log("Final enrollment status:", isEnrolled);
            
            // If not enrolled, redirect to dashboard
            if (!isEnrolled) {
                console.log("Not enrolled in the course, redirecting to dashboard");
                return <Navigate to="/Kambaz/Dashboard" />;
            }
            
            console.log("Student is enrolled in the course, access granted");
        }
    }
    
    // All checks passed, allow access
    console.log("All checks passed, access granted");
    return children;
}
