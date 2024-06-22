import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';
import './JobListing.css';

const JobListing = () => {
		const [jobs, setJobs] = useState([]);
		const [filters, setFilters] = useState({ location: '', experience: '', type: '' });
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const [userRole, setUserRole] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);

		useEffect(() => {
				const token = localStorage.getItem('token');
				if (token) {
						const decodedToken = jwtDecode.default(token);
						if (decodedToken.exp * 1000 > Date.now()) {
								setIsAuthenticated(true);
								setUserRole(decodedToken.role);
						} else {
								localStorage.removeItem('token');
						}
				}
				setLoading(false);
		}, []);

		useEffect(() => {
				const fetchJobs = async () => {
						try {
								const response = await axios.get('/api/jobs');
								setJobs(response.data);
						} catch (err) {
								setError('Error fetching jobs');
						}
				};

				if (isAuthenticated && userRole === 'employee') {
						fetchJobs();
						const intervalId = setInterval(fetchJobs, 5000); // Poll every 5 seconds
						return () => clearInterval(intervalId);
				}
		}, [isAuthenticated, userRole]);

		const handleFilterChange = (e) => {
				setFilters({ ...filters, [e.target.name]: e.target.value });
		};

		const filteredJobs = jobs.filter(job =>
				(filters.location ? job.location === filters.location : true) &&
				(filters.experience ? job.experience === filters.experience : true) &&
				(filters.type ? job.type === filters.type : true)
		);

		if (loading) {
				return <p>Loading...</p>;
		}

		if (error) {
				return <p>{error}</p>;
		}

		return (
				<div className="job-listing-container">
						{isAuthenticated && userRole === 'employee' ? (
								<>
										<div className="filters">
												<h2>Filter Jobs</h2>
												<div className="filter-group">
														<h3>Location</h3>
														<label>
																<input type="radio" name="location" value="Remote" onChange={handleFilterChange} />
																Remote
														</label>
														<label>
																<input type="radio" name="location" value="On-site" onChange={handleFilterChange} />
																On-site
														</label>
												</div>
												<div className="filter-group">
														<h3>Experience Level</h3>
														<label>
																<input type="radio" name="experience" value="Junior" onChange={handleFilterChange} />
																Junior
														</label>
														<label>
																<input type="radio" name="experience" value="Mid" onChange={handleFilterChange} />
																Mid
														</label>
														<label>
																<input type="radio" name="experience" value="Senior" onChange={handleFilterChange} />
																Senior
														</label>
												</div>
												<div className="filter-group">
														<h3>Job Type</h3>
														<label>
																<input type="radio" name="type" value="Full-time" onChange={handleFilterChange} />
																Full-time
														</label>
														<label>
																<input type="radio" name="type" value="Part-time" onChange={handleFilterChange} />
																Part-time
														</label>
														<label>
																<input type="radio" name="type" value="Contract" onChange={handleFilterChange} />
																Contract
														</label>
												</div>
										</div>
										<div className="job-list">
												<h2>Available Jobs</h2>
												{filteredJobs.map(job => (
														<div key={job.id} className="job-item">
																<h3>{job.title}</h3>
																<p>{job.description}</p>
																<Link to={`/job/${job.id}`}>View Details</Link>
																<button>Apply</button>
														</div>
												))}
										</div>
								</>
						) : (
								<p>Please login as an employee to view jobs</p>
						)}
				</div>
		);
};

export default JobListing;
