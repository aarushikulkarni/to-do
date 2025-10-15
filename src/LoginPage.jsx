import { useState } from "react";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username && password) {
            onLogin();
        }
    };

    return (
        <div className="content">
            <h1 className="app-title">Easy To-Do List</h1>
            <form className = "login-form" onSubmit = {handleSubmit}>
                <h2>Login</h2>
                <input
                    className="input-box"
                    type = "text"
                    placeholder = "Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    className="input-box"
                    type = "password"
                    placeholder = "Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" type="submit">Submit</button>
            </form>
        </div>
        
    );
};

export default LoginPage;