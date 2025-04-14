import { Routes, Route, useParams } from 'react-router-dom';
import ModuleContentList from './ModuleContentList';

export default function ModuleContents() {
  const { courseId, moduleId } = useParams<{ courseId: string, moduleId: string }>();
  
  if (!courseId || !moduleId) {
    return <div className="error">Error: Course ID or Module ID is missing.</div>;
  }
  
  return (
    <div className="module-contents-container">
      <Routes>
        <Route path="/" element={<ModuleContentList />} />
      </Routes>
    </div>
  );
}
