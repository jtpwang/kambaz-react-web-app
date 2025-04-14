import React, { useEffect, useState } from 'react';
import {
  Module,
  ModuleInput,
  createModule,
  updateModule,
  getModuleById
} from '../../../services/ModuleService';

interface ModuleFormProps {
  courseId: string;
  moduleId?: string | null; // If provided, it is edit mode
  onSuccess: (module: Module) => void;
  onCancel: () => void;
}

export default function ModuleForm({
  courseId,
  moduleId,
  onSuccess,
  onCancel
}: ModuleFormProps) {
  // Form state
  const [formData, setFormData] = useState<ModuleInput>({
    title: '',
    description: '',
    order: 0,
    isPublished: false
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isEditMode = Boolean(moduleId);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const moduleData: ModuleInput = {
        title: formData.title,
        description: formData.description,
        isPublished: formData.isPublished
      };

      let result;

      if (moduleId) {
        // Edit existing module - change to only pass two parameters
        result = await updateModule(moduleId, moduleData);
      } else {
        // Create a new module
        result = await createModule(courseId, moduleData);
      }

      onSuccess(result);
    } catch (error: unknown) {
      console.error('Failed to save module:', error);
      setError('Failed to save module. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value
    }));
  };

  // Load module data for editing
  useEffect(() => {
    const fetchModuleData = async () => {
      if (!moduleId) return;

      try {
        setLoading(true);
        // Modify to pass only one parameter
        const moduleData = await getModuleById(moduleId);

        // Fill the form data with fetched module data
        setFormData({
          title: moduleData.title,
          description: moduleData.description || '',
          order: moduleData.order,
          isPublished: moduleData.isPublished
        });

        setError(null);
      } catch (error: unknown) {
        console.error('Error fetching module:', error);
        setError('Could not load module data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]); // Remove the courseId dependency from the useEffect, as it's no longer needed

  return (
    <div className="module-form-container">
      <h2>{isEditMode ? 'Edit Module' : 'Add New Module'}</h2>

      {error && <div className="form-error">{error}</div>}

      <form onSubmit={handleSubmit} className="module-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Module title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            placeholder="Module description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="order">Order</label>
          <input
            type="number"
            id="order"
            name="order"
            value={formData.order}
            onChange={handleInputChange}
            min={0}
          />
        </div>

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

        <div className="form-buttons">
          <button
            type="button"
            onClick={onCancel}
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
            {loading ? 'Saving...' : (isEditMode ? 'Update Module' : 'Create Module')}
          </button>
        </div>
      </form>
    </div>
  );
}

function validateForm(): boolean {
  // TODO: implement form validation
  return true;
}
