import React from 'react';
import './App.css';
import LoginScreen from 'screens/Login';
import HomeScreen from 'screens/Home'
import { useLogin } from 'context/LoginContext';

function App() {
  const { user } = useLogin()
  return (
    <div className="App">
      {user ? <HomeScreen></HomeScreen> : <LoginScreen></LoginScreen>}
    </div>
  );
}

export default App;
