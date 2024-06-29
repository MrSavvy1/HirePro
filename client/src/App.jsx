import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EmployeeHeader from './components/EmployeeHeader';
import CompanyHeader from './components/CompanyHeader';
import Home from './components/Home';
import WhoAreYou from './components/WhoAreYou';
import Signup from './components/Signup';
import Login from './components/Login';
import JobListing from './components/JobListing';
import JobDetails from './components/JobDetails';
import JobPost from './components/PostJob';
import Footer from './components/Footer';
import Profile from './components/Profile';
import ProfileCom from './components/ProfileCom';
//import AppliedJobs from './components/AppliedJobs';
import CompanyJobs from './components/CompanyJobs';
//import CreateJobCategory from './components/CreateJobCategory';
import './App.css';

function App() {
    const [role, setRole] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (userRole) => {
        setRole(userRole);
        setIsAuthenticated(true);
    };

    const PrivateRoute = ({ element, roles }) => {
        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
       // if (roles && !roles.includes(role)) {
      //      return <Navigate to="/" />;
      //  }
        return element;
    };

    return (
        <Router>
            <div className="App">
                {isAuthenticated && role === 'regular'}
                {isAuthenticated && role === 'company'}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/whoareyou" element={<WhoAreYou setRole={setRole} />} />
                    <Route path="/signup" element={<Signup role={role} />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    {/* Regular User Routes */}
                    <Route path="/joblisting" element={<PrivateRoute element={<> <EmployeeHeader /> <JobListing /> <Footer /> </>} roles={['regular']} />} />
                    <Route path="/job/:id" element={<PrivateRoute element={<> <EmployeeHeader /> <JobDetails /> <Footer /> </>} roles={['regular']} />} />
                    <Route path="/profile" element={<PrivateRoute element={<> <EmployeeHeader /> <Profile /> <Footer /> </>} roles={['regular']} />} />
                    {/*  <Route path="/applied-jobs" element={<PrivateRoute element={<AppliedJobs />} roles={['regular']} />} /> */}
                    {/* Company User Routes */}
                    {/* <Route path="/jobcat" element={<PrivateRoute element={<>  <CompanyHeader /> <CreateJobCategory /> <Footer /> </>} roles={['company']} />} />   */}
                    
                    <Route path="/post-job" element={<PrivateRoute element={<>  <CompanyHeader /> <JobPost /> <Footer /> </>} roles={['company']} />} />
                     
                    <Route path="/profilecom" element={<PrivateRoute element={<>  <CompanyHeader />  <ProfileCom /> <Footer /> </>} roles={['company']} />} />
                    <Route path="/company-jobs" element={<PrivateRoute element={<>  <CompanyHeader /> <CompanyJobs /> <Footer /> </>} roles={['company']} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
