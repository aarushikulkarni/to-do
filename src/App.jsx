import { useState } from "react"
import LoginPage from "./LoginPage.jsx"
import './App.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <LoginPage onLogin={() => setLoggedIn(true)}/>
    </div>
  );
};

export default App;
