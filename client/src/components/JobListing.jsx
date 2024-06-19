import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JobListing.css';
const JobListing = () => {
		const [jobs, setJobs] = useState([]);
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const [userRole, setUserRole] = useState(null);
		useEffect(() => {
				// Check for token and user role
				const token = localStorage.getItem('token');
				if (token) {
						setIsAuthenticated(true);
						const decodedToken = jwt_decode(token);
						setUserRole(decodedToken.role);
				}
		}, []);
		useEffect(() => {
				const fetchJobs = async () => {
						const response = await axios.get('/api/jobs');
						setJobs(response.data);
				};
				// Only fetch jobs if the user is authenticated as an employee
				if (isAuthenticated && userRole === 'employee') {
						fetchJobs();
				}
		}, [isAuthenticated, userRole]);
		return (
				<div className="job-listing-container">
						{isAuthenticated && userRole === 'employee' && (
								<>
										<h2>Available Jobs</h2>
										<ul>
												{jobs.map(job => (
														<li key={job.id}>
																<h3>{job.title}</h3>
																<p>{job.description}</p>
																<button>Apply</button>
														</li>
												))}
										</ul>
								</>
						)}
						{!isAuthenticated && <p>Please login as an employee to view jobs</p>}
				</div>
		);
};
export default JobListing;