import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import * as db from "./Database";
export default function Dashboard() {
    const courses = db.courses;
    return (
        <div id="wd-dashboard" className="pt-3">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>{" "}
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course) => (
                        <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                            <Card>
                                <Link
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    className="wd-dashboard-course-link text-decoration-none text-dark"
                                >
                                    <Card.Img
                                        variant="top"
                                        src={course.image}
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