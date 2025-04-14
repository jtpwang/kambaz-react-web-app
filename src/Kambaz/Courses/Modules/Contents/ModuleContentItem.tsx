import React from 'react';
import { ModuleContent, ContentType } from '../../../../services/ModuleContentService';
import { AiOutlineFile, AiOutlineFileText, AiOutlineLink, AiOutlineVideoCamera, AiOutlineEdit, AiOutlineDelete, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlinePlayCircle, AiOutlinePicture } from 'react-icons/ai';

interface ModuleContentItemProps {
  content: ModuleContent;
  isFirst: boolean;
  isLast: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

// Get icon based on content type
const getContentIcon = (contentType: ContentType) => {
  switch (contentType) {
    case ContentType.TEXT:
      return <AiOutlineFileText className="content-icon text-icon" />;
    case ContentType.FILE:
      return <AiOutlineFile className="content-icon file-icon" />;
    case ContentType.VIDEO:
      return <AiOutlineVideoCamera className="content-icon video-icon" />;
    case ContentType.LINK:
      return <AiOutlineLink className="content-icon link-icon" />;
    case ContentType.IMAGE:
      return <AiOutlinePicture className="content-icon image-icon" />;
    default:
      return <AiOutlineFile className="content-icon" />;
  }
};

// Render appropriate content preview based on content type
const renderContentPreview = (content: ModuleContent) => {
  switch (content.contentType) {
    case ContentType.TEXT:
      return (
        <div className="text-preview">
          {content.content.length > 300
            ? `${content.content.slice(0, 300)}...`
            : content.content}
        </div>
      );

    case ContentType.LINK:
      return (
        <div className="link-preview">
          <a href={content.content} target="_blank" rel="noopener noreferrer">
            {content.content}
          </a>
        </div>
      );

    case ContentType.FILE:
      return (
        <div className="file-preview">
          <a href={content.content} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </div>
      );

    case ContentType.VIDEO:
      return (
        <div className="video-preview">
          <div className="video-thumbnail">
            <AiOutlinePlayCircle className="play-icon" />
            <span>Video Content</span>
          </div>
        </div>
      );

    case ContentType.IMAGE:
      return (
        <div className="image-preview">
          <img
            src={content.content}
            alt={content.title}
            className="preview-image"
          />
        </div>
      );

    default:
      return <div className="no-preview">No preview available</div>;
  }
};

const ModuleContentItem: React.FC<ModuleContentItemProps> = ({
  content,
  isFirst,
  isLast,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown
}) => {
  return (
    <div className="module-content-item">
      <div className="content-header">
        <div className="content-info">
          {getContentIcon(content.contentType)}
          <h3 className="content-title">{content.title}</h3>
        </div>

        {/* Action buttons - visible only to users with permissions */}
        <div className="content-actions">
          {onMoveUp && !isFirst && (
            <button
              className="action-btn move-up-btn"
              onClick={onMoveUp}
              title="Move Up"
            >
              <AiOutlineArrowUp />
            </button>
          )}

          {onMoveDown && !isLast && (
            <button
              className="action-btn move-down-btn"
              onClick={onMoveDown}
              title="Move Down"
            >
              <AiOutlineArrowDown />
            </button>
          )}

          {onEdit && (
            <button
              className="action-btn edit-btn"
              onClick={onEdit}
              title="Edit"
            >
              <AiOutlineEdit />
            </button>
          )}

          {onDelete && (
            <button
              className="action-btn delete-btn"
              onClick={onDelete}
              title="Delete"
            >
              <AiOutlineDelete />
            </button>
          )}
        </div>
      </div>

      <div className="content-body">
        {renderContentPreview(content)}
      </div>

      <div className="content-footer">
        <span className="content-type">
          {content.contentType.charAt(0).toUpperCase() + content.contentType.slice(1)}
        </span>
        {content.createdAt && (
          <span className="content-created">
            Added: {new Date(content.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default ModuleContentItem;
