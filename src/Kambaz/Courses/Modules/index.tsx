import { Routes, Route, useParams } from 'react-router-dom';
import ModuleList from './ModuleList';
import ModuleContents from './Contents';
import './Module.css';

export default function Modules() {
    const { cid } = useParams<{ cid: string }>();

    if (!cid) {
        return <div className="error">Error: Course ID is missing.</div>;
    }

    // Shared component for the module list, ensuring consistent display
    const ModuleListComponent = () => (
        <>
            <h2>Course Modules</h2>
            <p>Manage and view all modules in this course</p>
            <ModuleList />
        </>
    );

    return (
        <div className="wd-modules-container">
            <Routes>
                {/* Default route */}
                <Route path="/" element={<ModuleListComponent />} />

                {/* Handle both /home and /home/home paths */}
                <Route path="/home" element={<ModuleListComponent />} />
                <Route path="/home/home" element={<ModuleListComponent />} />

                {/* Route for viewing module contents */}
                <Route path="/:moduleId/contents/*" element={<ModuleContents />} />

                {/* Catch-all for any other subpaths to show the module list */}
                <Route path="/*" element={<ModuleListComponent />} />
            </Routes>
        </div>
    );
}
