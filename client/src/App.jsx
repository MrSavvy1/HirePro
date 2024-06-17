import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WhoAreYou from './components/WhoAreYou';
import Signup from './components/Signup';
import Login from './components/Login';
import JobListing from './components/JobListing';
import PostJob from './components/PostJob';
import './App.css';

function App() {
  const [role, setRole] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whoareyou" element={<WhoAreYou setRole={setRole} />} />
          <Route path="/signup" element={<Signup role={role} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/welcome"
            element={
              role === 'Company' ? <PostJob /> : <JobListing />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import WhoAreYou from './components/WhoAreYou';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';

function App() {
  const [role, setRole] = useState('');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whoareyou" element={<WhoAreYou setRole={setRole} />} />
          <Route path="/signup" element={<Signup role={role} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<div className="container"><h1>Welcome to Jobs</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
*/
export default App;
