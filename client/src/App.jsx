// App.js
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import './App.css';

const EmployeeHeader = lazy(() => import('./components/EmployeeHeader'));
const CompanyHeader = lazy(() => import('./components/CompanyHeader'));
const Home = lazy(() => import('./components/Home'));
const WhoAreYou = lazy(() => import('./components/WhoAreYou'));
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const JobListing = lazy(() => import('./components/JobListing'));
const JobDetails = lazy(() => import('./components/JobDetails'));
const JobPost = lazy(() => import('./components/PostJob'));
const Header2 = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));
const Header = lazy(() => import('./components/Header2'));
const Profile = lazy(() => import('./components/Profile'));
const ProfileCom = lazy(() => import('./components/ProfileCom'));
const CompanyJobs = lazy(() => import('./components/CompanyJobs'));

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
        //    return <Navigate to="/" />;
        // }
        return element;
    };

    return (
        <Router>
            <div className="App">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<> <Header2 /> <Home /> <Footer /> </>} />
                        <Route path="/whoareyou" element={<WhoAreYou setRole={setRole} />} />
                        <Route path="/signup" element={<Signup role={role} />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        {/* Regular User Routes */}
                        <Route path="/joblisting" element={<PrivateRoute element={<> <EmployeeHeader /> <JobListing /> <Footer /> </>} roles={['regular']} />} />
                        <Route path="/job/:id" element={<PrivateRoute element={<> <EmployeeHeader /> <JobDetails /> <Footer /> </>} roles={['regular']} />} />
                        <Route path="/profile" element={<PrivateRoute element={<> <EmployeeHeader /> <Profile /> <Footer /> </>} roles={['regular']} />} />
                        {/* Company User Routes */}
                        <Route path="/post-job" element={<PrivateRoute element={<> <CompanyHeader /> <JobPost /> <Footer /> </>} roles={['company']} />} />
                        <Route path="/profilecom" element={<PrivateRoute element={<> <CompanyHeader /> <ProfileCom /> <Footer /> </>} roles={['company']} />} />
                        <Route path="/company-jobs" element={<PrivateRoute element={<> <CompanyHeader /> <CompanyJobs /> <Footer /> </>} roles={['company']} />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
