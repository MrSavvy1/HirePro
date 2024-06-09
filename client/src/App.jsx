import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import WhoAreYou from './components/WhoAreYou';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [role, setRole] = useState('');
  const [page, setPage] = useState('home');

  return (
    <Router>
      <div className="App">
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'whoAreYou' && <WhoAreYou setRole={(role) => { setRole(role); setPage('signup'); }} />}
        {page === 'signup' && <Signup setPage={setPage} role={role} />}
        {page === 'login' && <Login setPage={setPage} />}
        {page === 'welcome' && <div className="container"><h1>Welcome to Jobs</h1></div>}
      </div>
    </Router>
  );
}

export default App;
