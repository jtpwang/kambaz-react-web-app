import React, { useState, useEffect } from 'react';
import {
  ModuleContent,
  ModuleContentInput,
  ContentType,
  createModuleContent,
  updateModuleContent,
  getModuleContentById,
  uploadContentFile
} from '../../../../services/ModuleContentService';

interface ModuleContentFormProps {
  courseId: string;
  moduleId: string;
  contentId?: string;  // Provide if in edit mode
  onSuccess: (content: ModuleContent) => void;
  onCancel: () => void;
}

const ModuleContentForm: React.FC<ModuleContentFormProps> = ({
  courseId,
  moduleId,
  contentId,
  onSuccess,
  onCancel
}) => {
  // Form state
  const [title, setTitle] = useState<string>('');
  const [contentType, setContentType] = useState<ContentType>(ContentType.TEXT);
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isEditMode, setIsEditMode] = useState<boolean>(!!contentId);

  // Used for drag-and-drop files
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Load content to be edited
  useEffect(() => {
    if (contentId) {
      const fetchContent = async () => {
        try {
          setLoading(true);
          const contentData = await getModuleContentById(courseId, moduleId, contentId);

          // Populate the form
          setTitle(contentData.title);
          setContentType(contentData.contentType);
          setContent(contentData.content);
          setIsEditMode(true);
        } catch (error) {
          console.error('Error fetching content:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchContent();
    }
  }, [courseId, moduleId, contentId]);

  // Validate the form
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (contentType === ContentType.TEXT && !content.trim()) {
      newErrors.content = 'Content is required';
    }

    if ((contentType === ContentType.FILE || contentType === ContentType.IMAGE || contentType === ContentType.VIDEO) && !file && !content) {
      newErrors.file = 'File is required';
    }

    if (contentType === ContentType.LINK && !content.trim()) {
      newErrors.content = 'Link URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let contentUrl = content;

      // If the type is file, image, or video and a new file is selected, upload the file
      if ((contentType === ContentType.FILE || contentType === ContentType.IMAGE || contentType === ContentType.VIDEO) && file) {
        contentUrl = await uploadContentFile(file);
      }

      const contentData: ModuleContentInput = {
        title,
        contentType,
        content: contentUrl
      };

      let result;

      if (isEditMode && contentId) {
        // Update existing content
        result = await updateModuleContent(courseId, moduleId, contentId, contentData);
      } else {
        // Create new content
        result = await createModuleContent(courseId, moduleId, contentData);
      }

      onSuccess(result);
    } catch (error) {
      console.error('Error saving content:', error);
      setErrors({ submit: 'Failed to save content. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle file drag-and-drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Clear the selected file
  const handleClearFile = () => {
    setFile(null);
    // Reset the file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="module-content-form">
      <h3>{isEditMode ? 'Edit' : 'Add New'} Content Item</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            placeholder="Enter content title"
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="contentType">Content Type</label>
          <select
            id="contentType"
            value={contentType}
            onChange={(e) => setContentType(e.target.value as ContentType)}
            disabled={loading || isEditMode} // Content type cannot be changed in edit mode
          >
            <option value={ContentType.TEXT}>Text</option>
            <option value={ContentType.FILE}>File</option>
            <option value={ContentType.VIDEO}>Video</option>
            <option value={ContentType.LINK}>Link</option>
            <option value={ContentType.IMAGE}>Image</option>
          </select>
        </div>

        {/* Display different input areas based on content type */}
        {contentType === ContentType.TEXT && (
          <div className="form-group">
            <label htmlFor="textContent">Text Content</label>
            <textarea
              id="textContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              rows={8}
              placeholder="Enter text content"
              className={errors.content ? 'error' : ''}
            />
            {errors.content && <div className="error-message">{errors.content}</div>}
          </div>
        )}

        {contentType === ContentType.LINK && (
          <div className="form-group">
            <label htmlFor="linkContent">Link URL</label>
            <input
              type="url"
              id="linkContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
              placeholder="Enter link URL (e.g., https://example.com)"
              className={errors.content ? 'error' : ''}
            />
            {errors.content && <div className="error-message">{errors.content}</div>}
          </div>
        )}

        {(contentType === ContentType.FILE || contentType === ContentType.IMAGE || contentType === ContentType.VIDEO) && (
          <div className="form-group">
            {content && !file && (
              <div className="existing-file">
                <p>Current file: {content.split('/').pop()}</p>
                <a href={content} target="_blank" rel="noopener noreferrer">
                  View Current File
                </a>
              </div>
            )}

            <div
              className={`file-upload-area ${isDragging ? 'dragging' : ''} ${errors.file ? 'error' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <label htmlFor="file-upload">
                {file ? file.name : 'Drag & drop file here or click to select'}
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                disabled={loading}
                style={{ display: 'none' }}
              />

              {file && (
                <button
                  type="button"
                  className="clear-file-btn"
                  onClick={handleClearFile}
                >
                  Clear
                </button>
              )}
            </div>
            {errors.file && <div className="error-message">{errors.file}</div>}
          </div>
        )}

        {errors.submit && <div className="form-error">{errors.submit}</div>}

        <div className="form-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModuleContentForm;
