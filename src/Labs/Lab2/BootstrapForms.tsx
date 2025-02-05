import FormRange from "react-bootstrap/esm/FormRange";

import {
    Button,
    Col,
    Form,
    FormControl,
    FormGroup,
    FormLabel,
    FormSelect,
    InputGroup,
    Row,
} from "react-bootstrap";


export default function BootstrapForms() {
    return (
        <>
            <div id="wd-css-styling-forms">
                <h2>Forms</h2>
                <FormGroup className="mb-3" controlId="wd-email">
                    <FormLabel>Email address</FormLabel>
                    <FormControl type="email" placeholder="name@example.com" />
                </FormGroup>
                <FormGroup className="mb-3" controlId="wd-textarea">
                    <FormLabel>Example textarea</FormLabel>
                    <FormControl as="textarea" rows={3} />
                </FormGroup>
            </div>
            <div id="wd-css-styling-dropdowns">
                <h3>Dropdowns</h3>
                <FormSelect>
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </FormSelect>
            </div>
            <div id="wd-css-styling-switches">
                <h3>Switches</h3>
                <Form.Check
                    type="switch"
                    checked={false}
                    id="wd-switch-1"
                    label="Unchecked switch checkbox input"
                />
                <Form.Check
                    type="switch"
                    checked={true}
                    id="wd-switch-2"
                    label="Checked switch checkbox input"
                />
                <Form.Check
                    type="switch"
                    checked={false}
                    disabled
                    id="custom-switch"
                    label="Unchecked disabled switch checkbox input"
                />
                <Form.Check
                    type="switch"
                    checked={true}
                    disabled
                    id="custom-switch"
                    label="Checked disabled switch checkbox input"
                />
            </div>
            <div id="wd-css-styling-range-and-sliders">
                <h3>Range</h3>
                <FormGroup controlId="wd-range1">
                    <FormLabel>Example range</FormLabel>
                    <FormRange min="0" max="5" step="0.5" />
                </FormGroup>
            </div>
            <div id="wd-css-styling-addons">
                <h3>Addons</h3>
                <InputGroup className="mb-3">
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputGroup.Text>0.00</InputGroup.Text>
                    <FormControl />
                </InputGroup>
                <InputGroup>
                    <FormControl />
                    <InputGroup.Text>$</InputGroup.Text>
                    <InputGroup.Text>0.00</InputGroup.Text>
                </InputGroup>
            </div>
            <div id="wd-css-responsive-forms-1">
                <h3>Responsive forms</h3>
                <Form.Group as={Row} className="mb-3" controlId="email1">
                    <Form.Label column sm={2}>
                        Email
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="email" value="email@example.com" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="password1">
                    <Form.Label column sm={2}>
                        Password
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control type="password" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="textarea2">
                    <Form.Label column sm={2}>
                        Bio
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control as="textarea" style={{ height: "100px" }} />
                    </Col>
                </Form.Group>
            </div>
            <div id="wd-css-responsive-forms-p2">
                <h3>Responsive forms</h3>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            {" "}
                            Email{" "}
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>
                            {" "}
                            Password{" "}
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>
                    <fieldset>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label as="legend" column sm={2}>
                                Radios{" "}
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="first radio"
                                    checked
                                    name="formHorizontalRadios"
                                />
                                <Form.Check
                                    type="radio"
                                    label="second radio"
                                    name="formHorizontalRadios"
                                />
                                <Form.Check
                                    type="radio"
                                    label="third radio"
                                    name="formHorizontalRadios"
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
                    <Form.Group as={Row} className="mb-3">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Col>
                            <Button type="submit">Sign in</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}