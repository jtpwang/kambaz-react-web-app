import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { MdArrowDropDown } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import { PiNotePencilBold } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";

import { assignments } from "../../Database";
import { useParams } from "react-router-dom";

function formatDate(isoString: string): string {
  const [year, month, day] = isoString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
}

export default function Assignments() {
  const { cid } = useParams(); // Get course ID from URL parameters

  return (
    <div id="wd-assignments" className="pe-5">
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
        {/* Add Assignment and Group Buttons */}
        <div>
          <Button
            variant="secondary"
            className="me-1"
            id="wd-add-assignment-group"
          >
            <BsPlus className="fs-5" />
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <BsPlus className="fs-5" />
            Assignment
          </Button>
        </div>
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
          .filter((assignment) => assignment.course === cid) // Filter assignments by course ID
          .map((assignment) => (
            <ListGroup.Item
              key={assignment._id}
              className="p-3 ps-1 wd-assignment d-flex justify-content-between align-items-center"
            >
              {/* Assignment Details */}
              <div className="wd-assignment-details d-flex align-items-center">
                {/* Drag Handle */}
                <BsGripVertical className="me-2 fs-3" />
                {/* Edit Icon */}
                <PiNotePencilBold className="me-2 fs-3" />
                <div>
                  <div>
                    <a
                      href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
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
                    <strong>Due</strong> {formatDate(assignment.due)} at 11:59pm
                    | 100 pts
                  </div>
                </div>
              </div>
              {/* Completion Indicator */}
              <FaCheckCircle className="text-success fs-4" />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}

