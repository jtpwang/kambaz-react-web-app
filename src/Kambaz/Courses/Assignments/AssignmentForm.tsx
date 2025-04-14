import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AssignmentInput, getAssignmentById, createAssignment, updateAssignment } from '../../../services/AssignmentService';
import { Module, getAllModules } from '../../../services/ModuleService';
import { formatDateForInput } from '../../../utils/dateUtils';
import './Assignment.css';

interface AssignmentFormProps {
  assignmentId?: string;
  cid?: string;
}

export default function AssignmentForm({ assignmentId, cid }: AssignmentFormProps) {
  // Get course ID from URL params
  const params = useParams<{ courseId: string; cid: string }>();

  // Attempt to extract course ID, covering various cases
  let courseId = cid || params.courseId || params.cid;

  // Check if course ID contains extra path segments
  if (courseId && courseId.includes('/')) {
    const pathParts = courseId.split('/');
    // If the first part isn't a known sub-path, treat it as the course ID
    if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
      courseId = pathParts[0];
    }
    console.log(`AssignmentForm - Extracted course ID from path '${courseId}': '${courseId}'`);
  }

  const navigate = useNavigate();
  const isEditMode = !!assignmentId;

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Set initial form data
  const [formData, setFormData] = useState<AssignmentInput>({
    title: '',
    description: '',
    dueDate: formatDateForInput(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // Default due in 1 week
    availableDate: formatDateForInput(new Date()),
    points: 100,
    isPublished: false,
    moduleIds: []
  });

  // Fetch course modules and assignment data
  useEffect(() => {
    if (!courseId) {
      console.error('AssignmentForm - Missing course ID');
      setError('Course ID not found. Please return to the course page and try again.');
      return;
    }

    console.log(`AssignmentForm - Using course ID: ${courseId}`);

    const fetchData = async () => {
      setLoading(true);
      try {
        // Get course modules
        const modulesResponse = await getAllModules(courseId);
        if (modulesResponse.success) {
          setModules(modulesResponse.data.modules);
        }

        // If in edit mode, fetch assignment data
        if (isEditMode && assignmentId) {
          const assignment = await getAssignmentById(courseId, assignmentId);

          setFormData({
            title: assignment.title,
            description: assignment.description,
            dueDate: formatDateForInput(new Date(assignment.dueDate)),
            availableDate: formatDateForInput(new Date(assignment.availableDate)),
            points: assignment.points,
            isPublished: assignment.isPublished,
            moduleIds: assignment.moduleIds
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, assignmentId, isEditMode]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number'
          ? parseFloat(value)
          : value
    }));
  };

  // Handle changes in module selection
  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedModules: string[] = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedModules.push(options[i].value);
      }
    }

    setFormData(prev => ({
      ...prev,
      moduleIds: selectedModules
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseId) {
      setError('Missing course ID.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`AssignmentForm - Submitting assignment data, course ID: ${courseId}`);

      if (isEditMode && assignmentId) {
        // Update existing assignment
        await updateAssignment(courseId, assignmentId, formData);
        navigate(`/Kambaz/Courses/${courseId}/Assignments`);
      } else {
        // Create new assignment
        await createAssignment(courseId, formData);
        navigate(`/Kambaz/Courses/${courseId}/Assignments`);
      }
    } catch (err: unknown) {
      console.error('Error saving assignment:', err);
      setError('Failed to save assignment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Cancel form and go back
  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${courseId}/Assignments`);
  };

  if (loading && !formData.title) {
    return <div className="loading">Loading assignment data...</div>;
  }

  return (
    <div className="assignment-form-container">
      <h2>{isEditMode ? 'Edit Assignment' : 'Create New Assignment'}</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="assignment-form">
        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Assignment title"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Assignment description"
          />
        </div>

        {/* Available Date */}
        <div className="form-group">
          <label htmlFor="availableDate">Available Date</label>
          <input
            type="datetime-local"
            id="availableDate"
            name="availableDate"
            value={formData.availableDate}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Due Date */}
        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Points */}
        <div className="form-group">
          <label htmlFor="points">Points</label>
          <input
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
            min={0}
            required
          />
        </div>

        {/* Related Modules */}
        <div className="form-group">
          <label htmlFor="moduleIds">Related Modules (Hold Ctrl/Cmd to select multiple)</label>
          <select
            id="moduleIds"
            name="moduleIds"
            multiple
            value={formData.moduleIds}
            onChange={handleModuleChange}
            size={Math.min(5, modules.length || 1)}
          >
            {modules.map(module => (
              <option key={module._id} value={module._id}>
                {module.title}
              </option>
            ))}
          </select>
        </div>

        {/* Publish Status */}
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleInputChange}
          />
          <label htmlFor="isPublished">Published</label>
        </div>

        {/* Buttons */}
        <div className="form-buttons">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update Assignment' : 'Create Assignment')}
          </button>
        </div>
      </form>
    </div>
  );
}
