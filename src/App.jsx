import { useState } from "react"
import LoginPage from "./LoginPage.jsx"
import ToDoPage from "./ToDoPage.jsx"
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      {loggedIn ? (
        <ToDoPage />
      ) : (
        <LoginPage onLogin={() => setLoggedIn(true)}/>
      )}
    </div>
  );
};

export default App;
