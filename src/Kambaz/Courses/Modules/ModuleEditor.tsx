// import { Modal, FormControl, Button } from "react-bootstrap";
// export default function ModuleEditor({ show, handleClose, dialogTitle, moduleName, setModuleName, addModule,}: {
//  show: boolean; handleClose: () => void; dialogTitle: string; moduleName: string; setModuleName: (name: string) => void;
//  addModule: () => void; }) {
//  return (
//   <Modal show={show} onHide={handleClose}>
//    <Modal.Header closeButton>
//     <Modal.Title>{dialogTitle}</Modal.Title>
//    </Modal.Header>
//    <Modal.Body>
//     <FormControl value={moduleName}
//      onChange={(e) => { setModuleName(e.target.value); }} />
//    </Modal.Body>
//    <Modal.Footer>
//     <Button variant="secondary" onClick={handleClose}> Cancel </Button>
//     <Button variant="primary"
//      onClick={() => {
//       addModule();
//       handleClose();
//      }} > Add Module </Button>
//    </Modal.Footer>
//   </Modal>
// );}

export default function ModuleEditor({ dialogTitle, moduleName, setModuleName, addModule }:
  { dialogTitle: string; moduleName: string; setModuleName: (name: string) => void; addModule: () => void; }) {
  return (
    <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control"
              defaultValue={moduleName}
              placeholder="Module Name"
              onChange={(e) => setModuleName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button onClick={addModule} type="button" data-bs-dismiss="modal" className="btn btn-danger">
              Add Module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}