import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import './CourseNavigation.css';

/**
 * Course navigation component that displays sidebar navigation for a course
 */
const CourseNavigation: React.FC = () => {
  const { cid } = useParams<{ cid: string }>();
  const location = useLocation();
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    const currentPath = location.pathname;
    return currentPath.includes(path);
  };
  
  return (
    <div className="course-navigation">
      <ul className="course-nav-list">
        <li className={isActive(`/Kambaz/Courses/${cid}/home`) ? 'active' : ''}>
          <Link to={`/Kambaz/Courses/${cid}/home`}>
            Home
          </Link>
        </li>
        <li className={isActive(`/Kambaz/Courses/${cid}/modules`) ? 'active' : ''}>
          <Link to={`/Kambaz/Courses/${cid}/modules`}>
            Modules
          </Link>
        </li>
        <li className={isActive(`/Kambaz/Courses/${cid}/assignments`) ? 'active' : ''}>
          <Link to={`/Kambaz/Courses/${cid}/assignments`}>
            Assignments
          </Link>
        </li>
        <li className={isActive(`/Kambaz/Courses/${cid}/people`) ? 'active' : ''}>
          <Link to={`/Kambaz/Courses/${cid}/people`}>
            People
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CourseNavigation;
