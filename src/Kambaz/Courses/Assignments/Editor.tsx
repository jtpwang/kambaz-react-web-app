
// import {
//     Button,
//     FormCheck,
//     FormControl,
//     FormGroup,
//     FormLabel,
//     FormSelect,
// } from "react-bootstrap";

// import FormCheckLabel from "react-bootstrap/FormCheckLabel";
// import FormCheckInput from "react-bootstrap/FormCheckInput";
// import { assignments } from "../../Database";

// import { Link, useParams } from "react-router-dom";

// export default function AssignmentEditor() {
//     const { aid, cid } = useParams();
//     const assignment = assignments.find((assignment) => assignment._id === aid);
//     return (
//         <div id="wd-assignments-editor" className="me-3 ms-3">
//             <div className="row mb-3">
//                 <FormGroup>
//                     <FormLabel htmlFor="wd-name">Assignment Name </FormLabel>
//                     <FormControl
//                         id="wd-name"
//                         defaultValue={assignment && assignment.title}
//                     />
//                 </FormGroup>
//             </div>
//             <div className="row mb-3">
//                 <div>
//                     <FormControl as="textarea" id="wd-description">
//                         {assignment && assignment.description}
//                     </FormControl>
//                 </div>
//             </div>
//             <FormGroup controlId="wd-assignment-editor-points" className="row mb-3">
//                 <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
//                     Points
//                 </FormLabel>
//                 <div className="col-8">
//                     <FormControl defaultValue={assignment && assignment.points} />
//                 </div>
//             </FormGroup>
//             <FormGroup className="row mb-3" controlId="wd-group">
//                 <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
//                     Assignment Group
//                 </FormLabel>
//                 <div className="col-8">
//                     <FormSelect>
//                         <option value="1">ASSIGNMENTS</option>
//                         <option value="2">Quizzes</option>
//                         <option value="3">Projects</option>
//                         <option value="4">Exams</option>
//                     </FormSelect>
//                 </div>
//             </FormGroup>
//             <FormGroup className="row mb-3" controlId="wd-display-grade-as">
//                 <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
//                     Display grade as
//                 </FormLabel>
//                 <div className="col-8">
//                     <FormSelect>
//                         <option value="1">Percentage</option>
//                         <option value="2">Complete/Incomplete</option>
//                         <option value="3">Letter Grade</option>
//                     </FormSelect>
//                 </div>
//             </FormGroup>
//             <div className="row mb-3">
//                 <FormLabel
//                     htmlFor="wd-submission-type"
//                     className="col-4 wd-assignment-editor-label col-form-label"
//                 >
//                     Submission Type
//                 </FormLabel>
//                 <div className="col-8">
//                     <div className="border-1 border rounded-2 p-2">
//                         <div className="mb-3">
//                             <FormSelect id="wd-submission-type">
//                                 <option value="1">Online</option>
//                                 <option value="2">In Person</option>
//                                 <option value="3">External Tool</option>
//                             </FormSelect>
//                         </div>
//                         <FormGroup controlId="online-entry-options" className="mb-3">
//                             <FormLabel className="fw-bold mb-1">
//                                 Online Entry Options
//                             </FormLabel>
//                             <FormCheck className="mb-3">
//                                 <FormCheckLabel htmlFor="wd-text-entry">
//                                     Text Entry
//                                 </FormCheckLabel>
//                                 <FormCheckInput
//                                     id="wd-text-entry"
//                                     name="online-entry-options"
//                                 />
//                             </FormCheck>
//                             <FormCheck className="mb-3">
//                                 <FormCheckLabel htmlFor="wd-website-url">
//                                     Website URL
//                                 </FormCheckLabel>
//                                 <FormCheckInput
//                                     id="wd-website-url"
//                                     name="online-entry-options"
//                                 />
//                             </FormCheck>
//                             <FormCheck className="mb-3">
//                                 <FormCheckLabel htmlFor="wd-media-recordings">
//                                     Media Recordings
//                                 </FormCheckLabel>
//                                 <FormCheckInput
//                                     id="wd-media-recordings"
//                                     name="online-entry-options"
//                                 />
//                             </FormCheck>
//                             <FormCheck className="mb-3">
//                                 <FormCheckLabel htmlFor="wd-student-annotation">
//                                     Student Annotation
//                                 </FormCheckLabel>
//                                 <FormCheckInput
//                                     id="wd-student-annotation"
//                                     name="online-entry-options"
//                                 />
//                             </FormCheck>
//                             <FormCheck className="mb-3">
//                                 <FormCheckLabel htmlFor="wd-file-upload">
//                                     File Uploads
//                                 </FormCheckLabel>
//                                 <FormCheckInput
//                                     id="wd-file-upload"
//                                     name="online-entry-options"
//                                 />
//                             </FormCheck>
//                         </FormGroup>
//                     </div>
//                 </div>
//             </div>
//             <div className="row mb-4">
//                 <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
//                     Assign
//                 </FormLabel>
//                 <div className="col-8">
//                     <div className="border border-1 rounded-2 p-2">
//                         <FormGroup controlId="wd-assign-to" className="mb-3">
//                             <FormLabel className="fw-bold mb-1">Assign To</FormLabel>
//                             <FormControl defaultValue="Everyone" />
//                         </FormGroup>
//                         <FormGroup controlId="wd-due-date" className="mb-3">
//                             <FormLabel className="fw-bold mb-1">Due</FormLabel>
//                             <FormControl
//                                 type="date"
//                                 defaultValue={assignment && assignment.due}
//                             />
//                         </FormGroup>
//                         <div className="row">
//                             <div className="col-6">
//                                 <FormGroup controlId="wd-available-from">
//                                     <FormLabel className="fw-bold mb-1">Available From</FormLabel>
//                                     <FormControl
//                                         type="date"
//                                         defaultValue={assignment && assignment.availableFrom}
//                                     />
//                                 </FormGroup>
//                             </div>
//                             <div className="col-6">
//                                 <FormGroup controlId="wd-available-until">
//                                     <FormLabel className="fw-bold mb-1">
//                                         Available Until
//                                     </FormLabel>
//                                     <FormControl
//                                         type="date"
//                                         defaultValue={assignment && assignment.availableUntil}
//                                     />
//                                 </FormGroup>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="float-end mb-3">
//                 <div className="d-flex">
//                     <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
//                         <Button variant="secondary" className="me-1">
//                             Cancel
//                         </Button>
//                     </Link>
//                     <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
//                         <Button variant="danger">Save</Button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }

