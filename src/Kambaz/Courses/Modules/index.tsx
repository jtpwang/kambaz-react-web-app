import { useState, useEffect, useCallback } from "react";
import ModulesControls from "./ModulesControls.tsx";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons.tsx";
import LessonControlButtons from "./LessonControlButtons.tsx";
import { useSelector, useDispatch } from "react-redux";
import { addModule, deleteModule, updateModule, editModule, setModules } from "./reducer.ts";
import { FaCheck } from "react-icons/fa6";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
import { useParams } from "react-router-dom";

export default function Modules({ currentUser }: { currentUser?: any }) {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const reduxCurrentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const dispatch = useDispatch();

  const fetchModules = useCallback(async () => {
    try {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("failed to fetch modules:", error);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const createModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    
    try {
      const newModule = { name: moduleName, course: cid };
      const module = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(module));
      setModuleName("");
    } catch (error) {
      console.error("failed to create module:", error);
    }
  };

  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error) {
      console.error("failed to delete module:", error);
    }
  };

  const saveModule = async (module: any) => {
    try {
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    } catch (error) {
      console.error("failed to update module:", error);
    }
  };

  // 檢查用戶是否為教師 - 使用 prop 或 Redux 中的用戶資訊
  const effectiveUser = currentUser || reduxCurrentUser;
  const isFaculty = effectiveUser?.role === "FACULTY";
  
  // 添加調試日誌
  console.log("Modules 組件用戶角色檢查:", {
    propUser: currentUser,
    reduxUser: reduxCurrentUser,
    effectiveUser,
    isFaculty
  });

  return (
    <div className="wd-modules-container w-100 pe-3">
      {/* 只有教師才能看到模組控制項 */}
      {isFaculty && (
        <ModulesControls 
          moduleName={moduleName} 
          setModuleName={setModuleName} 
          addModule={createModuleForCourse}
        />
      )}
      
      <div id="wd-modules">
        {modules.map((module: any) => (
          <div key={module._id} className="mb-3">
            <div className="wd-module-header bg-secondary p-2 d-flex align-items-center">
              <BsGripVertical className="me-2 text-dark fs-4" />
              {!module.editing && <span className="fs-5">{module.name}</span>}
              {module.editing && isFaculty && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}
              <div className="ms-auto d-flex align-items-center">
                {isFaculty && <FaCheck className="text-success me-3" />}
                {/* 只有教師才能看到模組控制按鈕 */}
                {isFaculty && (
                  <ModuleControlButtons 
                    moduleId={module._id}
                    deleteModule={(moduleId) => removeModule(moduleId)}
                    editModule={(moduleId) => dispatch(editModule(moduleId))}
                  />
                )}
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
                      {isFaculty && <FaCheck className="text-success me-3" />}
                      {/* 只有教師才能看到課程控制按鈕 */}
                      {isFaculty && <LessonControlButtons />}
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