import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";

export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
    { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
  
  // Manage modal visibility state with useState
  const [showModal, setShowModal] = useState(false);
  
  // Handle adding a module
  const handleAddModule = () => {
    addModule();
    setShowModal(false);
  };
  
  return (
    <div id="wd-modules-controls" className="d-flex justify-content-end mb-3">
      <Button variant="secondary" size="sm" className="me-2" id="wd-collapse-all">
        Collapse All
      </Button>
      <Button variant="secondary" size="sm" className="me-2" id="wd-view-progress">
        View Progress
      </Button>
      <Dropdown className="me-2">
        <Dropdown.Toggle variant="secondary" size="sm" id="wd-publish-all-btn">
          <GreenCheckmark />
          Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark />
            Publish All
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark />
            Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark />
            Publish modules only
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <button 
        className="btn btn-danger btn-sm" 
        id="wd-add-module-btn"
        onClick={() => setShowModal(true)}
      >
        <FaPlus className="position-relative me-1" style={{ bottom: "1px" }} />
        Module
      </button>
      <ModuleEditor 
        dialogTitle="Add Module" 
        moduleName={moduleName}
        setModuleName={setModuleName} 
        addModule={handleAddModule}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}
