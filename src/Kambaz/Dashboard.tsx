import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleShowAllCourses, enrollCourse, unenrollCourse } from "./Dashboard/reducer";
import { Button } from "react-bootstrap";

export default function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
            courses: any[]; course: any; setCourse: (course: any) => void;
            addNewCourse: () => void; deleteCourse: (courseId: any) => void;
            updateCourse: () => void;
        }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments, showAllCourses } = useSelector((state: any) => state.enrollmentsReducer);

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
    };

    const handleEditCourse = (courseToEdit: any) => {
        setCourse(courseToEdit);
    };

    // handle enrollment
    const handleEnroll = (courseId: string) => {
        if (currentUser) {
            dispatch(enrollCourse({ userId: currentUser._id, courseId }));
        }
    };

    // handle unenrollment
    const handleUnenroll = (courseId: string) => {
        if (currentUser) {
            dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
        }
    };

    // toggle course display
    const toggleCourseDisplay = () => {
        dispatch(toggleShowAllCourses());
    };

    // check if user is enrolled
    const isEnrolled = (courseId: string) => {
        return enrollments.some(
            (enrollment: any) =>
                enrollment.user === currentUser?._id &&
                enrollment.course === courseId
        );
    };

    // handle course navigation
    const handleCourseNavigation = (courseId: string) => {
        if (currentUser?.role === "FACULTY" || isEnrolled(courseId)) {
            navigate(`/Kambaz/Courses/${courseId}`);
        } else {
            alert("You need to enroll in this course before accessing it");
        }
    };

    // show form condition: only when user is FACULTY
    const showEditControls = currentUser && currentUser.role === "FACULTY";
    // show enrollment button condition: only when user is STUDENT
    const showEnrollmentControls = currentUser && currentUser.role === "STUDENT";

    // determine which courses to display
    const displayedCourses = showAllCourses || !showEnrollmentControls
        ? courses // show all courses
        : courses.filter((c) => isEnrolled(c._id)); // show only enrolled courses

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
                                onClick={updateCourse}
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
