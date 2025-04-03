// import { FaPlus } from "react-icons/fa6";
// import GreenCheckmark from "./GreenCheckmark";
// import { Button, Dropdown } from "react-bootstrap";
// import ModuleEditor from "./ModuleEditor";

// export default function ModulesControls(
//     { moduleName, setModuleName, addModule }:
//     { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
//     return (
//         <div id="wd-modules-controls" className="d-flex justify-content-end gap-2">
//             <Button variant="secondary" size="lg" id="wd-collapse-all">
//                 Collapse All
//             </Button>
//             <Button variant="secondary" size="lg" id="wd-view-progress">
//                 View Progress
//             </Button>
//             <Dropdown>
//                 <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
//                     <GreenCheckmark />
//                     Publish All
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                     <Dropdown.Item id="wd-publish-all">
//                         <GreenCheckmark />
//                         Publish All
//                     </Dropdown.Item>
//                     <Dropdown.Item id="wd-publish-all-modules-and-items">
//                         <GreenCheckmark />
//                         Publish all modules and items
//                     </Dropdown.Item>
//                     <Dropdown.Item id="wd-publish-modules-only">
//                         <GreenCheckmark />
//                         Publish modules only
//                     </Dropdown.Item>
//                     <Dropdown.Item id="wd-unpublish-all-modules-and-items">
//                         Unpublish all modules and items
//                     </Dropdown.Item>
//                     <Dropdown.Item id="wd-unpublish-modules-only">
//                         Unpublish modules only
//                     </Dropdown.Item>
//                 </Dropdown.Menu>
//             </Dropdown>
//             <button className="btn btn-lg btn-danger me-1 float-end" id="wd-add-module-btn"
//                 data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog">
//                 <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
//                 Module
//             </button>
//             <ModuleEditor dialogTitle="Add Module" moduleName={moduleName}
//                 setModuleName={setModuleName} addModule={addModule} />
//         </div>
//     );
// }

