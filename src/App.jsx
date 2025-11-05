import { useState } from "react"
import LoginPage from "./LoginPage.jsx"
import ToDoPage from "./ToDoPage.jsx"
import SignupPage from "./SignUpPage.jsx"
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  if (loggedIn) {
    return (
      <ToDoPage switchToLogin={()=>setLoggedIn(false)}/>
    )
  }

  return (
    <div>
      {isLogin ? (
        <LoginPage
          onLogin={() => setLoggedIn(true)}
          switchToSignup={() => setIsLogin(false)}
        />
      ) : (
        <SignupPage
          onLogin={() => setLoggedIn(true)}
          switchToLogin={() => setIsLogin(true)} 
        />
      )}
    </div>
  );
};

export default App;
