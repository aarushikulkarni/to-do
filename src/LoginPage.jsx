import { useState } from "react";

const LoginPage = ({ onLogin, switchToSignup }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) return

        try {
            const response = await fetch("http://localhost:5050/auth/login", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( {username, password })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token)
                onLogin()
            }
            else {
                setError(data.error || 'Signup failed');
                return
            }
        }
        catch (err) {
            alert("Login failed, please try again.")
        }
    };

    return (
        <div className="content">
            <h1 className="app-title">To-Do Tracker</h1>
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

                {error && <p className="error-message">{error}</p>}

                <p>Or if don't have an account</p>
                <a href="#" onClick={switchToSignup}>sign up</a>
            </form>
        </div>
        
    );
};

export default LoginPage;