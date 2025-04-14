import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/useUser';
import CourseService, { Course } from '../../services/CourseService';
import CourseNavigation from './CourseNavigation';
import { CourseHomeWrapper } from './CourseHome';
import Modules from './Modules';
import Assignments from './Assignments';
import People from './People';
import CourseForm from './CourseForm'; // 引入 CourseForm 組件
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
      // 嘗試獲取真實的課程 ID 並處理各種路徑格式
      let realCourseId = cid;
      
      // 檢查 courseId 是否包含子路徑
      if (cid && cid.includes('/')) {
        // 確保獲取正確的課程 ID，不受後續路徑段影響
        const pathParts = cid.split('/');
        // 如果第一個部分是一個可能的課程 ID (不包含 'home', 'assignments' 等關鍵字)
        if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
          realCourseId = pathParts[0];
        } else {
          // 如果不是有效的課程 ID，可能有其他問題
          console.error(`Invalid course ID format: ${cid}`);
        }
        console.log(`修正的課程ID: 從 '${cid}' 提取為 '${realCourseId}'`);
      }
      
      if (!realCourseId) {
        console.error('找不到有效的課程ID');
        setError('無法載入課程：未找到有效的課程ID');
        setLoading(false);
        return;
      }
      
      console.log(`正在載入課程詳情，ID: ${realCourseId}`);
      
      try {
        setLoading(true);
        const courseData = await CourseService.getCourseById(realCourseId);
        console.log('成功載入課程詳情:', courseData.name);
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
    // 顯示編輯模態框
    console.log(`打開課程編輯模態框，課程ID: ${cid}`);
    setShowEditModal(true);
  };
  
  // 處理編輯成功的回調
  const handleEditSuccess = () => {
    console.log('課程編輯成功，關閉模態框');
    setShowEditModal(false);
    
    // 重新獲取課程詳情以更新頁面
    if (cid) {
      const fetchCourseDetails = async () => {
        // 嘗試獲取真實的課程 ID 並處理各種路徑格式
        let realCourseId = cid;
        
        // 檢查 courseId 是否包含子路徑
        if (cid && cid.includes('/')) {
          // 確保獲取正確的課程 ID，不受後續路徑段影響
          const pathParts = cid.split('/');
          // 如果第一個部分是一個可能的課程 ID (不包含 'home', 'assignments' 等關鍵字)
          if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
          } else {
            // 如果不是有效的課程 ID，可能有其他問題
            console.error(`Invalid course ID format: ${cid}`);
          }
          console.log(`修正的課程ID: 從 '${cid}' 提取為 '${realCourseId}'`);
        }
        
        if (!realCourseId) {
          console.error('找不到有效的課程ID');
          setError('無法載入課程：未找到有效的課程ID');
          setLoading(false);
          return;
        }
        
        console.log(`正在載入課程詳情，ID: ${realCourseId}`);
        
        try {
          setLoading(true);
          const courseData = await CourseService.getCourseById(realCourseId);
          console.log('成功載入課程詳情:', courseData.name);
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
  
  // 處理關閉模態框
  const handleCloseEditModal = () => {
    console.log('關閉課程編輯模態框');
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
      
      {/* 編輯模態框 */}
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
