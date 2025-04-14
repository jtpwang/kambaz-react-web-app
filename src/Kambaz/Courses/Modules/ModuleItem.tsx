import { FaEdit, FaTrash, FaChevronDown, FaChevronRight, FaEye, FaEyeSlash, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Module } from '../../../services/ModuleService';

interface ModuleItemProps {
  module: Module;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onTogglePublish?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ModuleItem({
  module,
  isExpanded,
  onToggleExpand,
  onTogglePublish,
  onEdit,
  onDelete
}: ModuleItemProps) {
  // Check if the user has management permissions (if these functions are provided as props)
  const hasManagePermission = Boolean(onTogglePublish && onEdit && onDelete);

  return (
    <li className={`module-item ${isExpanded ? 'expanded' : 'collapsed'} ${module.isPublished ? 'published' : 'unpublished'}`}>
      <div className="module-header">
        <div className="module-title" onClick={onToggleExpand}>
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          <strong>
            {module.title}
            {!module.isPublished && (
              <span className="unpublished-badge" title="This module is not visible to students">
                {' '}(Unpublished)
              </span>
            )}
          </strong>
        </div>

        {/* Only users with permission can see these action buttons */}
        {hasManagePermission && (
          <div className="module-actions">
            {onTogglePublish && (
              <button
                className={`module-action-btn publish-btn ${module.isPublished ? 'published' : 'unpublished'}`}
                onClick={onTogglePublish}
                title={module.isPublished ? "Unpublish Module" : "Publish Module"}
                aria-label={module.isPublished ? "Unpublish Module" : "Publish Module"}
              >
                {module.isPublished ? (
                  <span className="publish-status">
                    <FaEye /> <span className="publish-text">Published</span>
                  </span>
                ) : (
                  <span className="publish-status">
                    <FaEyeSlash /> <span className="publish-text">Unpublished</span>
                  </span>
                )}
              </button>
            )}

            {onEdit && (
              <button
                className="module-action-btn edit-btn"
                onClick={onEdit}
                title="Edit Module"
                aria-label="Edit Module"
              >
                <FaEdit />
              </button>
            )}

            {onDelete && (
              <button
                className="module-action-btn delete-btn"
                onClick={onDelete}
                title="Delete Module"
                aria-label="Delete Module"
              >
                <FaTrash />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Module details, only shown when expanded */}
      {isExpanded && (
        <div className="module-content">
          <div className="module-description">
            {module.description || "No description provided."}
          </div>

          <div className="module-content-items">
            {/* Link to the module content page */}
            <div className="content-management">
              <h4>MODULE CONTENTS</h4>
              <div className="module-content-summary">
                <p>Manage learning materials, resources, and content items for this module.</p>
                <Link
                  to={`/courses/${module.courseId}/modules/${module._id}/contents`}
                  className="view-contents-btn"
                >
                  <FaBookOpen /> View & Manage Contents
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}
