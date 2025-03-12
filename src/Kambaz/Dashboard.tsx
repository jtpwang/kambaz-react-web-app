import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as db from "./Database";

export default function Dashboard({ courses, setCourses, addNewCourse, deleteCourse, updateCourse, course, setCourse }) {
    return (
        <div id="wd-dashboard" className="pt-3">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>
            <hr />

            <div className="d-flex align-items-center justify-content-between">
                <h5 className="m-0">New Course</h5>
                <div className="d-flex gap-2">
                    <Button className="btn btn-primary" onClick={addNewCourse} id="wd-add-new-course-click">
                        Add
                    </Button>
                    <Button className="btn btn-warning" onClick={updateCourse} id="wd-update-course-click">
                        Update
                    </Button>
                </div>
            </div>

            <input
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
                className="form-control mt-2 mb-2"
                placeholder="Course Name"
            />
            <textarea
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                className="form-control mb-3"
                placeholder="Course Description"
            />

            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link to={`/Kambaz/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <Card.Img variant="top" src={course.image} width="100%" height={160} />
                                    <Card.Body>
                                        <Card.Title style={{ height: 70 }}>{course.name}</Card.Title>
                                        <Card.Text className="wd-dashboard-course-title overflow-y-hidden" style={{ maxHeight: 100 }}>
                                            {course.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                                <div className="d-flex justify-content-around p-2">
                                    <Button variant="primary">Go</Button>
                                    <Button className="btn btn-warning" onClick={(event) => { event.preventDefault(); setCourse(course); }} id="wd-edit-course-click">
                                        Edit
                                    </Button>
                                    <Button variant="danger" onClick={(event) => { event.preventDefault(); deleteCourse(course._id); }} id="wd-delete-course-click">
                                        Delete
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

