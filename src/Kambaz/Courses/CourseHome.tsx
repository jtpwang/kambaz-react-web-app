import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/useUser';
import { Course } from '../../services/CourseService';
import './CourseHome.css';
import { useParams } from 'react-router-dom';
import CourseService from '../../services/CourseService';

interface CourseHomeProps {
  course?: Course;
}

// Create a wrapper component to handle obtaining course information from complex paths
export const CourseHomeWrapper: React.FC = () => {
  const { cid } = useParams<{ cid: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // Handle possible complex paths
        let realCourseId = cid;
        if (cid && cid.includes('/')) {
          const pathParts = cid.split('/');
          if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
          }
          console.log(`CourseHomeWrapper - from '${cid}' get ID: '${realCourseId}'`);
        }

        if (!realCourseId) {
          throw new Error('missing id');
        }

        const courseData = await CourseService.getCourseById(realCourseId);
        setCourse(courseData);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('cannot fetch details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [cid]);

  if (loading) {
    return <div className="loading">loading...</div>;
  }

  if (error || !course) {
    return <div className="error">{error || 'cannot find class'}</div>;
  }

  return <CourseHome course={course} />;
};

/**
 * Course home component that displays course information and announcements
 */
const CourseHome: React.FC<CourseHomeProps> = ({ course }) => {
  const { currentUser } = useUser();


  // If no course data is passed
  if (!course) {
    return <div className="error">cannot find class details</div>;
  }

  // Format date to readable string
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="course-home">
      <div className="course-info-section">
        <h3>Course Information</h3>
        <div className="course-info-grid">
          <div className="course-info-item">
            <strong>Course Code:</strong> {course.number}
          </div>
          <div className="course-info-item">
            <strong>Course Name:</strong> {course.name}
          </div>
          {course.instructor && (
            <div className="course-info-item">
              <strong>Instructor:</strong> {`${course.instructor.firstName} ${course.instructor.lastName}`}
              {course.instructor.email && ` (${course.instructor.email})`}
            </div>
          )}
          <div className="course-info-item">
            <strong>Created On:</strong> {formatDate(course.createdAt)}
          </div>
          <div className="course-info-item">
            <strong>Last Updated:</strong> {formatDate(course.updatedAt)}
          </div>
        </div>

        <div className="course-description-box">
          <h4>Course Description</h4>
          <p>{course.description}</p>
        </div>
      </div>

      <div className="course-announcements">
        <div className="announcements-header">
          <h3>Course Announcements</h3>
          {currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY') && (
            <button className="btn-add-announcement">Add Announcement</button>
          )}
        </div>

        {course.announcements && course.announcements.length > 0 ? (
          <div className="announcements-list">
            {course.announcements.map(announcement => (
              <div key={announcement._id} className="announcement-item">
                <h4>{announcement.title}</h4>
                <div className="announcement-meta">
                  Posted On: {formatDate(announcement.createdAt)}
                </div>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-announcements">
            No course announcements at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHome;
