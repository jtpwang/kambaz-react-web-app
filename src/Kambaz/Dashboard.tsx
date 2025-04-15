import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from '../contexts/useUser';
import CourseService, { Course } from '../services/CourseService';
import './Dashboard.css';
import CourseForm from './Courses/CourseForm'; // Import CourseForm component

export default function Dashboard() {
    const { currentUser, loading: userLoading } = useUser();
    const [courses, setCourses] = useState<Course[]>([]);
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'all' | 'enrolled'>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');
    // state for course creation modal
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    // state for course edit modal
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [courseToEdit, setCourseToEdit] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({
        _id: '',
        name: '',
        number: '',
        startDate: '',  // ensure default value
        endDate: '',    // ensure default value
        description: '',
        department: '',  // ensure default value
        credits: 3,      // ensure default value
        imageUrl: ''     // ensure default value
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Ensure user is logged in
    useEffect(() => {
        if (!userLoading && !currentUser) {
            console.log("User not logged in, redirecting to login page");
            navigate("/Kambaz/Account/Signin");
        }
    }, [userLoading, currentUser, navigate]);

    // Fetch enrolled courses
    const fetchEnrolledCourses = useCallback(async () => {
        if (currentUser && (currentUser.role === 'STUDENT' || currentUser.role === 'USER')) {
            try {
                console.log("fetching enrolled courses...");
                setLoading(true);
                const response = await CourseService.getEnrolledCourses(1, 50);
                console.log("fetched enrolled courses:", response.data?.courses?.length || 0);

                // If there are course data, log detailed information
                if (response.data?.courses?.length > 0) {
                    console.log("enrolled course IDs:", response.data.courses.map(c => c._id).join(", "));
                }

                setEnrolledCourses(response.data?.courses || []);
            } catch (err) {
                console.error('Error fetching enrolled courses:', err);
                setError('Unable to load enrolled courses. Please try again.');
            } finally {
                setLoading(false);
            }
        }
    }, [currentUser]);

    // Fetch course list
    const fetchCourses = useCallback(async () => {
        try {
            console.log("fetching all course list...");
            setLoading(true);
            setError(null);

            const response = await CourseService.getAllCourses(1, 50, searchTerm);
            console.log(`fetched ${response.data.courses.length} courses`);

            // Check if any courses have isEnrolled marker
            const coursesWithEnrollmentInfo = response.data.courses.filter((course: Course) => 'isEnrolled' in course);
            console.log(`of which ${coursesWithEnrollmentInfo.length} courses have enrollment status marker`);

            // Output all courses marked as enrolled
            const enrolledCourses = response.data.courses.filter((course: Course) => course.isEnrolled === true);
            if (enrolledCourses.length > 0) {
                console.log("The following courses are enrolled:", enrolledCourses.map((c: Course) => c._id).join(", "));
            }

            // Update local course data
            setCourses(response.data.courses);

            // if no courses have enrollment marker, fetch enrolled courses
            if (coursesWithEnrollmentInfo.length === 0 && currentUser &&
                (currentUser.role === 'STUDENT' || currentUser.role === 'USER')) {
                try {
                    await fetchEnrolledCourses();
                } catch (err) {
                    console.error("failed to fetch enrolled courses:", err);
                }
            } else {
                // if backend has provided enrollment information, update enrolledCourses list
                const enrolledFromBackend = response.data.courses.filter((c: Course) => c.isEnrolled === true);
                if (enrolledFromBackend.length > 0) {
                    console.log("using backend provided enrollment information to update enrolledCourses list");
                    setEnrolledCourses(enrolledFromBackend);
                }
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('Unable to load courses. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [searchTerm, currentUser, fetchEnrolledCourses]);

    // Handle course display logic, add refresh functionality
    const refreshCourseStatus = async () => {
        console.log("refreshing course status...");

        if (currentUser && (currentUser.role === 'STUDENT' || currentUser.role === 'USER')) {
            try {
                console.log("refreshing enrolled courses list");
                await fetchEnrolledCourses();
            } catch (err) {
                console.error("failed to refresh enrolled courses:", err);
            }
        }
    };

    // Auto refresh course status every 30 seconds
    useEffect(() => {
        if (!currentUser) return;

        // Refresh immediately on page load
        refreshCourseStatus();

        // Set interval to refresh course status
        const intervalId = setInterval(() => {
            refreshCourseStatus();
        }, 30000); // Every 30 seconds

        return () => {
            // Clear interval on component unmount
            clearInterval(intervalId);
        };
    }, [currentUser]);

    // When component loads or search term changes, fetch data
    useEffect(() => {
        if (!userLoading && currentUser) {
            console.log("user logged in, fetching course data");
            fetchCourses();
        }
    }, [fetchCourses, fetchEnrolledCourses, userLoading, currentUser]);

    // Enroll in a course - Optimized version, ensures UI updates immediately
    const handleEnroll = async (courseId: string) => {
        try {
            console.log(`trying to enroll in course, ID: ${courseId}`);

            // Check if course is already enrolled
            if (isEnrolled(courseId)) {
                console.log(`course ${courseId} has already been enrolled`);
                setError('you have already enrolled in this course');
                return;
            }

            // Find the complete course object, ensure correct ID
            const targetCourse = courses.find(course => course._id === courseId);

            if (!targetCourse) {
                console.error(`course with ID ${courseId} not found`);
                setError('Unable to find specified course. Please try again.');
                return;
            }

            console.log('course details:', {
                id: targetCourse._id,
                name: targetCourse.name,
                number: targetCourse.number
            });

            // Immediately update UI display, optimistically assume operation will succeed
            // Deep copy course object and set isEnrolled flag
            const enrolledCourse = { ...targetCourse, isEnrolled: true };
            setEnrolledCourses((prev: Course[]) => [...prev, enrolledCourse]);

            // Update isEnrolled status in course list
            setCourses((prev: Course[]) => prev.map(course =>
                course._id === courseId ? { ...course, isEnrolled: true } : course
            ));

            // Clear error message
            setError(null);

            // Clear cache to ensure state consistency
            enrollmentCacheRef.current.clear();

            // Request backend to enroll in course
            try {
                await CourseService.enrollInCourse(targetCourse._id);
                console.log(`Successfully enrolled in course: ${targetCourse.name}`);
            } catch (err: any) {
                console.error('Error enrolling in course:', err);

                // If backend operation fails, restore UI state
                if (!(err.response && err.response.status === 400 &&
                    err.response.data && err.response.data.error &&
                    err.response.data.error.includes('already enrolled'))) {

                    // restore enrolled courses list
                    setEnrolledCourses((prev: Course[]) => prev.filter(course => course._id !== courseId));

                    // restore course list
                    setCourses((prev: Course[]) => prev.map(course =>
                        course._id === courseId ? { ...course, isEnrolled: false } : course
                    ));

                    const errorMessage = err.message || 'Failed to enroll in course. Please try again.';
                    setError(errorMessage);
                }
            }


            // Reload more detailed course and enrollment data
            setTimeout(() => {
                refreshCourseStatus();
            }, 1000);

        } catch (err: any) {
            console.error('failed to enroll in course:', err);
            const errorMessage = err.message || 'Failed to enroll in course. Please try again.';
            setError(errorMessage);
        }
    };

    // Unenroll from a course - Optimized version, ensures UI updates immediately
    const handleUnenroll = async (courseId: string) => {
        try {
            console.log(`trying to cancel enrollment in course, ID: ${courseId}`);

            // Check if course is already enrolled
            if (!isEnrolled(courseId)) {
                console.log(`course ${courseId} has not been enrolled, cannot cancel`);
                setError('you have not enrolled in this course');
                return;
            }

            // Find the complete course object
            const targetCourse = courses.find(course => course._id === courseId) ||
                enrolledCourses.find(course => course._id === courseId);

            if (!targetCourse) {
                console.error(`course with ID ${courseId} not found`);
                setError('Unable to find specified course. Please try again.');
                return;
            }

            // Immediately update UI display, optimistically assume operation will succeed
            // Remember current state to restore on failure
            const previousEnrolledCourses = [...enrolledCourses];

            // Update enrolled courses list
            setEnrolledCourses((prev: Course[]) => prev.filter(course => course._id !== courseId));

            // Update isEnrolled status in course list
            setCourses((prev: Course[]) => prev.map(course =>
                course._id === courseId ? { ...course, isEnrolled: false } : course
            ));

            // Clear error message
            setError(null);

            // Clear cache to ensure state consistency
            enrollmentCacheRef.current.clear();

            // Request backend to unenroll from course
            try {
                await CourseService.unenrollFromCourse(courseId);
                console.log(`Successfully unenrolled from course: ${targetCourse.name}`);
            } catch (err: any) {
                // Handle 404 error (user not enrolled in course)
                if (err.response && err.response.status === 404) {
                    console.log('Backend reports user has not enrolled in this course, frontend state updated');
                    setError('updated course status');
                    // delay clear message
                    setTimeout(() => setError(null), 3000);
                } else {
                    // other errors, restore UI state
                    console.error('failed to unenroll from course:', err);
                    setEnrolledCourses(previousEnrolledCourses);

                    // restore course list
                    setCourses((prev: Course[]) => prev.map(course =>
                        course._id === courseId ? { ...course, isEnrolled: true } : course
                    ));

                    const errorMessage = err.message || 'Failed to cancel enrollment. Please try again.';
                    setError(errorMessage);
                }
            }

            // Reload more detailed course and enrollment data
            setTimeout(() => {
                refreshCourseStatus();
            }, 1000);

        } catch (err: any) {
            console.error('failed to cancel enrollment:', err);
            const errorMessage = err.message || 'Failed to cancel enrollment. Please try again.';
            setError(errorMessage);
        }
    };

    // Handle course deletion
    const handleDeleteCourse = async (courseId: string, courseName: string, event?: React.MouseEvent) => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Show confirmation dialog
        const confirmed = window.confirm(`Do you want to delete course "${courseName}"? This action cannot be undone.`);

        if (confirmed) {
            try {
                setLoading(true);
                console.log(`deleting course: ${courseId}`);

                // call backend API to delete course
                await CourseService.deleteCourse(courseId);

                // refresh course list
                await fetchCourses();

                // show success message
                setError(null);
                alert(`Course "${courseName}" deleted successfully!`);
            } catch (err: Error | unknown) {
                console.error(`Failed to delete course ${courseId}:`, err);
                const errorMessage = err instanceof Error
                    ? err.message
                    : 'Failed to delete course. Please try again.';
                setError(errorMessage);
                alert(`Failed to delete course: ${errorMessage}`);
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle modal open and close
    const handleOpenModal = () => {
        // Reset form data
        setFormData({
            _id: '',
            name: '',
            number: '',
            startDate: '',
            endDate: '',
            description: '',
            department: '',
            credits: 3,
            imageUrl: ''
        });
        setFormErrors({});
        setSubmitError(null);
        setShowCreateModal(true);
    };

    // Handle edit modal open
    const handleOpenEditModal = (courseId: string, event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent event bubbling
        setCourseToEdit(courseId);
        setShowEditModal(true);
    };

    const handleCloseModal = () => {
        setShowCreateModal(false);
    };

    // Handle edit modal close
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setCourseToEdit(null);
    };

    // Handle edit success
    const handleEditSuccess = () => {
        // Close modal
        setShowEditModal(false);
        setCourseToEdit(null);

        // Refresh course list
        fetchCourses();
    };

    // Handle form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));

        // Clear error message for this field
        if (formErrors[name]) {
            setFormErrors((prev: Record<string, string>) => ({ ...prev, [name]: '' }));
        }
    };

    // Handle form submission
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate form
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = 'Course name is required';
        }

        if (!formData.number.trim()) {
            errors.number = 'Course number is required';
        }

        if (!formData.startDate) {
            errors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            errors.endDate = 'End date is required';
        }

        if (!formData.department) {
            errors.department = 'Department is required';
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setSubmitting(true);
        setFormErrors({});
        setSubmitError(null);

        try {
            // Prepare submission data
            const courseInput = {
                name: formData.name,
                number: formData.number,
                startDate: formData.startDate || '',  // Ensure value
                endDate: formData.endDate || '',      // Ensure value
                description: formData.description || '',
                department: formData.department || '',  // Ensure value
                credits: formData.credits || 3,         // Ensure value
                imageUrl: formData.imageUrl || ''       // Ensure value
            };

            if (showCreateModal) {
                // Create new course
                await CourseService.createCourse(courseInput);
                console.log('Course created successfully');
                setShowCreateModal(false);
            } else if (showEditModal && courseToEdit) {
                // Update course
                await CourseService.updateCourse(courseToEdit, courseInput);
                console.log('Course updated successfully');
                setShowEditModal(false);
            }

            // Refresh course list
            fetchCourses();

        } catch (err: any) {
            console.error('Form submission error:', err);
            setSubmitError(err.message || 'Form submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Handle navigation to course page, ensuring correct navigation and event bubbling prevention
    const handleGoToCourse = (courseId: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling to avoid triggering card Link event
        console.log(`Navigating to course page: ${courseId}`);
        navigate(`/Kambaz/Courses/${courseId}`);
    };

    // Ref for caching course enrollment status
    const enrollmentCacheRef = useRef<Map<string, boolean>>(new Map());

    // Check if a course is enrolled - Optimized version, uses memoization to reduce repeated checks
    const isEnrolled = useCallback((courseId: string): boolean => {
        const cache = enrollmentCacheRef.current;

        // If already computed this course's status, return cached result
        if (cache.has(courseId)) {
            return cache.get(courseId)!;
        }

        // First check if the course object itself has an isEnrolled property (from backend)
        const course = courses.find(c => c._id === courseId);

        // Output detailed information for debugging
        console.log(`Checking course ${courseId} enrollment status:`, {
            courseFound: !!course,
            isEnrolledProperty: course?.isEnrolled,
            courseFull: course
        });

        // If course object has isEnrolled = true, return true
        if (course?.isEnrolled === true) {
            console.log(`Course ${courseId} marked as enrolled by backend, using this mark`);
            cache.set(courseId, true);
            return true;
        }

        // Check from local enrolledCourses list
        const enrolled = enrolledCourses.some(c => c._id === courseId);
        if (enrolled) {
            console.log(`Course ${courseId} found in local enrolled list`);
            cache.set(courseId, true);
            return true;
        }

        // If not found in either source, mark as not enrolled
        cache.set(courseId, false);
        return false;
    }, [courses, enrolledCourses]);

    // In dependency changes, clear cache
    useEffect(() => {
        console.log("Course data changed, clearing enrollment cache");
        enrollmentCacheRef.current.clear();
    }, [courses, enrolledCourses]);

    // Determine which courses to display based on current view mode and user role
    const displayedCourses = () => {
        if (!currentUser) return [];

        // For students and normal users, display based on view mode
        if (currentUser.role === 'STUDENT' || currentUser.role === 'USER') {
            return viewMode === 'enrolled' ? enrolledCourses : courses;
        }

        // For admins and faculty, always show all courses
        return courses;
    };

    // Get page title based on user role
    const getPageTitle = () => {
        if (!currentUser) return 'Dashboard';

        switch (currentUser.role) {
            case 'ADMIN':
                return 'Admin Dashboard';
            case 'FACULTY':
                return 'Faculty Dashboard';
            case 'STUDENT':
                return 'Student Dashboard';
            default:
                return 'Dashboard';
        }
    };

    // Check if user can create courses (ADMIN or FACULTY)
    const canCreateCourse = () => {
        return currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY');
    };

    return (
        <div id="wd-dashboard">
            <div className="wd-dashboard-header">
                <h1>{getPageTitle()}</h1>

                {/* Add search box */}
                <div className="wd-search-container">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                    />
                </div>

                {/* Course view toggle buttons - only visible to students and general users */}
                {currentUser && (currentUser.role === 'STUDENT' || currentUser.role === 'USER') && (
                    <div className="wd-view-toggle-container" style={{ marginTop: '15px', marginBottom: '15px' }}>
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${viewMode === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setViewMode('all')}
                            >
                                All Courses
                            </button>
                            <button
                                type="button"
                                className={`btn ${viewMode === 'enrolled' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setViewMode('enrolled')}
                            >
                                My Enrolled Courses
                            </button>
                        </div>
                    </div>
                )}

                {/* If user can create courses, show create button */}
                {canCreateCourse() && (
                    <button
                        className="btn btn-primary"
                        onClick={handleOpenModal}
                    >
                        Create Course
                    </button>
                )}
            </div>

            <hr />

            <h2 id="wd-dashboard-published">
                {viewMode === 'enrolled' ? 'My Courses' : 'Available Courses'}
                ({displayedCourses().length})
            </h2>

            <hr />

            {/* Error message */}
            {error && <div className="wd-error-message">{error}</div>}

            {/* Loading state */}
            {loading ? (
                <div className="wd-loading-indicator">Loading courses...</div>
            ) : (
                <div id="wd-dashboard-courses">
                    {displayedCourses().length > 0 ? (
                        displayedCourses().map(course => (
                            <div key={course._id} className="wd-dashboard-course">
                                <Link to={`/Kambaz/Courses/${course._id}`} className="wd-dashboard-course-link">
                                    <img
                                        src={course.imageUrl || "/images/default-course.jpg"}
                                        width={200}
                                        alt={`${course.name} course`}
                                    />
                                    <div>
                                        <h5>{course.number}</h5>
                                        <p className="wd-dashboard-course-title">{course.name}</p>

                                        {/* Show enrolled tag */}
                                        {isEnrolled(course._id) && (
                                            <span
                                                style={{
                                                    backgroundColor: '#4CAF50',
                                                    color: 'white',
                                                    padding: '2px 8px',
                                                    borderRadius: '4px',
                                                    fontSize: '12px',
                                                    marginRight: '10px'
                                                }}
                                            >
                                                Enrolled
                                            </span>
                                        )}

                                        <div className="wd-course-actions">
                                            <button
                                                className="wd-btn-primary"
                                                onClick={(e) => handleGoToCourse(course._id, e)}
                                            >
                                                Go to Course
                                            </button>

                                            {/* Show enrollment button - Important: Ensure event bubbling is prevented, avoid navigating to course details page */}
                                            {currentUser && (currentUser.role === 'USER' || currentUser.role === 'STUDENT') && !isEnrolled(course._id) && (
                                                <button
                                                    className="btn btn-success wd-btn-enroll"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();  // Prevent event bubbling
                                                        handleEnroll(course._id);
                                                    }}
                                                    style={{ marginLeft: '10px', padding: '5px 15px', backgroundColor: '#28a745', color: 'white', fontWeight: 'bold' }}
                                                >
                                                    Enroll Course
                                                </button>
                                            )}

                                            {currentUser && (currentUser.role === 'USER' || currentUser.role === 'STUDENT') && isEnrolled(course._id) && (
                                                <button
                                                    className="btn btn-danger wd-btn-unenroll"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();  // Prevent event bubbling
                                                        handleUnenroll(course._id);
                                                    }}
                                                    style={{ marginLeft: '10px', padding: '5px 15px', backgroundColor: '#dc3545', color: 'white', fontWeight: 'bold' }}
                                                >
                                                    Unenroll Course
                                                </button>
                                            )}

                                            {currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY') && (
                                                <button
                                                    className="btn btn-primary wd-btn-edit"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();  // Prevent event bubbling
                                                        handleOpenEditModal(course._id, e);
                                                    }}
                                                    style={{ marginLeft: '10px', padding: '5px 15px' }}
                                                >
                                                    Edit
                                                </button>
                                            )}

                                            {currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY') && (
                                                <button
                                                    className="btn btn-danger wd-btn-delete"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();  //Prevent event bubbling
                                                        handleDeleteCourse(course._id, course.name, e);
                                                    }}
                                                    style={{ marginLeft: '10px', padding: '5px 15px' }}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="wd-no-courses-message">
                            {viewMode === 'enrolled'
                                ? 'You are not enrolled in any courses yet.'
                                : 'No courses available.'}
                        </div>
                    )}
                </div>
            )}

            {/* Course creation modal */}
            {showCreateModal && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Create Course</h5>
                                <button type="button" className="close" onClick={handleCloseModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="form-group">
                                        <label>Course Number:</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        {formErrors.number && <div className="text-danger">{formErrors.number}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Course Name:</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Course Description:</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Course Image URL:</label>
                                        <input
                                            type="text"
                                            name="imageUrl"
                                            value={formData.imageUrl}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Start Date:</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        {formErrors.startDate && <div className="text-danger">{formErrors.startDate}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>End Date:</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        {formErrors.endDate && <div className="text-danger">{formErrors.endDate}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Department:</label>
                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                        {formErrors.department && <div className="text-danger">{formErrors.department}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label>Credits:</label>
                                        <input
                                            type="number"
                                            name="credits"
                                            value={formData.credits}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={submitting}
                                    >
                                        {submitting ? 'Creating...' : 'Create Course'}
                                    </button>
                                    {submitError && <div className="text-danger">{submitError}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Course edit modal */}
            {showEditModal && courseToEdit && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Course</h5>
                                <button type="button" className="close" onClick={handleCloseEditModal}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Import CourseForm component, pass modal mode and course ID */}
                                {/* CourseForm will be responsible for fetching course data and displaying the edit form */}
                                <CourseForm
                                    isModal={true}
                                    courseIdToEdit={courseToEdit}
                                    onSuccess={handleEditSuccess}
                                    onCancel={handleCloseEditModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
