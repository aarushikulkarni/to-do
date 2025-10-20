import { useState } from 'react'

const SignupPage = ({ onLogin, switchToLogin}) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()

        if (name && username && password) {
            onLogin();
        }
    };

    return (
        <div className="content">
            <h1 className="app-title">Easy To-Do List</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    className="input-box"
                    type = "text"
                    placeholder = "Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                    onChange={(e) => setPassword(e.target.value)}/>
                <button className="login-button" type="submit">Submit</button>
                <p>Or if already signed up</p>
                <a href="#" onClick={switchToLogin}>log in</a>
            </form>
        </div>
    )
}

export default SignupPage;