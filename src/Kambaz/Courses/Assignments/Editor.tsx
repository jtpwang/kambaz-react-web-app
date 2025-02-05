import {
    Button,
    Col,
    Form,
    Container,
    Row
} from "react-bootstrap";

export default function AssignmentEditor() {
    return (
        <Container id="wd-assignments-editor">
            <Form className="p-3 border fs-5 wd-assignments-editor">
                <Form.Group
                    className="mb-3"
                    controlId="wd-name">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="A1 - ENV + HTML" />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="wd-description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5}
                        placeholder="The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:Your full name and section - Links to each of the lab assignments - Link to the Kambazapplication - Links to all relevant source code repositories - The Kambaz application should include a link to navigate back to the landing page." />
                </Form.Group>
                <Form.Group
                    className="mb-3 d-flex"
                    controlId="wd-points">
                    <Form.Label
                        className="me-3 w-50 text-end">Points</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="100" />
                </Form.Group>
                <Form.Group
                    className="mb-3 d-flex"
                    controlId="wd-group">
                    <Form.Label
                        className="me-3 w-50 text-end">Assignment Group</Form.Label>
                    <Form.Select
                        aria-label="Select Assignment Group">
                        <option value="1">ASSIGNMENTS</option>
                        <option value="2">Quizzes</option>
                        <option value="3">Projects</option>
                        <option value="4">Exams</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    className="mb-3 d-flex"
                    controlId="wd-display-grade-as">
                    <Form.Label
                        className="me-3 w-50 text-end">Display Grade as</Form.Label>
                    <Form.Select
                        aria-label="Select Display Grade as">
                        <option value="1">Percentage</option>
                        <option value="2">Complete/Incomplete</option>
                        <option value="3">Letter Grade</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group
                    className="mb-3 d-flex"
                    controlId="wd-submission-type">
                    <Form.Label
                        className="me-3 w-50 text-end">Submission Type</Form.Label>
                    <Form.Group
                        className="p-3 mb-3 w-100 border"
                        controlId="wd-online-entry-options">
                        <Form.Select
                            aria-label="Select Submission Type">
                            <option value="1">Online</option>
                            <option value="2">In Person</option>
                            <option value="3">External Tool</option>
                        </Form.Select>
                        <Form.Label>Online Entry Options</Form.Label>
                        <Form.Check
                            type="checkbox"
                            label="Text Entry"
                            id="wd-text-entry" />
                        <Form.Check
                            type="checkbox"
                            label="Website URL"
                            id="wd-website-url" />
                        <Form.Check
                            type="checkbox"
                            label="File Upload"
                            id="wd-file-upload" />
                        <Form.Check
                            type="checkbox"
                            label="Media Recordings"
                            id="wd-media-recordings" />
                        <Form.Check
                            type="checkbox"
                            label="Student Annotation"
                            id="wd-student-annotation" />
                    </Form.Group>
                </Form.Group>
                <Form.Group
                    className="mb-3 d-flex"
                    controlId="wd-assign-to">
                    <Form.Label
                        className="me-3 w-50 text-end">Assign</Form.Label>
                    <Form.Group
                        className="p-3 mb-3 w-100 border"
                        controlId="wd-assign-to">
                        <Form.Label
                            className="me-3">Assign to</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Everyone" />
                        <Form.Group
                            className="mt-2"
                            controlId="wd-due-date">
                            <Form.Label>Due</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="2024-05-13" />
                        </Form.Group>
                        <Form.Group
                            className="mt-2 d-flex justify-content-end">
                            <Form.Group
                                className="w-50"
                                controlId="wd-available-from">
                                <Form.Label>Available From</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="2024-05-10" />
                            </Form.Group>
                            <Form.Group
                                className="ms-2 w-50"
                                controlId="wd-available-until">
                                <Form.Label
                                    className="me-2">Until</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="2024-05-20" />
                            </Form.Group>
                        </Form.Group>
                    </Form.Group>
                </Form.Group>
                <hr />
                <Form.Group className="d-flex justify-content-end">
                    <Row>
                        <Col>
                            <Button
                                variant="secondary"
                                size="lg"
                                id="wd-cancel">Cancel
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                variant="secondary"
                                className="bg-danger text-white"
                                size="lg" id="wd-save">Save
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
    );
}