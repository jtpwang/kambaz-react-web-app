import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

interface CourseCardProps {
  course: {
    _id: string;
    code: string;
    name: string;
    description: string;
    imageUrl?: string;
  };
  userRole: string;
  isEnrolled?: boolean;
  onEnroll?: (courseId: string) => void;
  onUnenroll?: (courseId: string) => void;
}

/**
 * Course card component to display course information
 */
const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  userRole, 
  isEnrolled = false,
  onEnroll,
  onUnenroll
}) => {
  // Default image if none provided
  const imageUrl = course.imageUrl || '/images/default-course.jpg';
  
  // Determine if user is admin or faculty
  const isAdminOrFaculty = userRole === 'ADMIN' || userRole === 'FACULTY';
  
  return (
    <div className="course-card">
      <Link to={`/Kambaz/Courses/${course._id}`} className="course-card-link">
        <img 
          src={imageUrl} 
          className="course-card-image" 
          alt={`${course.name} course`} 
        />
        <div className="course-card-content">
          <h5 className="course-card-code">{course.code}</h5>
          <h4 className="course-card-title">{course.name}</h4>
          <p className="course-card-description">{course.description}</p>
          
          <div className="course-card-actions">
            <button className="btn-primary">Go to Course</button>
            
            {!isAdminOrFaculty && !isEnrolled && onEnroll && (
              <button 
                className="btn-secondary" 
                onClick={(e) => {
                  e.preventDefault();
                  onEnroll(course._id);
                }}
              >
                Enroll
              </button>
            )}
            
            {!isAdminOrFaculty && isEnrolled && onUnenroll && (
              <button 
                className="btn-danger" 
                onClick={(e) => {
                  e.preventDefault();
                  onUnenroll(course._id);
                }}
              >
                Unenroll
              </button>
            )}
            
            {isAdminOrFaculty && (
              <Link 
                to={`/Kambaz/Courses/edit/${course._id}`}
                className="btn-secondary"
                onClick={(e) => e.stopPropagation()}
              >
                Edit
              </Link>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
