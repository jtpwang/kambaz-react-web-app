import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as db from "./Database";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() {
    const [courses, setCourses] = useState<any[]>(db.courses);
    const [course, setCourse] = useState<any>({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/reactjs.jpg",
        description: "New Description"
    });

    const addNewCourse = () => {
        const newCourse = { ...course, _id: uuidv4() };
        setCourses([...courses, newCourse]);
    };

    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId));
    };

    const updateCourse = () => {
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };

    return (
        <div id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h5>New Course
                <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}> Add </button>
                <button className="btn btn-warning float-end me-2" onClick={updateCourse} id="wd-update-course-click"> Update </button>
            </h5>
            <br />
            <input 
                value={course.name} 
                className="form-control mb-2" 
                onChange={(e) => setCourse({ ...course, name: e.target.value })} 
                placeholder="Course Name" 
            />
            <textarea 
                value={course.description} 
                className="form-control" 
                onChange={(e) => setCourse({ ...course, description: e.target.value })} 
                placeholder="Course Description" 
            />
            <hr />
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>{" "}
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course) => (
                        <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <Card.Img
                                        variant="top"
                                        src={course.image || "/images/react.jpg"}
                                        width="100%"
                                        height={160}
                                    />
                                    <Card.Body>
                                        <Card.Title style={{ height: 70 }}>
                                            {course.name}
                                            <br />
                                            <br />
                                        </Card.Title>
                                        <Card.Text
                                            className="wd-dashboard-course-title overflow-y-hidden"
                                            style={{ maxHeight: 100 }}
                                        >
                                            {course.description}
                                            <br />
                                        </Card.Text>
                                        <Button variant="primary"> Go</Button>
                                        <button 
                                            onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }} 
                                            className="btn btn-danger float-end" 
                                            id="wd-delete-course-click"
                                        >
                                            Delete
                                        </button>
                                        <button 
                                            id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                setCourse(course);
                                            }} 
                                            className="btn btn-warning me-2 float-end"
                                        >
                                            Edit
                                        </button>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

