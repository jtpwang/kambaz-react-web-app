import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {
    const location = useLocation();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    const isCourseRoute = location.pathname.includes("/Kambaz/Courses/");

    if (isCourseRoute && currentUser && currentUser.role === "STUDENT") {

        const pathParts = location.pathname.split("/");
        const courseIndex = pathParts.findIndex(part => part === "Courses");
        if (courseIndex !== -1 && pathParts.length > courseIndex + 1) {
            const courseId = pathParts[courseIndex + 1];

            const isEnrolled = enrollments.some(
                (enrollment: any) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === courseId
            );

            if (!isEnrolled) {
                return <Navigate to="/Kambaz/Dashboard" />;
            }
        }
    }

    if (currentUser) {
        return children;
    } else {
        return <Navigate to="/Kambaz/Account/Signin" />;
    }
}