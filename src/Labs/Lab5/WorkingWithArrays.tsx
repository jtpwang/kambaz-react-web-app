import { useState } from "react";
import { Form, FormControl, FormCheck, Row, Col, Button } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: "1",
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const API = `${REMOTE_SERVER}/lab5/todos`;

    return (
        <div id="wd-working-with-arrays" className="p-3">
            <h3>Working with Arrays</h3>

            {/* Get all todos */}
            <h4>Retrieving Arrays</h4>
            <Button className="btn btn-primary mb-3" href={API}>
                Get Todos
            </Button>

            {/* Get todo by ID */}
            <h4>Retrieving an Item from an Array by ID</h4>
            <FormControl
                className="w-50 mb-2"
                value={todo.id}
                onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            />
            <Button className="btn btn-primary mb-3" href={`${API}/${todo.id}`}>
                Get Todo by ID
            </Button>

            {/* Filter completed */}
            <h4>Filtering Array Items</h4>
            <Button className="btn btn-primary mb-3" href={`${API}?completed=true`}>
                Get Completed Todos
            </Button>

            {/* Create */}
            <h4>Creating new Items in an Array</h4>
            <Button className="btn btn-primary mb-3" href={`${API}/create`}>
                Create Todo
            </Button>

            {/* Delete */}
            <h4>Deleting from an Array</h4>
            <FormControl
                className="w-50 mb-2"
                value={todo.id}
                onChange={(e) => setTodo({ ...todo, id: e.target.value })}
            />
            <Button
                variant="danger"
                className="mb-3"
                href={`${API}/${todo.id}/delete`}
            >
                Delete Todo with ID = {todo.id}
            </Button>

            {/* Update section */}
            <h4>Updating an Item in an Array</h4>
            <Form className="mb-5">

                {/* Update Title */}
                <Form.Group as={Row} className="mb-3 align-items-center">
                    <Form.Label column sm="2">ID</Form.Label>
                    <Col sm="2">
                        <FormControl
                            value={todo.id}
                            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                        />
                    </Col>
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="4">
                        <FormControl
                            value={todo.title}
                            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                        />
                    </Col>
                    <Col sm="2">
                        <Button
                            className="w-100"
                            href={`${API}/${todo.id}/title/${todo.title}`}
                        >
                            Update Todo Title
                        </Button>
                    </Col>
                </Form.Group>

                {/* Update Completed */}
                <Form.Group as={Row} className="mb-3 align-items-center">
                    <Form.Label column sm="2">ID</Form.Label>
                    <Col sm="2">
                        <FormControl
                            value={todo.id}
                            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                        />
                    </Col>
                    <Form.Label column sm="2">Completed</Form.Label>
                    <Col sm="4">
                        <FormCheck
                            type="checkbox"
                            label="Completed"
                            checked={todo.completed}
                            onChange={() =>
                                setTodo({ ...todo, completed: !todo.completed })
                            }
                        />
                    </Col>
                    <Col sm="2">
                        <Button
                            className="w-100"
                            href={`${API}/${todo.id}/completed/${todo.completed}`}
                        >
                            Update Completed Todo
                        </Button>
                    </Col>
                </Form.Group>

                {/* Update Description */}
                <Form.Group as={Row} className="mb-3 align-items-center">
                    <Form.Label column sm="2">ID</Form.Label>
                    <Col sm="2">
                        <FormControl
                            value={todo.id}
                            onChange={(e) => setTodo({ ...todo, id: e.target.value })}
                        />
                    </Col>
                    <Form.Label column sm="2">Description</Form.Label>
                    <Col sm="4">
                        <FormControl
                            value={todo.description}
                            onChange={(e) =>
                                setTodo({ ...todo, description: e.target.value })
                            }
                        />
                    </Col>
                    <Col sm="2">
                        <Button
                            className="w-100"
                            href={`${API}/${todo.id}/description/${todo.description}`}
                        >
                            Update Description Todo
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}
