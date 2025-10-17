import { useState } from "react";

const ToDoPage = ({ onLogin }) => {
    const[todos, setTodos] = useState([]);
    const[input, setInput] = useState("");

    const addTodo = () => {
        if (input.trim() === "") return;
        setTodos([...todos, { text: input, completed: false }]);
        setInput("");
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
       <div className="content">
            <h2> My To-Do List</h2>
            <form className="todo-form" onSubmit={(e) => {
                    e.preventDefault();
                    addTodo();
                }}>
            <input className = "add-todo"
                type = "text"
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
            />
            <button className="add-button" onClick={addTodo}>Add</button>
            </form>
            <div className="todo-list">
            <ul>
                {todos.map((todo, idx) => (
                    <li key={idx}>
                        <span
                            onClick={() => toggleTodo(idx)}
                            style={{ textDecoration: todo.completed ? "line-through" : ""}}
                        > {todo.text}
                        </span>
                        <button className="delete-button" onClick={() => deleteTodo(idx)}>Delete</button>
                    </li>
                ))}
            </ul>
            </div> 
        </div>
    );
};

export default ToDoPage;