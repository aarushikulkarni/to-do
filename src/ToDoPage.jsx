import { useState, useEffect } from "react";

const ToDoPage = ({ switchToLogin }) => {
    const[todos, setTodos] = useState([]);
    const[input, setInput] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await fetch("http://localhost:5050/todo", {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                if (res.ok) setTodos(data);
                else console.error(data.error);
            }
            catch (err) {
                console.error("Failed to fetch todos", err);
            }
        };

        fetchTodos();
    }, [token]);

    const addTodo = async () => {
        if (input.trim() === "") return;
        try {
            const res = await fetch("http://localhost:5050/todo", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( { text: input, completed: false }),
            });

            const newTodo = await res.json();
            if (res.ok) {
                setTodos([...todos, newTodo]);
                setInput("");
            }
            else {
                console.error(newTodo.error);
            }
        }
        catch (err) {
            console.error("Error adding todo", err);
        }
    };

    const toggleTodo = async (id, currentCompleted) => {
        try {
            const res = await fetch(`http://localhost:5050/todo/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: !currentCompleted }),
            });
            const updatedTodo = await res.json();
            if (res.ok) {
                setTodos(todos.map((t)=> (t.id === id ? updatedTodo : t)));
            }
        }
        catch (err) {
            console.error("Error toggling todo", err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const res = await fetch(`http://localhost:5050/todo/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (res.ok) {
                setTodos(todos.filter((t) => t.id !== id));
            }
        }
        catch (err) {
            console.error("Error deleting todo", err);
        }
    };

    const handleSignout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        switchToLogin()
    }

    return (
       <div className="content">
            <h2> My To-Do List</h2>
            <a className="signout-link" href="#" onClick={handleSignout}>Sign out</a>
            <form className="todo-form" onSubmit={(e) => {
                    e.preventDefault();
                    addTodo();
                }}>
            <input className = "add-todo"
                type = "text"
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
            />
            <button className="add-button" >Add</button>
            </form>
            <div className="todo-list">
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span
                            onClick={() => toggleTodo(todo.id, todo.completed)}
                            style={{ textDecoration: todo.completed ? "line-through" : ""}}
                        > {todo.text}
                        </span>
                        <button className="delete-button" onClick={() => deleteTodo(todo.id)}>x</button>
                    </li>
                ))}
            </ul>
            </div> 
        </div>
    );
};

export default ToDoPage;