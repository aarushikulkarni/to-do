import { useState } from 'react'

const SignupPage = ({ onLogin, switchToLogin}) => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username || !password) return

        try {
            const response = await fetch("http://localhost:5050/auth/signup", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify( {name, username, password })
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem("token", data.token)
                onLogin()
            }
            else {
                setError(data.error || "Signup failed")
                return
            }
        }
        catch (err) {
            alert("Signup failed, please try again.")
        }
    };

    return (
        <div className="content">
            <h1 className="app-title">To-Do Tracker</h1>
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
                {error && <p className="error-message">{error}</p>}
                <a href="#" onClick={switchToLogin}>log in</a>
            </form>
        </div>
    )
}

export default SignupPage;