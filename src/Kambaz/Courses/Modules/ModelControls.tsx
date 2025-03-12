import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor"; // Import the ModuleEditor component

export default function ModulesControls(
    { moduleName, setModuleName, addModule }:
    { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
    const [showModuleEditor, setShowModuleEditor] = useState(false);

    return (
        <div id="wd-modules-controls" className="d-flex justify-content-end gap-2">
            <Button variant="secondary" size="lg" id="wd-collapse-all">
                Collapse All
            </Button>
            <Button variant="secondary" size="lg" id="wd-view-progress">
                View Progress
            </Button>
            <Dropdown>
                <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
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

            {/* Button to open ModuleEditor */}
            <Button
                variant="danger"
                size="lg"
                id="wd-add-module-btn"
                onClick={() => setShowModuleEditor(true)}
            >
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Module
            </Button>

            {/* Module Editor Modal */}
            {showModuleEditor && (
                <ModuleEditor
                    dialogTitle="Add Module"
                    moduleName={moduleName}
                    setModuleName={setModuleName}
                    addModule={() => {
                        addModule();
                        setShowModuleEditor(false); // Close modal after adding
                    }}
                    onClose={() => setShowModuleEditor(false)}
                />
            )}
        </div>
    );
}
