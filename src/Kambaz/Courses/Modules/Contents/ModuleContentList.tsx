import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ModuleContent,
  getAllModuleContents,
  deleteModuleContent,
  updateContentOrder
} from '../../../../services/ModuleContentService';
import { Module, getModuleById } from '../../../../services/ModuleService';
import { User } from '../../../../contexts/UserContext';
import { useUser } from '../../../../contexts/useUser';
import ModuleContentItem from './ModuleContentItem';
import ModuleContentForm from './ModuleContentForm';
import './ModuleContent.css';

// Check if the user has permission to edit module content (ADMIN or FACULTY role)
const hasEditPermission = (user: User | null) => {
  return user && (user.role === 'ADMIN' || user.role === 'FACULTY');
};

export default function ModuleContentList() {
  const { courseId, moduleId } = useParams<{ courseId: string, moduleId: string }>();

  // status
  const [module, setModule] = useState<Module | null>(null);
  const [contents, setContents] = useState<ModuleContent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingContentId, setEditingContentId] = useState<string | null>(null);
  const { currentUser } = useUser();

  // Fetch module details and its contents
  useEffect(() => {
    if (!courseId || !moduleId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch module details - only passing moduleId as the parameter
        const moduleData = await getModuleById(moduleId);
        setModule(moduleData);

        // Fetch module contents
        const contentsResponse = await getAllModuleContents(courseId, moduleId);
        if (contentsResponse.success) {
          // Sort contents based on the `order` property
          const sortedContents = contentsResponse.data.moduleContents.sort((a, b) => a.order - b.order);
          setContents(sortedContents);
        } else {
          setError(contentsResponse.message || 'Failed to fetch module contents');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('An error occurred while fetching module data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, moduleId]);

  // Handle content deletion
  const handleDeleteContent = async (contentId: string) => {
    if (!courseId || !moduleId) return;

    if (window.confirm('Are you sure you want to delete this content item?')) {
      try {
        await deleteModuleContent(courseId, moduleId, contentId);

        // Remove the deleted content from the list
        setContents(prev => prev.filter(content => content._id !== contentId));
      } catch (err) {
        console.error('Error deleting content:', err);
        setError('Failed to delete content. Please try again.');
      }
    }
  };

  // Handle moving content up
  const handleMoveUp = async (contentId: string) => {
    const contentIndex = contents.findIndex(content => content._id === contentId);
    if (contentIndex <= 0) return; // Already at the top, cannot move up

    const newContents = [...contents];
    const temp = newContents[contentIndex];
    newContents[contentIndex] = newContents[contentIndex - 1];
    newContents[contentIndex - 1] = temp;

    // Update the order
    const contentOrders = newContents.map((content, index) => ({
      contentId: content._id,
      order: index
    }));

    try {
      await updateContentOrder(courseId!, moduleId!, contentOrders);
      setContents(newContents);
    } catch (err) {
      console.error('Error updating content order:', err);
      setError('Failed to update content order. Please try again.');
    }
  };

  // Handle moving content down
  const handleMoveDown = async (contentId: string) => {
    const contentIndex = contents.findIndex(content => content._id === contentId);
    if (contentIndex >= contents.length - 1) return; // Already the last item, cannot move down

    const newContents = [...contents];
    const temp = newContents[contentIndex];
    newContents[contentIndex] = newContents[contentIndex + 1];
    newContents[contentIndex + 1] = temp;

    // update 
    const contentOrders = newContents.map((content, index) => ({
      contentId: content._id,
      order: index
    }));

    try {
      await updateContentOrder(courseId!, moduleId!, contentOrders);
      setContents(newContents);
    } catch (err) {
      console.error('Error updating content order:', err);
      setError('Failed to update content order. Please try again.');
    }
  };

  // Callback after content is successfully added
  const handleContentAdded = (newContent: ModuleContent) => {
    setContents(prev => [...prev, newContent].sort((a, b) => a.order - b.order));
    setShowAddForm(false);
  };

  // Callback after content is successfully edited
  const handleContentUpdated = (updatedContent: ModuleContent) => {
    setContents(prev =>
      prev.map(content =>
        content._id === updatedContent._id ? updatedContent : content
      ).sort((a, b) => a.order - b.order)
    );
    setEditingContentId(null);
  };

  // Cancel adding or editing content
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingContentId(null);
  };

  if (loading && contents.length === 0) {
    return <div className="loading">Loading module contents...</div>;
  }

  const hasPermission = hasEditPermission(currentUser);

  return (
    <div className="module-content-container">
      {module && (
        <div className="module-header">
          <h2>{module.title} - Contents</h2>
          {module.description && <p className="module-description">{module.description}</p>}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {/* Add Content button, only visible to users with permission */}
      {hasPermission && (
        <div className="content-actions">
          <button
            className="add-content-btn"
            onClick={() => setShowAddForm(true)}
          >
            + Add Content
          </button>
        </div>
      )}

      {/* Add Content Form */}
      {showAddForm && courseId && moduleId && (
        <div className="content-form-container">
          <ModuleContentForm
            courseId={courseId}
            moduleId={moduleId}
            onSuccess={handleContentAdded}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Content List */}
      {contents.length === 0 ? (
        <div className="no-contents">
          <p>No content items available for this module yet.</p>
          {hasPermission && !showAddForm && (
            <button
              className="add-first-content-btn"
              onClick={() => setShowAddForm(true)}
            >
              Add Your First Content
            </button>
          )}
        </div>
      ) : (
        <div className="content-list">
          {contents.map((content, index) => (
            <ModuleContentItem
              key={content._id}
              content={content}
              isFirst={index === 0}
              isLast={index === contents.length - 1}
              onEdit={hasPermission ? () => setEditingContentId(content._id) : undefined}
              onDelete={hasPermission ? () => handleDeleteContent(content._id) : undefined}
              onMoveUp={hasPermission && index > 0 ? () => handleMoveUp(content._id) : undefined}
              onMoveDown={hasPermission && index < contents.length - 1 ? () => handleMoveDown(content._id) : undefined}
            />
          ))}
        </div>
      )}

      {/* Edit Content Form */}
      {editingContentId && courseId && moduleId && (
        <div className="content-edit-overlay">
          <div className="content-edit-form">
            <ModuleContentForm
              courseId={courseId}
              moduleId={moduleId}
              contentId={editingContentId}
              onSuccess={handleContentUpdated}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
