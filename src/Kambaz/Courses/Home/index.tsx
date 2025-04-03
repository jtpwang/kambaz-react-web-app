import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      {/* Main Modules Section */}
      <div className="flex-fill me-3">
        <Modules />
      </div>

      {/* Course Status Sidebar (Visible only on xl screens and larger) */}
      <div className="d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}
