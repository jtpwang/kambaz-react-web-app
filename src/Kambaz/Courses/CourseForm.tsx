import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/useUser';
import CourseService, { CourseInput } from '../../services/CourseService';
import './CourseForm.css';

/**
 * Course form component for creating and editing courses
 * Used by both the Create and Edit course pages
 */
interface CourseFormProps {
  isModal?: boolean;
  courseIdToEdit?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ isModal = false, courseIdToEdit, onSuccess, onCancel }) => {
  // If in standalone mode, get courseId from URL params
  const { courseId: urlCourseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { currentUser } = useUser();
  
  // Use courseIdToEdit if provided (modal mode), otherwise use URL param
  const courseId = courseIdToEdit || urlCourseId;
  const isEditMode = !!courseId;
  
  // Form state
  const [formData, setFormData] = useState<CourseInput>({
    number: '',
    name: '',
    description: '',
    imageUrl: '',
    startDate: '',
    endDate: '',
    department: '',
    credits: 0
  });
  
  // Form validation and loading states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Load course data if in edit mode
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!isEditMode) return;
      
      try {
        setLoading(true);
        const courseData = await CourseService.getCourseById(courseId);
        setFormData({
          number: courseData.number || '',
          name: courseData.name,
          description: courseData.description,
          imageUrl: courseData.imageUrl || '',
          
          startDate: (courseData as any).startDate || '',
          endDate: (courseData as any).endDate || '',
          department: (courseData as any).department || '',
          credits: (courseData as any).credits || 0
        });
      } catch (err) {
        console.error('Error fetching course data:', err);
        setSubmitError('Failed to load course data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId, isEditMode]);
  
  // Check if user has permission to create/edit courses
  useEffect(() => {
    if (!currentUser || isModal) return;
    
    if (currentUser.role !== 'ADMIN' && currentUser.role !== 'FACULTY') {
      navigate('/Kambaz/Dashboard');
    }
  }, [currentUser, navigate, isModal]);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.number.trim()) {
      newErrors.number = 'Course number is required';
    } else if (formData.number.length > 20) {
      newErrors.number = 'Course number must be less than 20 characters';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Course name must be less than 100 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required';
    }
    
    if (!formData.startDate.trim()) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate.trim()) {
      newErrors.endDate = 'End date is required';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (formData.credits <= 0) {
      newErrors.credits = 'Credits must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setSubmitting(true);
      setSubmitError(null);
      
      if (isEditMode) {
        // Update existing course
        await CourseService.updateCourse(courseId, formData);
        if (isModal && onSuccess) {
          onSuccess();
        } else {
          navigate(`/Kambaz/Courses/${courseId}`);
        }
      } else {
        // Create new course
        const newCourse = await CourseService.createCourse(formData);
        if (isModal && onSuccess) {
          onSuccess();
        } else {
          navigate(`/Kambaz/Courses/${newCourse._id}`);
        }
      }
    } catch (err: Error | unknown) {
      console.error('Error saving course:', err);
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to save course. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle cancellation
  const handleCancel = () => {
    if (isModal && onCancel) {
      // If in modal mode and onCancel is provided, call it
      onCancel();
    } else if (isEditMode) {
      // If in standalone edit mode, navigate back to course page
      navigate(`/Kambaz/Courses/${courseId}`);
    } else {
      // If in standalone create mode, navigate back to dashboard
      navigate('/Kambaz/Dashboard');
    }
  };
  
  if (loading) {
    return <div className="course-form-loading">Loading course data...</div>;
  }

  // The form content that can be used in both standalone and modal mode
  const formContent = (
    <>
      <h2>{isEditMode ? 'Update Course' : 'Create New Course'}</h2>
      
      {submitError && (
        <div className="form-error-message">{submitError}</div>
      )}
      
      <form className="course-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="number">Course Number *</label>
          <input
            type="text"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="e.g., CS101"
            className={errors.number ? 'error' : ''}
          />
          {errors.number && <div className="field-error">{errors.number}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Course Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Introduction to Computer Science"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Course Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Provide a detailed description of the course..."
            className={errors.description ? 'error' : ''}
          />
          {errors.description && <div className="field-error">{errors.description}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="startDate">Start Date *</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={errors.startDate ? 'error' : ''}
          />
          {errors.startDate && <div className="field-error">{errors.startDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="endDate">End Date *</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className={errors.endDate ? 'error' : ''}
          />
          {errors.endDate && <div className="field-error">{errors.endDate}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="department">Department *</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., Computer Science"
            className={errors.department ? 'error' : ''}
          />
          {errors.department && <div className="field-error">{errors.department}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="credits">Credits *</label>
          <input
            type="number"
            id="credits"
            name="credits"
            value={formData.credits}
            onChange={handleChange}
            min={1}
            className={errors.credits ? 'error' : ''}
          />
          {errors.credits && <div className="field-error">{errors.credits}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/course-image.jpg"
          />
          {formData.imageUrl && (
            <div className="image-preview">
              <img src={formData.imageUrl} alt="Course preview" />
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn-cancel"
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-save"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : isEditMode ? 'Update Course' : 'Create Course'}
          </button>
        </div>
      </form>
    </>
  );

  // If in modal mode, return only the form content
  // If in standalone mode, wrap in course-form-container
  return isModal ? (
    formContent
  ) : (
    <div className="course-form-container">{formContent}</div>
  );
};

export default CourseForm;
