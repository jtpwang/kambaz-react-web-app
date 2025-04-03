import { Button, FormControl, InputGroup, ListGroup, Modal } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilBold } from "react-icons/pi";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { deleteAssignment, setAssignment, setAssignments } from "./reducer";
import * as assignmentsClient from "./client";

function formatDate(isoString: string): string {
  if (!isoString) return "";
  const [year, month, day] = isoString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export default function Assignments({ currentUser }: { currentUser?: any }) {
  const { cid } = useParams(); // Get course ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Check if the user is a faculty member
  const isFaculty = currentUser && currentUser.role === "FACULTY";
  
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<any>(null);
  
  // Fetch assignments for the course
  const fetchAssignments = useCallback(async () => {
    try {
      if (cid) {
        const assignments = await assignmentsClient.findAssignmentsForCourse(cid);
        dispatch(setAssignments(assignments));
      }
    } catch (error) {
      console.error("Failed to fetch assignments:", error);
    }
  }, [cid, dispatch]);

  // Load assignments when component mounts
  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);
  
  const handleAddAssignment = () => {
    if (!isFaculty) return;
    const newAssignment = {
      title: "",
      description: "",
      points: 100,
      course: cid,
      dueDate: new Date().toISOString().split('T')[0],
      availableFrom: new Date().toISOString().split('T')[0],
      availableUntil: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0]
    };
    
    dispatch(setAssignment(newAssignment));
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
  };
  
  const handleEditAssignment = (assignment: any) => {
    if (!isFaculty) return;
    dispatch(setAssignment(assignment));
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`);
  };
  
  const handleDeleteClick = (assignment: any) => {
    if (!isFaculty) return;
    setAssignmentToDelete(assignment);
    setShowDeleteModal(true);
  };
  
  const confirmDelete = async () => {
    if (assignmentToDelete) {
      try {
        await assignmentsClient.deleteAssignment(assignmentToDelete._id);
        dispatch(deleteAssignment(assignmentToDelete._id));
        setShowDeleteModal(false);
        setAssignmentToDelete(null);
      } catch (error) {
        console.error("Failed to delete assignment:", error);
      }
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments" className="pe-5">
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete assignment "{assignmentToDelete?.title}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Search and Action Buttons */}
      <div className="mb-3 d-flex justify-content-between">
        {/* Search Input */}
        <div className="d-flex w-50">
          <InputGroup id="wd-search-assignment">
            <InputGroup.Text>
              <FaMagnifyingGlass />
            </InputGroup.Text>
            <FormControl placeholder="Search for assignments" />
          </InputGroup>
        </div>
        {/* Add Assignment and Group Buttons - shown only to faculty */}
        {isFaculty && (
          <div>
            <Button
              variant="secondary"
              className="me-1"
              id="wd-add-assignment-group"
            >
              <BsPlus className="fs-5" />
              Group
            </Button>
            <Button 
              variant="danger" 
              id="wd-add-assignment"
              onClick={handleAddAssignment}
            >
              <BsPlus className="fs-5" />
              Assignment
            </Button>
          </div>
        )}
      </div>

      {/* Assignments List */}
      <ListGroup className="rounded-0 fs-5">
        {/* Assignments Header */}
        <ListGroup.Item id="wd-assignments-title" className="p-0 border-gray">
          <div className="d-flex align-items-center justify-content-between wd-title p-3 ps-2 bg-secondary">
            <span>
              <BsGripVertical className="fs-3" />
              <MdArrowDropDown className="me-2" />
              ASSIGNMENTS
            </span>
            <div className="d-flex align-items-center">
              <div className="border rounded-4 ps-2 pe-2 border-dark border-1 border-opacity-50">
                <span className="fs-6">40% of total</span>
              </div>
              <BsPlus className="fs-3" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
        </ListGroup.Item>

        {/* Render Assignments Dynamically */}
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroup.Item
              key={assignment._id}
              className="p-3 ps-1 wd-assignment d-flex justify-content-between align-items-center"
            >
              {/* Assignment Details */}
              <div className="wd-assignment-details d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                {isFaculty && (
                  <PiNotePencilBold 
                    className="me-2 fs-3 cursor-pointer" 
                    onClick={() => handleEditAssignment(assignment)}
                  />
                )}
                <div>
                  <div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditAssignment(assignment);
                      }}
                      className="wd-assignment-link text-black text-decoration-none"
                    >
                      {assignment.title}
                    </a>
                  </div>
                  <div className="fs-6">
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong>{" "}
                    {formatDate(assignment.availableFrom)} at 12:00am |
                    <br />
                    <strong>Due</strong> {formatDate(assignment.dueDate)} at 11:59pm
                    | {assignment.points} pts
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success fs-4 me-3" />
                {isFaculty && (
                  <FaTrash 
                    className="text-danger fs-4 cursor-pointer" 
                    onClick={() => handleDeleteClick(assignment)}
                  />
                )}
              </div>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
