import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Assignment, getAllAssignments, deleteAssignment, toggleAssignmentPublished } from '../../../services/AssignmentService';
import { User } from '../../../contexts/UserContext';
import './Assignment.css';
import { useUser } from '../../../contexts/useUser';
import { Module, getAllModules } from '../../../services/ModuleService';

// Check if the user has permission to edit assignments (ADMIN or FACULTY roles)
const hasEditPermission = (user: User | null) => {
  return user && (user.role === 'ADMIN' || user.role === 'FACULTY');
};

export default function AssignmentList({ cid }: { cid: string }) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { currentUser } = useUser();
  const [modules, setModules] = useState<Record<string, Module>>({});

  console.log("AssignmentList - courseId:", cid);
  console.log("AssignmentList - currentUser:", currentUser);

  // Fetch assignment list
  useEffect(() => {
    if (!cid) {
      console.error("AssignmentList - Missing course ID");
      setError("Missing course ID");
      setLoading(false);
      return;
    }

    console.log("AssignmentList - Fetching assignments for course ID:", cid);

    const fetchAssignments = async () => {
      setLoading(true);
      try {
        console.log("AssignmentList - Calling API to fetch assignments");
        const response = await getAllAssignments(cid);
        console.log("AssignmentList - API Response:", response);

        if (response && response.data && response.data.assignments) {
          // Sort assignments based on available date
          const sortedAssignments = [...response.data.assignments].sort(
            (a, b) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()
          );
          console.log("AssignmentList - Sorted assignments:", sortedAssignments);
          setAssignments(sortedAssignments);
          setFilteredAssignments(sortedAssignments);
        } else {
          console.error("AssignmentList - Invalid response format:", response);
          setError('Invalid response format from server');
        }
      } catch (err) {
        console.error('AssignmentList - Error fetching assignments:', err);
        setError('An error occurred while fetching assignments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [cid]);

  // Fetch module information
  useEffect(() => {
    if (!cid) return;

    const fetchModules = async () => {
      try {
        console.log("AssignmentList - Fetching modules for course ID:", cid);
        const response = await getAllModules(cid);

        if (response && response.data && response.data.modules) {
          // Create a mapping from module ID to module object
          const modulesMap: Record<string, Module> = {};
          response.data.modules.forEach(module => {
            modulesMap[module._id] = module;
          });

          console.log("AssignmentList - Modules map created:", modulesMap);
          setModules(modulesMap);
        }
      } catch (err) {
        console.error('AssignmentList - Error fetching modules:', err);
        // Don't set error state here as modules aren't a critical feature
      }
    };

    fetchModules();
  }, [cid]);

  // Filter assignments
  useEffect(() => {
    if (searchTerm.trim() === '') {
      console.log("AssignmentList - No search term, using all assignments");
      setFilteredAssignments(assignments);
    } else {
      console.log("AssignmentList - Filtering assignments by search term:", searchTerm);
      const filtered = assignments.filter(assignment =>
        assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("AssignmentList - Filtered assignments:", filtered);
      setFilteredAssignments(filtered);
    }
  }, [searchTerm, assignments]);

  // Handle changes in search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("AssignmentList - Search term changed:", e.target.value);
    setSearchTerm(e.target.value);
  };

  // Handle assignment deletion
  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!cid) {
      console.error("AssignmentList - Missing course ID");
      setError("Missing course ID. Unable to delete assignment.");
      return;
    }

    // Find the assignment to delete (used in confirmation prompt)
    const assignmentToDelete = assignments.find(a => a._id === assignmentId);
    if (!assignmentToDelete) {
      console.error("AssignmentList - Cannot find assignment to delete:", assignmentId);
      setError("Cannot find assignment");
      return;
    }

    // Show a confirmation message with the assignment title
    if (window.confirm(`Are you sure you want to delete the assignment "${assignmentToDelete.title}"? This action cannot be undone.`)) {
      console.log(`AssignmentList - Starting deletion of assignment: ${assignmentId}, Title: ${assignmentToDelete.title}`);
      try {
        // update UI
        setAssignments(prev => prev.filter(a => a._id !== assignmentId));
        setFilteredAssignments(prev => prev.filter(a => a._id !== assignmentId));
        setError(null);

        // Call API to delete assignment
        await deleteAssignment(cid, assignmentId);
        console.log(`AssignmentList - Assignment deleted: ${assignmentId}`);
      } catch (err) {
        console.error('AssignmentList - Failed to delete assignment:', err);

        // If error occurs, refresh original assignment list
        const fetchAssignments = async () => {
          try {
            const response = await getAllAssignments(cid);
            if (response && response.data && response.data.assignments) {
              const sortedAssignments = [...response.data.assignments].sort(
                (a, b) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()
              );
              setAssignments(sortedAssignments);
              setFilteredAssignments(sortedAssignments);
            }
          } catch (refreshErr) {
            console.error("An error occurred while reloading the assignment list:", refreshErr);
          }
        };

        fetchAssignments();
        setError(err instanceof Error ? err.message : 'Failed to delete assignment. Please try again later.');
      }
    }
  };

  // Toggle assignment publish status
  const handleTogglePublish = async (assignmentId: string, currentStatus: boolean) => {
    if (!cid) {
      console.error("AssignmentList - Missing course ID");
      setError("Missing course ID. Unable to change publish status.");
      return;
    }

    // Find the assignment to update
    const assignmentToUpdate = assignments.find(a => a._id === assignmentId);
    if (!assignmentToUpdate) {
      console.error("AssignmentList - Cannot find assignment to update:", assignmentId);
      setError("Unable to find the specified assignment.");
      return;
    }

    const newStatus = !currentStatus;
    const actionText = newStatus ? "Publish" : "Unpublish";

    console.log(`AssignmentList - Preparing to ${actionText} assignment: ${assignmentId}, Title: ${assignmentToUpdate.title}`);

    try {
      // update the UI
      setAssignments(prev =>
        prev.map(a => a._id === assignmentId ? { ...a, isPublished: newStatus } : a)
      );

      setFilteredAssignments(prev =>
        prev.map(a => a._id === assignmentId ? { ...a, isPublished: newStatus } : a)
      );

      setError(null);

      // Call API to update backend status
      console.log(`AssignmentList - ${actionText}ing assignment, ID: ${assignmentId}, New status: ${newStatus}`);
      const updatedAssignment = await toggleAssignmentPublished(cid, assignmentId, newStatus);

      // Verify the publish status from the API response
      console.log('AssignmentList - Received assignment update response:', updatedAssignment);

      // Update the UI with the actual status returned by the backend (to ensure frontend-backend consistency)
      if (updatedAssignment && typeof updatedAssignment.isPublished === 'boolean') {
        const serverStatus = updatedAssignment.isPublished;

        // Check if the status matches the expected status
        if (serverStatus !== newStatus) {
          console.warn(`AssignmentList - Warning: Server returned status (${serverStatus}) that differs from expected (${newStatus})`);

          // Update to the actual status returned by the server
          setAssignments(prev =>
            prev.map(a => a._id === assignmentId ? { ...a, isPublished: serverStatus } : a)
          );

          setFilteredAssignments(prev =>
            prev.map(a => a._id === assignmentId ? { ...a, isPublished: serverStatus } : a)
          );
        }
      }
    } catch (err) {
      console.error(`AssignmentList - Error occurred while trying to ${actionText} assignment:`, err);

      // Revert to the original status      
      setAssignments(prev =>
        prev.map(a => a._id === assignmentId ? { ...a, isPublished: currentStatus } : a)
      );

      setFilteredAssignments(prev =>
        prev.map(a => a._id === assignmentId ? { ...a, isPublished: currentStatus } : a)
      );

      // Set error message
      setError(err instanceof Error ? err.message : `${actionText} assignment failed. Please try again later.`);
    }
  };

  // format date 
  const formatAssignmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get the list of module names
  const getModuleNames = (assignment: Assignment) => {
    if (!assignment.moduleIds || assignment.moduleIds.length === 0) {
      return '';
    }

    const moduleNames = assignment.moduleIds
      .map(id => modules[id]?.title || "Unknown Module")
      .filter(name => name);

    if (moduleNames.length === 0) {
      return '';
    }

    return moduleNames.join(', ');
  };

  if (loading && assignments.length === 0) {
    console.log("AssignmentList - Still loading");
    return <div className="loading">Loading assignments...</div>;
  }

  if (error && assignments.length === 0) {
    console.log("AssignmentList - Error occurred:", error);
    return <div className="error">{error}</div>;
  }

  return (
    <div className="wd-assignments">
      {/* Search bar and buttons */}
      <div className="wd-search-bar">
        <input
          className="wd-search-assignments"
          placeholder="Search for Assignments"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Only users with permission can see the add assignment buttons */}
        {hasEditPermission(currentUser) && (
          <>
            <button className="wd-add-assignment-group">+ Group</button>
            <Link
              to={`/Kambaz/Courses/${cid}/Assignments/create`}
              className="wd-add-assignment"
            >
              + Assignment
            </Link>
          </>
        )}
      </div>

      {/* Assignment Title */}
      <h3 className="wd-assignments-title">
        ASSIGNMENTS {filteredAssignments.length > 0 && `(${filteredAssignments.length})`}
      </h3>

      {/* Assignment List */}
      {filteredAssignments.length === 0 ? (
        console.log("AssignmentList - No assignments found"),
        <div className="no-assignments">No assignments available for this course yet.</div>
      ) : (
        <ul className="wd-assignment-list">
          {filteredAssignments.map(assignment => (
            <li key={assignment._id} className="wd-assignment-list-item">
              <div className="assignment-header">
                <Link
                  to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link"
                >
                  {assignment.title}
                  {!assignment.isPublished && <span className="unpublished-badge"> (Unpublished)</span>}
                </Link>

                {/* Management Buttons */}
                {hasEditPermission(currentUser) && (
                  <div className="assignment-actions">
                    <button
                      onClick={() => handleTogglePublish(assignment._id, assignment.isPublished)}
                      className="publish-btn"
                      title={assignment.isPublished ? "Unpublish Assignment" : "Publish Assignment"}
                    >
                      {assignment.isPublished ? "Unpublish" : "Publish"}
                    </button>
                    <Link
                      to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}/edit`}
                      className="edit-btn"
                      title="Edit Assignment"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteAssignment(assignment._id)}
                      className="delete-btn"
                      title="Delete Assignment"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <div className="assignment-info">
                <span>
                  {getModuleNames(assignment)
                    ? `${getModuleNames(assignment)} | `
                    : ''
                  }
                  <strong>
                    {new Date(assignment.availableDate) > new Date()
                      ? `Not available until ${formatAssignmentDate(assignment.availableDate)}`
                      : `Available since ${formatAssignmentDate(assignment.availableDate)}`
                    }
                  </strong>
                </span>
                <br />
                <span>Due {formatAssignmentDate(assignment.dueDate)} | {assignment.points} pts</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* error msg */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
