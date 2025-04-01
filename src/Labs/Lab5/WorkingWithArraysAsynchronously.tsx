import { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup } from "react-bootstrap";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithArraysAsynchronously() {
    const [todos, setTodos] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // Fetch all todos on mount
    useEffect(() => {
        fetchTodos();
    }, []);

    // Async API handlers
    const fetchTodos = async () => {
        const todos = await client.fetchTodos();
        setTodos(todos);
    };

    const createTodo = async () => {
        const todos = await client.createTodo();
        setTodos(todos);
    };

    const postTodo = async () => {
        const newTodo = await client.postTodo({
            title: "New Posted Todo",
            completed: false,
        });
        setTodos([...todos, newTodo]);
    };

    const updateTodo = async (todo: any) => {
        try {
            await client.updateTodo(todo);
            setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }
    };

    const deleteTodo = async (todo: any) => {
        try {
            await client.deleteTodo(todo);
            const newTodos = todos.filter((t) => t.id !== todo.id);
            setTodos(newTodos);
        } catch (error: any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };

    const removeTodo = async (todo: any) => {
        const updatedTodos = await client.removeTodo(todo);
        setTodos(updatedTodos);
    };

    const editTodo = (todo: any) => {
        const updatedTodos = todos.map((t) =>
            t.id === todo.id ? { ...todo, editing: true } : t
        );
        setTodos(updatedTodos);
    };

    return (
        <div id="wd-asynchronous-arrays" className="p-3">
            <h3>Working with Arrays Asynchronously</h3>

            {/* Error display */}
            {errorMessage && (
                <div
                    id="wd-todo-error-message"
                    className="alert alert-danger mb-2 mt-2"
                >
                    {errorMessage}
                </div>
            )}

            {/* Add buttons */}
            <h4>
                Todos
                <FaPlusCircle
                    onClick={createTodo}
                    className="text-success float-end fs-3"
                    title="Create Todo"
                    id="wd-create-todo"
                />
                <FaPlusCircle
                    onClick={postTodo}
                    className="text-primary float-end fs-3 me-3"
                    title="Post Todo"
                    id="wd-post-todo"
                />
            </h4>

            {/* Todo List */}
            <ListGroup>
                {todos.map((todo) => (
                    <ListGroup.Item key={todo.id} className="d-flex align-items-center">
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={todo.completed}
                            onChange={(e) =>
                                updateTodo({ ...todo, completed: e.target.checked })
                            }
                        />

                        {/* Title or editable input */}
                        {!todo.editing ? (
                            <span>{todo.title}</span>
                        ) : (
                            <FormControl
                                className="w-50"
                                value={todo.title}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateTodo({ ...todo, editing: false });
                                    }
                                }}
                                onChange={(e) =>
                                    updateTodo({ ...todo, title: e.target.value })
                                }
                            />
                        )}

                        {/* Action Icons: Pencil, Delete, Trash */}
                        <div className="ms-auto d-flex align-items-center gap-3">
                            <FaPencil
                                onClick={() => editTodo(todo)}
                                className="text-primary fs-5"
                                title="Edit Todo"
                            />
                            <TiDelete
                                onClick={() => deleteTodo(todo)}
                                className="text-danger fs-4"
                                id="wd-delete-todo"
                                title="Delete from database"
                            />
                            <FaTrash
                                onClick={() => removeTodo(todo)}
                                className="text-danger fs-5"
                                id="wd-remove-todo"
                                title="Remove from array"
                            />
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <hr />
        </div>
    );
}
