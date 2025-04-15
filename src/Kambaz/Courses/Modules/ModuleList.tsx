import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Module, getAllModules, toggleModulePublished, deleteModule } from '../../../services/ModuleService';
import ModuleForm from './ModuleForm';
import ModuleItem from './ModuleItem';
import { User } from '../../../contexts/UserContext';
import { useUser } from '../../../contexts/useUser';
import './Module.css';

// Check ADMIN or FACULTY 
const hasEditPermission = (user: User | null) => {
  return user && (user.role === 'ADMIN' || user.role === 'FACULTY');
};

export default function ModuleList() {
  const { cid } = useParams<{ cid: string }>();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const { currentUser } = useUser();

  console.log("ModuleList - courseId:", cid);
  console.log("ModuleList - currentUser:", currentUser);

  // Get the module list (using useCallback memoization function)
  const fetchModules = useCallback(async () => {
    if (!cid) {
      console.error("ModuleList - Missing course ID");
      setError("Missing course ID");
      setLoading(false);
      return;
    }

    console.log("ModuleList - Fetching modules for course ID:", cid);
    setLoading(true);
    try {
      const response = await getAllModules(cid);
      console.log("ModuleList - API Response:", response);


      // Check module data directly
      if (response && response.data && response.data.modules) {
        // Sort modules by order attribute
        const sortedModules = [...response.data.modules].sort((a, b) => a.order - b.order);
        console.log("ModuleList - Sorted modules:", sortedModules);
        setModules(sortedModules);
      } else {
        console.error("ModuleList - Invalid response format:", response);
        setError('Invalid response format from server');
      }
    } catch (err) {
      console.error('ModuleList - Error fetching modules:', err);
      setError('An error occurred while fetching modules. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [cid]);

  useEffect(() => {
    console.log("ModuleList - useEffect triggered");
    // Get module
    fetchModules();
  }, [fetchModules]);

  // Switch the module's expanded/collapsed state
  const toggleModuleExpand = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  // Collapse all modules
  const collapseAll = () => {
    setExpandedModules(new Set());
  };

  // Expand all modules
  const expandAll = () => {
    const allModuleIds = modules.map(module => module._id);
    setExpandedModules(new Set(allModuleIds));
  };

  // Handle module release status switching
  const handleTogglePublish = async (moduleId: string, currentStatus: boolean) => {
    if (!cid) return;

    // Find the module to update
    const moduleToUpdate = modules.find(m => m._id === moduleId);
    if (!moduleToUpdate) {
      console.error('ModuleList - Cannot find module to toggle publish status:', moduleId);
      return;
    }


    // Update the status  on the UI first to make the user feel a faster response
    setModules(prev =>
      prev.map(module => {
        if (module._id === moduleId) {
          return { ...module, isPublished: !currentStatus };
        }
        return module;
      })
    );

    try {

      // Call API to update backend status
      console.log(`Currently ${!currentStatus ? 'publishing' : 'unpublishing'} module ${moduleToUpdate.title}`);
      const updatedModule = await toggleModulePublished(moduleId, !currentStatus);

      // Confirm the publishing status in the API response
      console.log('Received module update response:', updatedModule);

      // Update the UI using the actual status returned by the backend (to prevent inconsistency between the front and back ends)
      setModules(prev =>
        prev.map(module => {
          if (module._id === moduleId) {
            return { ...module, isPublished: updatedModule.isPublished };
          }
          return module;
        })
      );


      // Prompt the user that the operation was successful
      setError(null);
    } catch (err) {
      console.error('ModuleList - Error toggling module published status:', err);

      // Restore to original state
      setModules(prev =>
        prev.map(module => {
          if (module._id === moduleId) {
            return { ...module, isPublished: currentStatus };
          }
          return module;
        })
      );

      //Display error message
      setError(err instanceof Error ? err.message : 'Failed to update module status. Please try again later.');

    }
  };

  // Delete the module
  const handleDeleteModule = async (moduleId: string) => {
    if (!cid) return;

    if (window.confirm('Are you sure you want to delete this module?')) {
      try {
        await deleteModule(moduleId);


        // Remove the deleted module from the list
        setModules(prev => prev.filter(module => module._id !== moduleId));
      } catch (err) {
        console.error('ModuleList - Error deleting module:', err);
        setError('Failed to delete module. Please try again.');
      }
    }
  };


  // Handle module updates
  const handleModuleUpdated = async (updatedModule: Module) => {

    // Update the modules in the list
    setModules(prev =>
      prev.map(module => module._id === updatedModule._id ? updatedModule : module)
    );

    // Close the edit form
    setEditingModuleId(null);
  };

  // Callback after adding module
  const handleModuleAdded = (newModule: Module) => {
    setModules(prev => [...prev, newModule].sort((a, b) => a.order - b.order));
    setShowAddForm(false);
  };

  // Cancel adding or editing
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingModuleId(null);
  };

  if (loading && modules.length === 0) {
    return <div className="loading">Loading modules...</div>;
  }

  if (error && modules.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wd-modules">
      <div className="wd-modules-buttons">
        <button
          className="wd-collapse-all"
          onClick={collapseAll}
        >
          Collapse All
        </button>
        <button
          className="wd-expand-all"
          onClick={expandAll}
        >
          Expand All
        </button>

        {hasEditPermission(currentUser) && (
          <button
            className="wd-add-module"
            onClick={() => setShowAddForm(true)}
          >
            + Module
          </button>
        )}
      </div>

      <hr />

      {showAddForm && cid && (
        <ModuleForm
          courseId={cid}
          onSuccess={handleModuleAdded}
          onCancel={handleCancel}
        />
      )}

      {modules.length === 0 ? (
        <div className="no-modules">No modules available for this course yet.</div>
      ) : (
        <div className="wd-modules-content">
          <ul className="modules-list">
            {modules.map(module => (
              <ModuleItem
                key={module._id}
                module={module}
                isExpanded={expandedModules.has(module._id)}
                onToggleExpand={() => toggleModuleExpand(module._id)}
                onTogglePublish={hasEditPermission(currentUser) ? () => handleTogglePublish(module._id, module.isPublished) : undefined}
                onEdit={hasEditPermission(currentUser) ? () => setEditingModuleId(module._id) : undefined}
                onDelete={hasEditPermission(currentUser) ? () => handleDeleteModule(module._id) : undefined}
              />
            ))}
          </ul>
        </div>
      )}

      {editingModuleId && cid && (
        <div className="module-edit-overlay">
          <div className="module-edit-form">
            <ModuleForm
              courseId={cid}
              moduleId={editingModuleId}
              onSuccess={handleModuleUpdated}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
