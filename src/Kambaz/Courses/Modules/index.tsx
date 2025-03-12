import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addModule, editModule, updateModule, deleteModule } from "./reducer.ts";
import ModulesControls from "./ModelControls.tsx";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  
  // Get modules state from Redux store
  const modules = useSelector((state: any) => state.modulesReducer);

  // Local state for new module name
  const [moduleName, setModuleName] = useState("");

  // Function to add a new module using Redux
  const handleAddModule = () => {
    if (!moduleName.trim()) return;
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName(""); // Reset module name after adding
  };

  return (
    <div className="me-3">
      {/* Pass handlers to ModulesControls */}
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={handleAddModule} 
      />

      <br /><br /><br /><br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />

                {/* If editing, show input field; otherwise, show name */}
                {!module.editing ? (
                  <span>{module.name}</span>
                ) : (
                  <input
                    className="form-control w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                )}

                {/* Pass delete & edit functions to control buttons */}
                <ModuleControlButtons 
                  moduleId={module._id} 
                  deleteModule={() => dispatch(deleteModule(module._id))} 
                  editModule={() => dispatch(editModule(module._id))}
                />
              </div>

              {module.lessons.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroup.Item key={lesson._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                      <LessonControlButtons />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}


