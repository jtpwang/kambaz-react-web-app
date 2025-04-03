import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: any }) {
    const location = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

    console.log("===== ProtectedRoute 調試 =====");
    console.log("Current Location:", location.pathname);
    console.log("Current User:", currentUser);
    console.log("Enrollments:", enrollments);

    // 如果用戶未登入，導航到登入頁面
    if (!currentUser) {
        console.log("未登入，重定向到登入頁面");
        return <Navigate to="/Kambaz/Account/Signin" />;
    }

    // 檢查是否是課程頁面的路徑
    const isCourseRoute = location.pathname.includes("/Kambaz/Courses/");
    console.log("是課程頁面路徑:", isCourseRoute);
    
    // 如果不是課程頁面，或者是教師，允許訪問
    if (!isCourseRoute || currentUser.role === "FACULTY") {
        console.log("不是課程頁面或用戶是教師，允許訪問");
        return children;
    }
    
    // 如果是學生訪問課程頁面，檢查是否已註冊該課程
    if (currentUser.role === "STUDENT") {
        console.log("用戶是學生，檢查課程註冊狀態");
        const pathParts = location.pathname.split("/");
        const courseIndex = pathParts.findIndex(part => part === "Courses");
        
        if (courseIndex !== -1 && pathParts.length > courseIndex + 1) {
            const courseId = pathParts[courseIndex + 1];
            console.log("嘗試訪問的課程ID:", courseId);
            
            // 檢查學生是否已註冊該課程
            console.log("檢查註冊狀態，課程ID:", courseId);
            console.log("Enrollments 詳細資訊:", JSON.stringify(enrollments, null, 2));
            
            // 修改註冊檢查邏輯，更詳細地記錄每一步
            let isEnrolled = false;
            
            if (enrollments && Array.isArray(enrollments)) {
                console.log("開始檢查註冊列表...");
                enrollments.forEach((enrollment: any, index) => {
                    console.log(`檢查註冊記錄 ${index}:`, enrollment);
                    
                    if (enrollment.course && typeof enrollment.course === 'object' && enrollment.course._id) {
                        console.log(`記錄 ${index} 的課程ID:`, enrollment.course._id);
                        if (enrollment.course._id === courseId) {
                            console.log(`找到匹配！課程ID ${enrollment.course._id} === ${courseId}`);
                            isEnrolled = true;
                        }
                    } else if (typeof enrollment.course === 'string') {
                        console.log(`記錄 ${index} 的課程ID (字串):`, enrollment.course);
                        if (enrollment.course === courseId) {
                            console.log(`找到匹配！課程ID ${enrollment.course} === ${courseId}`);
                            isEnrolled = true;
                        }
                    }
                });
            } else {
                console.log("沒有有效的註冊資料或 enrollments 不是數組");
            }
            
            console.log("最終註冊狀態:", isEnrolled);
            
            // 如果未註冊，導航回儀表板
            if (!isEnrolled) {
                console.log("未註冊該課程，重定向回儀表板");
                return <Navigate to="/Kambaz/Dashboard" />;
            }
            
            console.log("學生已註冊該課程，允許訪問");
        }
    }
    
    // 通過所有檢查，允許訪問
    console.log("通過所有檢查，允許訪問");
    return children;
}