import {
    Button,
    FormCheck,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
} from "react-bootstrap";

import FormCheckLabel from "react-bootstrap/FormCheckLabel";
import FormCheckInput from "react-bootstrap/FormCheckInput";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
    const { aid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { assignment: storeAssignment, assignments } = useSelector((state: any) => state.assignmentsReducer);
    
    const existingAssignment = aid && aid !== "new" ? 
        assignments.find((a: any) => a._id === aid) : null;
    
    const [assignment, setAssignment] = useState<any>(
        storeAssignment || 
        existingAssignment || 
        {
            title: "",
            description: "",
            points: 100,
            course: cid,
            dueDate: new Date().toISOString().split('T')[0],
            availableFrom: new Date().toISOString().split('T')[0],
            availableUntil: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0]
        }
    );
    
    useEffect(() => {
        if (storeAssignment) {
            setAssignment(storeAssignment);
        } else if (existingAssignment) {
            setAssignment(existingAssignment);
        }
    }, [storeAssignment, existingAssignment]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setAssignment({ ...assignment, [id.replace('wd-', '')]: value });
    };
    

    const handleSave = () => {
        if (!assignment.title || !assignment.description) {
            alert("請填寫標題和描述");
            return;
        }
        
        if (aid === "new") {
            dispatch(addAssignment({
                ...assignment,
                course: cid
            }));
        } else {
            dispatch(updateAssignment(assignment));
        }
        
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };
    
    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
    };
    
    return (
        <div id="wd-assignments-editor" className="me-3 ms-3">
            <div className="row mb-3">
                <FormGroup>
                    <FormLabel htmlFor="wd-title">Assignment Name </FormLabel>
                    <FormControl
                        id="wd-title"
                        value={assignment.title || ""}
                        onChange={handleChange}
                    />
                </FormGroup>
            </div>
            <div className="row mb-3">
                <div>
                    <FormLabel htmlFor="wd-description">Description</FormLabel>
                    <FormControl 
                        as="textarea" 
                        id="wd-description"
                        value={assignment.description || ""}
                        onChange={handleChange}
                        rows={5}
                    />
                </div>
            </div>
            <FormGroup controlId="wd-points" className="row mb-3">
                <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
                    Points
                </FormLabel>
                <div className="col-8">
                    <FormControl 
                        value={assignment.points || 100}
                        onChange={handleChange}
                        type="number"
                    />
                </div>
            </FormGroup>
            <FormGroup className="row mb-3" controlId="wd-group">
                <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
                    Assignment Group
                </FormLabel>
                <div className="col-8">
                    <FormSelect>
                        <option value="1">ASSIGNMENTS</option>
                        <option value="2">Quizzes</option>
                        <option value="3">Projects</option>
                        <option value="4">Exams</option>
                    </FormSelect>
                </div>
            </FormGroup>
            <FormGroup className="row mb-3" controlId="wd-display-grade-as">
                <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
                    Display grade as
                </FormLabel>
                <div className="col-8">
                    <FormSelect>
                        <option value="1">Percentage</option>
                        <option value="2">Complete/Incomplete</option>
                        <option value="3">Letter Grade</option>
                    </FormSelect>
                </div>
            </FormGroup>
            <div className="row mb-3">
                <FormLabel
                    htmlFor="wd-submission-type"
                    className="col-4 wd-assignment-editor-label col-form-label"
                >
                    Submission Type
                </FormLabel>
                <div className="col-8">
                    <div className="border-1 border rounded-2 p-2">
                        <div className="mb-3">
                            <FormSelect id="wd-submission-type">
                                <option value="1">Online</option>
                                <option value="2">In Person</option>
                                <option value="3">External Tool</option>
                            </FormSelect>
                        </div>
                        <FormGroup controlId="online-entry-options" className="mb-3">
                            <FormLabel className="fw-bold mb-1">
                                Online Entry Options
                            </FormLabel>
                            <FormCheck className="mb-3">
                                <FormCheckLabel htmlFor="wd-text-entry">
                                    Text Entry
                                </FormCheckLabel>
                                <FormCheckInput
                                    id="wd-text-entry"
                                    name="online-entry-options"
                                />
                            </FormCheck>
                            <FormCheck className="mb-3">
                                <FormCheckLabel htmlFor="wd-website-url">
                                    Website URL
                                </FormCheckLabel>
                                <FormCheckInput
                                    id="wd-website-url"
                                    name="online-entry-options"
                                />
                            </FormCheck>
                            <FormCheck className="mb-3">
                                <FormCheckLabel htmlFor="wd-media-recordings">
                                    Media Recordings
                                </FormCheckLabel>
                                <FormCheckInput
                                    id="wd-media-recordings"
                                    name="online-entry-options"
                                />
                            </FormCheck>
                            <FormCheck className="mb-3">
                                <FormCheckLabel htmlFor="wd-student-annotation">
                                    Student Annotation
                                </FormCheckLabel>
                                <FormCheckInput
                                    id="wd-student-annotation"
                                    name="online-entry-options"
                                />
                            </FormCheck>
                            <FormCheck className="mb-3">
                                <FormCheckLabel htmlFor="wd-file-upload">
                                    File Uploads
                                </FormCheckLabel>
                                <FormCheckInput
                                    id="wd-file-upload"
                                    name="online-entry-options"
                                />
                            </FormCheck>
                        </FormGroup>
                    </div>
                </div>
            </div>
            <div className="row mb-4">
                <FormLabel className="wd-assignment-editor-label col-4 col-form-label">
                    Assign
                </FormLabel>
                <div className="col-8">
                    <div className="border border-1 rounded-2 p-2">
                        <FormGroup controlId="wd-assign-to" className="mb-3">
                            <FormLabel className="fw-bold mb-1">Assign To</FormLabel>
                            <FormControl defaultValue="Everyone" />
                        </FormGroup>
                        <FormGroup controlId="wd-dueDate" className="mb-3">
                            <FormLabel className="fw-bold mb-1">Due</FormLabel>
                            <FormControl
                                type="date"
                                value={assignment.dueDate || ""}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <div className="row">
                            <div className="col-6">
                                <FormGroup controlId="wd-availableFrom">
                                    <FormLabel className="fw-bold mb-1">Available From</FormLabel>
                                    <FormControl
                                        type="date"
                                        value={assignment.availableFrom || ""}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>
                            <div className="col-6">
                                <FormGroup controlId="wd-availableUntil">
                                    <FormLabel className="fw-bold mb-1">
                                        Available Until
                                    </FormLabel>
                                    <FormControl
                                        type="date"
                                        value={assignment.availableUntil || ""}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="float-end mb-3">
                <div className="d-flex">
                    <Button 
                        variant="secondary" 
                        className="me-1"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
}