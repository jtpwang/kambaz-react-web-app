import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

export default function Dashboard() {
    return (
        <div id="wd-dashboard" className="container-fluid">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2>
            <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={4} className="g-4">
                    {/* Course 1 */}
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/1234" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">CS101: React Basics</Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">
                                        Intro to React Development
                                    </Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Course 2 */}
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/5678" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/vuejs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title>CS102: Vue.js Essentials</Card.Title>
                                    <Card.Text>Building Interfaces with Vue.js</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Course 3 */}
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/91011" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/angular.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title>CS103: Angular Mastery</Card.Title>
                                    <Card.Text>Advanced Angular Development</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Course 4 */}
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/11234" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/nodejs.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title>CS104: Node.js for Backend</Card.Title>
                                    <Card.Text>Server-Side Development with Node.js</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Course 5 */}
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/21234" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/python.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title>CS105: Python Programming</Card.Title>
                                    <Card.Text>Programming Foundations with Python</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Course 6 */}
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/31234" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/htmlcss.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title>CS106: Web Design Fundamentals</Card.Title>
                                    <Card.Text>Creating Stunning Websites with HTML & CSS</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {/* Course 7 */}
                    <Col className="wd-dashboard-course" style={{ width: "300px" }}>
                        <Card>
                            <Link to="/Kambaz/Courses/41234" className="wd-dashboard-course-link text-decoration-none text-dark">
                                <Card.Img variant="top" src="/images/java.jpg" width="100%" height={160} />
                                <Card.Body>
                                    <Card.Title>CS107: Java Development</Card.Title>
                                    <Card.Text>Object-Oriented Programming with Java</Card.Text>
                                    <Button variant="primary">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

