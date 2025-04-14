import { Route, Routes, useParams } from "react-router-dom";
import AssignmentList from "./AssignmentList";
import AssignmentDetail from "./AssignmentDetail";
import AssignmentForm from "./AssignmentForm";
import AssignmentSubmit from "./AssignmentSubmit";
import AssignmentSubmissions from "./AssignmentSubmissions";
import "./Assignment.css";
import "./SubmissionStyle.css";

// Create a wrapper component to get route parameters and pass them to AssignmentForm
const AssignmentFormWrapper = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    // Get course ID parameter (may contain additional path parts)
    const { cid } = useParams<{ cid: string }>();
    
    // Try to handle complex path structures, get the real course ID
    let realCourseId = cid;
    
    if (cid && cid.includes('/')) {
        // Split path and get the first part
        const pathParts = cid.split('/');
        // If the first part is not a known subpath name, consider it as the course ID
        if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
        }
        console.log(`AssignmentFormWrapper - Extracting course ID from path '${cid}': '${realCourseId}'`);
    }
    
    return <AssignmentForm cid={realCourseId} assignmentId={assignmentId} />;
};

// Create a wrapper component for the new assignment form
const NewAssignmentFormWrapper = () => {
    // Get course ID parameter (may contain additional path parts)
    const { cid } = useParams<{ cid: string }>();
    
    // Try to handle complex path structures, get the real course ID
    let realCourseId = cid;
    
    if (cid && cid.includes('/')) {
        // Split path and get the first part
        const pathParts = cid.split('/');
        // If the first part is not a known subpath name, consider it as the course ID
        if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
        }
        console.log(`NewAssignmentFormWrapper - Extracting course ID from path '${cid}': '${realCourseId}'`);
    }
    
    return <AssignmentForm cid={realCourseId} />;
};

// Create a wrapper component to get route parameters and pass them to AssignmentSubmit
const AssignmentSubmitWrapper = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    const { cid } = useParams<{ cid: string }>();
    
    // Try to handle complex path structures, get the real course ID
    let realCourseId = cid;
    
    if (cid && cid.includes('/')) {
        const pathParts = cid.split('/');
        if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
        }
        console.log(`AssignmentSubmitWrapper - Extracting course ID from path '${cid}': '${realCourseId}'`);
    }
    
    return <AssignmentSubmit cid={realCourseId} assignmentId={assignmentId} />;
};

// Create a wrapper component to get route parameters and pass them to AssignmentSubmissions
const AssignmentSubmissionsWrapper = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    const { cid } = useParams<{ cid: string }>();
    
    // Try to handle complex path structures, get the real course ID
    let realCourseId = cid;
    
    if (cid && cid.includes('/')) {
        const pathParts = cid.split('/');
        if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
        }
        console.log(`AssignmentSubmissionsWrapper - Extracting course ID from path '${cid}': '${realCourseId}'`);
    }
    
    return <AssignmentSubmissions cid={realCourseId} assignmentId={assignmentId} />;
};

export default function Assignments() {
    // Get course ID parameter (may contain additional path parts)
    const { cid } = useParams<{ cid: string }>();
    
    // Try to handle complex path structures, get the real course ID
    let realCourseId = cid;
    
    if (cid && cid.includes('/')) {
        // Split path and get the first part
        const pathParts = cid.split('/');
        // If the first part is not a known subpath name, consider it as the course ID
        if (!['home', 'modules', 'assignments', 'people'].includes(pathParts[0])) {
            realCourseId = pathParts[0];
        }
        console.log(`Assignments - Extracting course ID from path '${cid}': '${realCourseId}'`);
    }

    if (!realCourseId) {
        return <div className="error">Error: No valid course ID found</div>;
    }

    return (
        <div className="wd-assignments-container">
            <Routes>
                <Route path="/" element={<AssignmentList cid={realCourseId} />} />
                <Route path="/create" element={<NewAssignmentFormWrapper />} />
                <Route path="/:assignmentId" element={<AssignmentDetail />} />
                <Route path="/:assignmentId/edit" element={<AssignmentFormWrapper />} />
                <Route path="/:assignmentId/submit" element={<AssignmentSubmitWrapper />} />
                <Route path="/:assignmentId/submissions" element={<AssignmentSubmissionsWrapper />} />
                {/* Catch all other sub-paths, redirect to assignment list */}
                <Route path="/*" element={<AssignmentList cid={realCourseId} />} />
            </Routes>
        </div>
    );
}
