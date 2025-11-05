import { useState } from "react"
import LoginPage from "./LoginPage.jsx"
import ToDoPage from "./ToDoPage.jsx"
import SignupPage from "./SignUpPage.jsx"
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  if (loggedIn) {
    return (
      <ToDoPage switchToLogin={()=>setLoggedIn(false)}/>
    )
  }

  return (
    <div>
      {isSignup ? (
        <SignupPage
          onLogin={() => setLoggedIn(true)}
          switchToLogin={() => setIsSignup(false)} 
        />
      ) : (
        <LoginPage
          onLogin={() => setLoggedIn(true)}
          switchToSignup={() => setIsSignup(true)}
        />
      )}
    </div>
  );
};

export default App;
