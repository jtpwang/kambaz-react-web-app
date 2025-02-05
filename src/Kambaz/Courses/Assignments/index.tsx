import { FaPlus } from "react-icons/fa6";

import { BsGripVertical } from "react-icons/bs";
import { PiNotePencilBold } from "react-icons/pi";
import { SlOptionsVertical } from "react-icons/sl";
import { FaSearch } from "react-icons/fa";

import AssignmentControlButtons from "./AssignmentControl";
import { Button, ListGroup, InputGroup, FormControl } from "react-bootstrap";

import { Link } from "react-router-dom";

export default function Assignments() {
    return (
        <div id="wd-assignments">
            {/* Search and Buttons */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Search Box (Left-aligned) */}
                <InputGroup className="w-25">
                    <InputGroup.Text className="bg-white">
                        <FaSearch />
                    </InputGroup.Text>
                    <FormControl
                        type="text"
                        placeholder="Search for Assignment"
                        className="border-start-0"
                        id="wd-search-assignment"
                    />
                </InputGroup>

                {/* Buttons (Right-aligned) */}
                <div>
                    <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Group
                    </Button>
                    <Button variant="danger" size="lg" id="wd-add-assignment">
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                        Assignment
                    </Button>
                </div>
            </div>

            {/* Assignments List */}
            <ListGroup className="rounded-0 mt-2" id="wd-modules">
                <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray bg-light">
                    {/* Header - "Assignments" */}
                    <div className="wd-title p-3 ps-2 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-3" />
                            <strong className="fs-5">ASSIGNMENTS</strong>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="badge rounded-pill bg-white text-dark px-3 py-2">
                                40% of Total
                            </span>
                            <FaPlus className="fs-5 ms-3" />
                            <SlOptionsVertical className="fs-5 ms-3" />
                        </div>
                    </div>

                    {/* Assignment Items */}
                    <ListGroup className="wd-lessons rounded-0">
                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <AssignmentControlButtons />
                            <BsGripVertical className="me-2 fs-3" />
                            <PiNotePencilBold className="me-2 fs-3" />
                            <Link to="123/" className="wd-assignment-link text-black text-decoration-none">

                                <b>A1</b>
                            </Link>
                            <br />
                            <span className="wd-assignment-info d-block mt-1 ps-5">
                                <span className="text-danger">Multiple Modules</span>  | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                            </span>
                        </ListGroup.Item>

                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <AssignmentControlButtons />
                            <BsGripVertical className="me-2 fs-3" />
                            <PiNotePencilBold className="me-2 fs-3" />
                            <Link to="124/" className="wd-assignment-link text-black text-decoration-none">
                                <b>A2</b>
                            </Link>
                            <br />
                            <span className="wd-assignment-info d-block mt-1 ps-5">
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                            </span>
                        </ListGroup.Item>


                        <ListGroup.Item className="wd-lesson p-3 ps-1">
                            <AssignmentControlButtons />
                            <BsGripVertical className="me-2 fs-3" />
                            <PiNotePencilBold className="me-2 fs-3" />
                            <Link to="125/" className="wd-assignment-link text-black text-decoration-none">
                                <b>A3</b>
                            </Link>
                            <br />
                            <span className="wd-assignment-info d-block mt-1 ps-5">
                                <span className="text-danger">Multiple Modules</span>  | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                            </span>
                        </ListGroup.Item>
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
}
