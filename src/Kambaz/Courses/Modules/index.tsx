import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModelControls";
import { BsGripVertical } from "react-icons/bs";

import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

import { FaLink } from "react-icons/fa6";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br /> <br /> <br /> <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {/* Week 1, Lecture 1 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {/* Learning Objectives */}
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Introduction to the course <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Learn what is Web Development <LessonControlButtons />
            </ListGroup.Item>

            {/* Reading */}
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              READING <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Full Stack Developer - Chapter 1 - Introduction
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Full Stack Developer - Chapter 2 - Creating User Interfaces with HTML
              <LessonControlButtons />
            </ListGroup.Item>

            {/* Slides */}
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              SLIDES <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Introduction to Web Development
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Creating an HTTP server with Node.js
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Creating a React Application
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Commit your source to GitHub.com
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Deploying to Netlify
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Deploying multiple branches in Netlify
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Week 1, Lecture 2 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 1, Lecture 2 - Formatting User Interfaces with HTML
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              LEARNING OBJECTIVES <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Learn how to create user interfaces with HTML
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              Deploy the assignment to Netlify
              <LessonControlButtons />
            </ListGroup.Item>

            {/* Slides */}
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              SLIDES <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Introduction to HTML and the DOM
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Formatting Web content with Headings and Formatting
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1 text-danger">
              <BsGripVertical className="me-2 fs-3" />
              <FaLink className="me-2" />
              Formatting content with Lists and Tables
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}