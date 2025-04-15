import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/useUser';
import CourseService, { Course } from '../../services/CourseService';
import CourseNavigation from './CourseNavigation';
import { CourseHomeWrapper } from './CourseHome';
import Modules from './Modules';
import Assignments from './Assignments';
import People from './People';
import CourseForm from './CourseForm';
import './CourseDetail.css';

/**
 * Course detail page component
 * Displays the selected course with navigation and related content
 */
const CourseDetail: React.FC = () => {
  const { cid } = useParams<{ cid: string }>();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  // Fetch course details when component mounts or courseId changes
  useEffect(() => {
    const fetchCourseDetails = async () => {
      // Attempt to get the real course ID and handle various path formats
      let realCourseId = cid;

      // Check if courseId contains a subpath
      if (cid && cid.includes('/')) {
        // Ensure we extract the correct course ID, unaffected by subsequent path segments
        const pathParts = cid.split('/');
        // If the first part is a possible course ID (and not 'home', 'assignments', etc.)
        if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
          realCourseId = pathParts[0];
        } else {
          // If it's not a valid course ID, there might be another issue
          console.error(`Invalid course ID format: ${cid}`);
        }
        console.log(`Corrected course ID: extracted '${realCourseId}' from '${cid}'`);
      }

      if (!realCourseId) {
        console.error('No valid course ID found');
        setError('Unable to load course: No valid course ID found');
        setLoading(false);
        return;
      }

      console.log(`Loading course details, ID: ${realCourseId}`);

      try {
        setLoading(true);
        const courseData = await CourseService.getCourseById(realCourseId);
        console.log('Successfully loaded course details:', courseData.name);
        setCourse(courseData);
        setError(null);
      } catch (err: Error | unknown) {
        console.error('failed to fetch course details:', err);
        setError('Unable to load course details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [cid]);

  // Show loading state
  if (loading) {
    return <div className="course-loading">Loading course...</div>;
  }

  // Show error state
  if (error) {
    return <div className="course-error">{error}</div>;
  }

  // Show not found state
  if (!course) {
    return <div className="course-not-found">Course not found.</div>;
  }

  // Handle course deletion, ensuring courseId is valid
  const handleDeleteCourse = () => {
    if (!cid) return;

    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      CourseService.deleteCourse(cid)
        .then(() => {
          navigate('/Kambaz/Dashboard');
        })
        .catch((err) => {
          console.error('failed to delete course:', err);
          alert('Failed to delete course. Please try again.');
        });
    }
  };

  // Handle editing course
  const handleEditCourse = () => {
    // Show the edit modal
    console.log(`Opening course edit modal, course ID: ${cid}`);
    setShowEditModal(true);
  };

  // Callback for successful edit
  const handleEditSuccess = () => {
    console.log('Course edited successfully, closing modal');
    setShowEditModal(false);

    // Refetch course details to update the page
    if (cid) {
      const fetchCourseDetails = async () => {
        // Attempt to get the real course ID and handle various path formats
        let realCourseId = cid;

        // Check if courseId contains a subpath
        if (cid && cid.includes('/')) {
          // Ensure we extract the correct course ID, unaffected by subsequent path segments
          const pathParts = cid.split('/');
          // If the first part is a potential course ID (not 'home', 'assignments', etc.)
          if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
          } else {
            // If it's not a valid course ID, there might be another issue
            console.error(`Invalid course ID format: ${cid}`);
          }
          console.log(`Corrected course ID: extracted '${realCourseId}' from '${cid}'`);
        }

        if (!realCourseId) {
          console.error('No valid course ID found');
          setError('Unable to load course: No valid course ID found');
          setLoading(false);
          return;
        }

        console.log(`Loading course details, ID: ${realCourseId}`);

        try {
          setLoading(true);
          const courseData = await CourseService.getCourseById(realCourseId);
          console.log('Successfully loaded course details:', courseData.name);
          setCourse(courseData);
          setError(null);
        } catch (err: Error | unknown) {
          console.error('Error fetching course details:', err);
          setError('Unable to load course details. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      fetchCourseDetails();
    }
  };

  // Handle closing the edit modal
  const handleCloseEditModal = () => {
    console.log('Closing course edit modal');
    setShowEditModal(false);
  };

  return (
    <div className="course-detail">
      <div className="course-header">
        <h2>{course.number}: {course.name}</h2>
        <p className="course-description">{course.description}</p>

        {/* Admin/Faculty Actions */}
        {currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY') && (
          <div className="course-admin-actions">
            <button
              className="btn-edit"
              onClick={handleEditCourse}
            >
              Edit Course
            </button>
            <button
              className="btn-delete"
              onClick={handleDeleteCourse}
            >
              Delete Course
            </button>
          </div>
        )}
      </div>

      <hr />

      <div className="course-content">
        <div className="course-sidebar">
          <CourseNavigation />
        </div>
        <div className="course-main-content">
          <Routes>
            <Route path="/" element={<Navigate to="home" replace />} />
            <Route path="home/*" element={<CourseHomeWrapper />} />
            <Route path="modules/*" element={<Modules />} />
            <Route path="assignments/*" element={<Assignments />} />
            <Route path="people/*" element={<People />} />
          </Routes>
        </div>
      </div>

      {showEditModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Course</h5>
                <button type="button" className="close" onClick={handleCloseEditModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {cid && (
                  <CourseForm
                    isModal={true}
                    courseIdToEdit={cid}
                    onSuccess={handleEditSuccess}
                    onCancel={handleCloseEditModal}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
