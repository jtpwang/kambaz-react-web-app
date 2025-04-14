import React, { useEffect, useState } from 'react';
import { useUser } from '../../contexts/useUser';
import { Course } from '../../services/CourseService';
import './CourseHome.css';
import { useParams } from 'react-router-dom';
import CourseService from '../../services/CourseService';

interface CourseHomeProps {
  course?: Course;
}

// 創建一個包裝組件，用於處理從複雜路徑獲取課程資訊
export const CourseHomeWrapper: React.FC = () => {
  const { cid } = useParams<{ cid: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        // 處理可能的複雜路徑
        let realCourseId = cid;
        if (cid && cid.includes('/')) {
          const pathParts = cid.split('/');
          if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
          }
          console.log(`CourseHomeWrapper - 從路徑 '${cid}' 提取課程 ID: '${realCourseId}'`);
        }
        
        if (!realCourseId) {
          throw new Error('課程 ID 缺失');
        }
        
        const courseData = await CourseService.getCourseById(realCourseId);
        setCourse(courseData);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('無法載入課程詳情');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [cid]);
  
  if (loading) {
    return <div className="loading">正在載入課程詳情...</div>;
  }
  
  if (error || !course) {
    return <div className="error">{error || '找不到課程'}</div>;
  }
  
  return <CourseHome course={course} />;
};

/**
 * Course home component that displays course information and announcements
 */
const CourseHome: React.FC<CourseHomeProps> = ({ course }) => {
  const { currentUser } = useUser();
  
  // 如果沒有傳入課程數據
  if (!course) {
    return <div className="error">找不到課程資訊</div>;
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
        <h3>課程資訊</h3>
        <div className="course-info-grid">
          <div className="course-info-item">
            <strong>課程代碼:</strong> {course.number}
          </div>
          <div className="course-info-item">
            <strong>課程名稱:</strong> {course.name}
          </div>
          {course.instructor && (
            <div className="course-info-item">
              <strong>講師:</strong> {`${course.instructor.firstName} ${course.instructor.lastName}`}
              {course.instructor.email && ` (${course.instructor.email})`}
            </div>
          )}
          <div className="course-info-item">
            <strong>創建日期:</strong> {formatDate(course.createdAt)}
          </div>
          <div className="course-info-item">
            <strong>最後更新:</strong> {formatDate(course.updatedAt)}
          </div>
        </div>
        
        <div className="course-description-box">
          <h4>課程描述</h4>
          <p>{course.description}</p>
        </div>
      </div>
      
      <div className="course-announcements">
        <div className="announcements-header">
          <h3>課程公告</h3>
          {currentUser && (currentUser.role === 'ADMIN' || currentUser.role === 'FACULTY') && (
            <button className="btn-add-announcement">新增公告</button>
          )}
        </div>
        
        {course.announcements && course.announcements.length > 0 ? (
          <div className="announcements-list">
            {course.announcements.map(announcement => (
              <div key={announcement._id} className="announcement-item">
                <h4>{announcement.title}</h4>
                <div className="announcement-meta">
                  發布時間: {formatDate(announcement.createdAt)}
                </div>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-announcements">
            目前沒有課程公告。
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHome;
