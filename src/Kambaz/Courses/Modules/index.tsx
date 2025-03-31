// import React, { useState } from "react";
// import ModelControls from "./ModelControls";
// import { ListGroup } from "react-bootstrap";
// import { BsGripVertical } from "react-icons/bs";
// import ModuleControlButtons from "./ModuleControlButtons.tsx";
// import LessonControlButtons from "./LessonControlButtons.tsx";

// import * as db from "../../Database";
// import { useParams } from "react-router-dom";

// export default function Modules() {
//   const { cid } = useParams();
//   const [modules, setModules] = useState<any[]>(db.modules);
//   return (
//     <div className="me-3">
//       <ModelControls />
//       <br />
//       <br />
//       <br />
//       <br />
//       <ListGroup id="wd-modules" className="rounded-0">
//         {modules
//           .filter((module: any) => module.course === cid)
//           .map((module: any) => (
//             <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//               <div className="wd-title p-3 ps-2 bg-secondary">
//                 <BsGripVertical className="me-2 fs-3" />
//                 {module.name}
//                 <ModuleControlButtons />
//               </div>
//               {module.lessons && (
//                 <ListGroup className="wd-lessons rounded-0">
//                   {module.lessons.map((lesson: any) => (
//                     <ListGroup.Item className="wd-lesson p-3 ps-1">
//                       <BsGripVertical className="me-2 fs-3" />
//                       {lesson.name}
//                       <LessonControlButtons />
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           ))}
//       </ListGroup>
//     </div>
//   );
// }


import { useState } from "react";
import ModulesControls from "./ModulesControls.tsx";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, editModule } from "./reducer.ts";
import { FaCheck } from "react-icons/fa6";

import { useParams } from "react-router-dom";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-modules-container w-100 pe-3">
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      
      <div id="wd-modules">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <div key={module._id} className="mb-3">
              <div className="wd-module-header bg-secondary p-2 d-flex align-items-center">
                <BsGripVertical className="me-2 text-dark fs-4" />
                {!module.editing && <span className="fs-5">{module.name}</span>}
                {module.editing && (
                  <input
                    className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
                <div className="ms-auto d-flex align-items-center">
                  <FaCheck className="text-success me-3" />
                  <ModuleControlButtons 
                    moduleId={module._id}
                    deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                </div>
              </div>
              {module.lessons && module.lessons.length > 0 && (
                <div className="wd-lessons border border-top-0">
                  {module.lessons.map((lesson: any) => (
                    <div key={lesson._id} className="wd-lesson p-2 d-flex align-items-center border-bottom">
                      <div className="ms-4 d-flex align-items-center">
                        <BsGripVertical className="me-2 text-muted fs-5" />
                        <span>{lesson.name}</span>
                      </div>
                      <div className="ms-auto d-flex align-items-center">
                        <FaCheck className="text-success me-3" />
                        <LessonControlButtons />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}