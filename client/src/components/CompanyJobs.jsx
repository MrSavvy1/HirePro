import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CompanyJobs.css';

const CompanyJobs = () => {
		const [jobs, setJobs] = useState([]);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);
		const [editingJob, setEditingJob] = useState(null);
		const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
		const [deleteJobId, setDeleteJobId] = useState(null);

		useEffect(() => {
				const fetchCompanyJobs = async () => {
						try {
								const response = await axios.get('/api/company/jobs');
								setJobs(response.data);
								setLoading(false);
						} catch (error) {
								setError('Failed to fetch jobs. Please try again.');
								setLoading(false);
						}
				};
				fetchCompanyJobs();
		}, []);

		const handleDelete = async (id) => {
				try {
						await axios.delete(`/api/jobs/${id}`);
						setJobs(jobs.filter(job => job.id !== id));
						setShowDeleteConfirm(false);
				} catch (error) {
						setError('Failed to delete job. Please try again.');
				}
		};

		const handleEdit = (job) => {
				setEditingJob(job);
		};

		const handleEditChange = (e) => {
				setEditingJob({ ...editingJob, [e.target.name]: e.target.value });
		};

		const handleEditSubmit = async (e) => {
				e.preventDefault();
				try {
						await axios.put(`/api/jobs/${editingJob.id}`, editingJob);
						setJobs(jobs.map(job => job.id === editingJob.id ? editingJob : job));
						setEditingJob(null);
				} catch (error) {
						setError('Failed to update job. Please try again.');
				}
		};

		return (
				<div className="company-jobs-container">
						<h2>Posted Jobs</h2>
						{loading && <p>Loading jobs...</p>}
						{error && <p className="error">{error}</p>}
						<ul>
								{jobs.map(job => (
										<li key={job.id} className="job-item">
												<h3>{job.title}</h3>
												<button onClick={() => { setShowDeleteConfirm(true); setDeleteJobId(job.id); }}>Delete</button>
												<button onClick={() => handleEdit(job)}>Edit</button>
										</li>
								))}
						</ul>

						{showDeleteConfirm && (
								<div className="modal">
										<p>Are you sure you want to delete this job?</p>
										<button onClick={() => handleDelete(deleteJobId)}>Yes</button>
										<button onClick={() => setShowDeleteConfirm(false)}>No</button>
								</div>
						)}

						{editingJob && (
								<div className="modal">
										<form onSubmit={handleEditSubmit}>
												<h2>Edit Job</h2>
												<input
														type="text"
														name="title"
														placeholder="Job Title"
														value={editingJob.title}
														onChange={handleEditChange}
														required
												/>
												<textarea
														name="description"
														placeholder="Job Description"
														value={editingJob.description}
														onChange={handleEditChange}
														required
												/>
												<input
														type="text"
														name="location"
														placeholder="Location"
														value={editingJob.location}
														onChange={handleEditChange}
														required
												/>
												<input
														type="text"
														name="experience"
														placeholder="Experience Level"
														value={editingJob.experience}
														onChange={handleEditChange}
														required
												/>
												<input
														type="text"
														name="type"
														placeholder="Job Type"
														value={editingJob.type}
														onChange={handleEditChange}
														required
												/>
												<input
														type="text"
														name="salary"
														placeholder="Salary Range"
														value={editingJob.salary}
														onChange={handleEditChange}
														required
												/>
												<button type="submit">Update Job</button>
												<button onClick={() => setEditingJob(null)}>Cancel</button>
										</form>
								</div>
						)}
				</div>
		);
};

export default CompanyJobs;
