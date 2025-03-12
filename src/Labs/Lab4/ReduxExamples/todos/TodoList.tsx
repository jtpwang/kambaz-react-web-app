import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

import { useSelector } from "react-redux"; // import useSelector to retrieve

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer); // extract todos from reducer and remove

    return (
        <div>
            <h2>Todo List</h2>
            <ul className="list-group">
                <TodoForm />
                {todos.map((todo: any) => (
                    <TodoItem todo={todo} />
                ))}
            </ul>
            <hr />
        </div>
    );
}