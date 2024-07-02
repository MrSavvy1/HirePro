import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JobListing.css';

const JobListing = () => {
		const [jobs, setJobs] = useState([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState('');
		const [searchQuery, setSearchQuery] = useState('');
		const [currentPage, setCurrentPage] = useState(1);
		const jobsPerPage = 10;

		useEffect(() => {
				const fetchJobs = async () => {
						try {
								const response = await axios.get('https://97479fd4-f654-42e0-a2b8-c5d5a0aea58a-00-9ns3ge21fmbs.kirk.replit.dev:5000/api/alljobs');
								if (response.data.success && Array.isArray(response.data.data)) {
										setJobs(response.data.data);
								} else {
										setError('Unexpected data format from API');
								}
						} catch (error) {
								setError('Error fetching jobs');
						} finally {
								setLoading(false);
						}
				};

				fetchJobs();
		}, []);

		if (loading) {
				return <p>Loading...</p>;
		}

		if (error) {
				return <p>{error}</p>;
		}

		const handleSearchChange = (e) => {
				setSearchQuery(e.target.value);
				setCurrentPage(1);
		};

		const filteredJobs = jobs.filter(job => 
				job.available && 
				(job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				job.location.toLowerCase().includes(searchQuery.toLowerCase()))
		);

		const indexOfLastJob = currentPage * jobsPerPage;
		const indexOfFirstJob = indexOfLastJob - jobsPerPage;
		const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
		const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

		const handleNextPage = () => {
				if (currentPage < totalPages) {
						setCurrentPage(currentPage + 1);
				}
		};

		const handlePreviousPage = () => {
				if (currentPage > 1) {
						setCurrentPage(currentPage - 1);
				}
		};

		return (
				<div className="job-listing">
						<div className="job-search">
								<h2>Search</h2>
								<input
										type="text"
										value={searchQuery}
										onChange={handleSearchChange}
										placeholder="Search for jobs by title or location..."
								/>
						</div>
						<div className="job-listing-container">
								<h2>Available Jobs</h2>
								{currentJobs.length === 0 ? (
										<p>No jobs available at the moment.</p>
								) : (
										<div className="job-list">
												{currentJobs.map((job) => (
														<div key={job._id} className="job-item">
																<div className="job-details">
																		<h3>{job.title}</h3>
																		<p><strong>Salary:</strong> {job.salary}</p>
																		<p><strong>Location:</strong> {job.location}</p>
																</div>
																<div className="job-action">
																		<Link to={`/job/${job._id}`} className="view-details-btn">View Details</Link>
																</div>
														</div>
												))}
										</div>
								)}
								<div className="pagination-controls">
										<button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">Previous</button>
										<span>Page {currentPage} of {totalPages}</span>
										<button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn">Next</button>
								</div>
						</div>
				</div>
		);
};

export default JobListing;
