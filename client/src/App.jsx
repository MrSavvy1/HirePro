import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import EmployeeHeader from './components/EmployeeHeader';
import CompanyHeader from './components/CompanyHeader';
import Home from './components/Home';
import WhoAreYou from './components/WhoAreYou';
import Signup from './components/Signup';
import Login from './components/Login';
import JobListing from './components/JobListing';
import JobDetails from './components/JobDetails';
import JobPost from './components/PostJob';
import Profile from './components/Profile';
import AppliedJobs from './components/AppliedJobs';
import CompanyJobs from './components/CompanyJobs';
import './App.css';

function App() {
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode.default(token);
            setRole(decodedToken.role);
            setIsAuthenticated(true);
        }
    }, []);

    const PrivateRoute = ({ element, roles }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
        if (roles && !roles.includes(role)) {
            return <Navigate to="/" />;
        }
        return element;
    };

    return (
        <Router>
            {isAuthenticated && role === 'employee' && <EmployeeHeader />}
            {isAuthenticated && role === 'company' && <CompanyHeader />}
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/whoareyou" element={<WhoAreYou setRole={setRole} />} />
                    <Route path="/signup" element={<Signup role={role} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/jobs" element={<PrivateRoute element={<JobListing />} roles={['employee']} />} />
                    <Route path="/job/:id" element={<PrivateRoute element={<JobDetails />} roles={['employee']} />} />
                    <Route path="/post-job" element={<PrivateRoute element={<JobPost />} roles={['company']} />} />
                    <Route path="/profile" element={<PrivateRoute element={<Profile />} roles={['employee', 'company']} />} />
                    <Route path="/applied-jobs" element={<PrivateRoute element={<AppliedJobs />} roles={['employee']} />} />
                    <Route path="/company-jobs" element={<PrivateRoute element={<CompanyJobs />} roles={['company']} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
