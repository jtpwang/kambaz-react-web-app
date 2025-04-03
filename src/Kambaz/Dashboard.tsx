import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAllCourses, enrollCourse, unenrollCourse, setEnrollments } from "./Dashboard/reducer";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import * as enrollmentsClient from "./Dashboard/client";

export default function Dashboard(
    { courses, allCourses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse, refreshCourses }: {
            courses: any[]; allCourses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (courseId: any) => void;
            updateCourse: () => void; refreshCourses: () => void;
        }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments, showAllCourses } = useSelector((state: any) => state.enrollmentsReducer);

    // Load user enrollments when component mounts or user changes
    useEffect(() => {
        const fetchEnrollments = async () => {
            if (currentUser) {
                try {
                    const userEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
                    dispatch(setEnrollments(userEnrollments));
                } catch (error) {
                    console.error("Error fetching enrollments:", error);
                }
            }
        };
        
        fetchEnrollments();
    }, [currentUser, dispatch]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCourse({ ...course, name: e.target.value });
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCourse({ ...course, description: e.target.value });
    };

    const handleAddCourse = () => {
        addNewCourse();
        // clear form
        setCourse({
            _id: "", name: "New Course", number: "New Number",
            startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
        });
        refreshCourses();
    };

    const handleUpdateCourse = () => {
        updateCourse();
        refreshCourses();
    };

    const handleEditCourse = (courseToEdit: any) => {
        setCourse(courseToEdit);
    };

    // handle enrollment
    const handleEnroll = async (courseId: string) => {
        if (currentUser) {
            try {
                const enrollment = await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
                console.log("Enrollment response:", enrollment);  
                dispatch(enrollCourse(enrollment));
                
                const updatedEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
                console.log("Updated enrollments:", updatedEnrollments);  
                dispatch(setEnrollments(updatedEnrollments));
                
                refreshCourses();
            } catch (error) {
                console.error("Error enrolling in course:", error);
            }
        }
    };

    // handle unenrollment
    const handleUnenroll = async (courseId: string) => {
        if (currentUser) {
            try {
                await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
                dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
                
                const updatedEnrollments = await enrollmentsClient.findEnrollmentsForUser(currentUser._id);
                dispatch(setEnrollments(updatedEnrollments));
                
                refreshCourses();
            } catch (error) {
                console.error("Error unenrolling from course:", error);
            }
        }
    };

    // toggle course display
    const toggleCourseDisplay = () => {
        dispatch(toggleShowAllCourses());
    };

    // check if user is enrolled
    const isEnrolled = (courseId: string) => {
        if (!enrollments || !Array.isArray(enrollments) || enrollments.length === 0) {
            return false;
        }
        
        return enrollments.some((enrollment: any) => {
            const enrolledCourseId = enrollment.course?._id || 
                                    (typeof enrollment.course === 'string' ? enrollment.course : null);
            const enrolledUserId = enrollment.user?._id || 
                                  (typeof enrollment.user === 'string' ? enrollment.user : null);
            
            return enrolledUserId === currentUser?._id && enrolledCourseId === courseId;
        });
    };

    // handle course navigation
    const handleCourseNavigation = (courseId: string) => {
        console.log("Navigate to course:", courseId);
        console.log("Current user:", currentUser);
        console.log("Is enrolled:", isEnrolled(courseId));
        

        try {
            const url = `/Kambaz/Courses/${courseId}/Home`;
            console.log("Navigating to URL:", url);
            navigate(url);
        } catch (error) {
            console.error("Navigation error:", error);
        }
    };

    // show form condition: only when user is FACULTY
    const showEditControls = currentUser && currentUser.role === "FACULTY";
    // show enrollment button condition: only when user is STUDENT
    const showEnrollmentControls = currentUser && currentUser.role === "STUDENT";


    const displayedCourses = showEditControls 
        ? allCourses  
        : (showEnrollmentControls && !showAllCourses
            ? courses.filter(course => 
                enrollments.some((enrollment: any) => {
                    const enrolledCourseId = enrollment.course?._id || 
                                          (typeof enrollment.course === 'string' ? enrollment.course : null);
                    return enrolledCourseId === course._id;
                }))
            : allCourses);  

    console.log("課程顯示狀態:", {
        showEnrollmentControls,
        showEditControls,
        showAllCourses,
        courses: courses.length,
        courses_data: courses,
        allCourses: allCourses.length,
        allCourses_data: allCourses,
        enrollments: enrollments.length,
        displayedCourses: displayedCourses.length
    });

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between align-items-center">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                {showEnrollmentControls && (
                    <Button
                        variant={showAllCourses ? "outline-primary" : "primary"}
                        onClick={toggleCourseDisplay}
                    >
                        {showAllCourses ? "My Enrollments" : "Enrollments"}
                    </Button>
                )}
            </div>
            <hr />

            {/* Course edit form - only for FACULTY */}
            {showEditControls && (
                <div className="mb-4">
                    <div className="d-flex align-items-center">
                        <div>New Course</div>
                        <div className="ms-auto">
                            <button
                                className="btn btn-warning me-2"
                                onClick={handleUpdateCourse}
                                style={{ backgroundColor: "#ffc107", color: "#000" }}
                            >
                                Update
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddCourse}
                                style={{ backgroundColor: "#0d6efd" }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <input
                        type="text"
                        value={course.name}
                        onChange={handleNameChange}
                        placeholder="New Course"
                        className="form-control mb-2"
                    />
                    <textarea
                        value={course.description}
                        onChange={handleDescriptionChange}
                        placeholder="New Description"
                        className="form-control"
                        rows={3}
                    />
                </div>
            )}

            <h2 id="wd-dashboard-published">
                {showAllCourses && showEnrollmentControls ? "All Courses" : "My Courses"}
            </h2>
            <hr />
            <div id="wd-dashboard-courses" className="d-flex flex-wrap">
                {displayedCourses.map((c) => (
                    <div key={c._id} className="me-3 mb-3" style={{ width: '300px', maxWidth: '30%' }}>
                        <div className="card h-100">
                            <img src={c.image || "/images/default.jpg"} className="card-img-top" alt={c.name} />
                            <div className="card-body">
                                <h5 className="card-title">{c.name}</h5>
                                <p className="card-text">{c.description?.substring(0, 60)}...</p>
                            </div>
                            <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                                <Button
                                    variant="primary"
                                    onClick={() => handleCourseNavigation(c._id)}
                                >
                                    Go
                                </Button>

                                {showEditControls && (
                                    <div>
                                        <button
                                            className="btn btn-warning me-1"
                                            onClick={() => handleEditCourse(c)}
                                            style={{ backgroundColor: "#ffc107", color: "#000" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteCourse(c._id)}
                                            style={{ backgroundColor: "#dc3545" }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                                {showEnrollmentControls && (
                                    isEnrolled(c._id) ? (
                                        <Button
                                            variant="danger"
                                            onClick={() => handleUnenroll(c._id)}
                                        >
                                            Unenroll
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="success"
                                            onClick={() => handleEnroll(c._id)}
                                        >
                                            Enroll
                                        </Button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
