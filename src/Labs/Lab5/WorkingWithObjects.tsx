import{ useState } from "react";
import { FormControl, FormCheck } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "0",
    name: "Module",
    description: "Module Description",
    course: "Course"
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects" className="p-3">
      <h3>Working With Objects</h3>

      {/* Section: Modifying Properties */}
      <h4 className="mt-4">Modifying Properties</h4>

      {/* Title */}
      <div className="mb-3">
        <FormControl
          className="w-75 mb-2"
          id="wd-assignment-title"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
      </div>

      {/* Score */}
      <div className="mb-3">
        <FormControl
          className="w-75 mb-2"
          type="number"
          id="wd-assignment-score"
          value={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>

      {/* Completed */}
      <div className="mb-3">
        <FormCheck
          id="wd-assignment-completed"
          checked={assignment.completed}
          onChange={() =>
            setAssignment({ ...assignment, completed: !assignment.completed })
          }
          label="Completed"
        />
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary mt-2"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>

      {/* Module Description */}
      <div className="mb-3">
        <FormControl
          className="w-75 mb-2"
          id="wd-module-description"
          value={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Module Description
        </a>
      </div>

      <hr />

      {/* Section: Retrieving Objects */}
      <h4>Retrieving Objects</h4>
      <div className="mb-3 d-flex gap-3 flex-wrap">
        <a
          id="wd-retrieve-assignment"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}`}
        >
          Get Assignment
        </a>
        <a
          id="wd-retrieve-module"
          className="btn btn-primary"
          href={`${MODULE_API_URL}`}
        >
          Get Module
        </a>
      </div>

      <hr />

      {/* Section: Retrieving Properties */}
      <h4>Retrieving Properties</h4>
      <div className="mb-3 d-flex gap-3 flex-wrap">
        <a
          id="wd-retrieve-assignment-title"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/title`}
        >
          Get Title
        </a>
        <a
          id="wd-retrieve-module-name"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name`}
        >
          Get Module Name
        </a>
      </div>
    </div>
  );
}
