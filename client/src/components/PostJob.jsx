import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostJob.css';

const predefinedJobTypes = ['Finance/Sales', 'Administration', 'Law', 'Health', 'Agriculture', 'Engineering', 'Tech'];

const PostJob = () => {
		const [jobDetails, setJobDetails] = useState({
				title: '',
				description: '',
				location: '',
				available: true, 
				salary: '',
				datePosted: '',
				applicationDeadline: '',
				jobCategory: ''
		});
		const [existingJobCategories, setExistingJobCategories] = useState([]);

		useEffect(() => {
				
				const fetchJobCategories = async () => {
						try {
								const response = await axios.get('https://bc31de55-c8d5-4f5a-985d-ea51ad50d9c5-00-g9e9jj3pmgbl.worf.replit.dev:5000/api/jobCat/all');
								setExistingJobCategories(response.data.allCat);
						} catch (error) {
								console.error('Error fetching job categories:', error);
						}
				};

				fetchJobCategories();
		}, []);

		const handleChange = (e) => {
				const { name, value, type, checked } = e.target;
				const val = type === 'checkbox' ? checked : value;
				setJobDetails({
						...jobDetails,
						[name]: val
				});
		};

		const handleSubmit = async (e) => {
				e.preventDefault();
				const selectedCategory = jobDetails.jobCategory;

				try {
						let categoryId = existingJobCategories.find(cat => cat.jobTypeName === selectedCategory)?._id;

						
						if (!categoryId) {
							
								const response = await axios.post('https://bc31de55-c8d5-4f5a-985d-ea51ad50d9c5-00-g9e9jj3pmgbl.worf.replit.dev:5000/api/jobCat/create', { jobTypeName: selectedCategory });
								categoryId = response.data._id;
								alert(`Job category '${selectedCategory}' created successfully`);

								
								const allCategoriesResponse = await axios.get('https://bc31de55-c8d5-4f5a-985d-ea51ad50d9c5-00-g9e9jj3pmgbl.worf.replit.dev:5000/api/jobCat/all');
								setExistingJobCategories(allCategoriesResponse.data.allCat);
						}


						const jobData = { ...jobDetails, jobCategory: categoryId };
						await axios.post('https://bc31de55-c8d5-4f5a-985d-ea51ad50d9c5-00-g9e9jj3pmgbl.worf.replit.dev:5000/api/jobs', jobData);
						alert('Job posted successfully');

					setJobDetails({
							title: '',
							description: '',
							location: '',
							available: true,
							salary: '',
							datePosted: '',
							applicationDeadline: '',
							jobCategory: ''
					});
				} catch (error) {
						console.error('Error posting job:', error);
				}
		};

		const mergedJobTypes = [
				...predefinedJobTypes,
				...existingJobCategories.map(cat => cat.jobTypeName).filter(cat => !predefinedJobTypes.includes(cat))
		];

		return (
		
			<div className="post-job">
				<div className="post-job-container">
						<h2>Post a Job</h2>
						<form onSubmit={handleSubmit}>
							<div>
								<label>Title:</label>
								<input type="text" name="title" value={jobDetails.title} onChange={handleChange} />
								</div>

							<div>
								<label>Description:</label>
								<textarea name="description" value={jobDetails.description} onChange={handleChange}></textarea>
								</div>

							<div>
								<label>Location:</label>
								<input type="text" name="location" value={jobDetails.location} onChange={handleChange} />
								</div>
								<div>
								<label>Available:</label>
								<input type="checkbox" name="available" checked={jobDetails.available} onChange={handleChange} />
									</div>
									<div>
								<label>Salary:</label>
								<input type="number" name="salary" value={jobDetails.salary} onChange={handleChange} />
										</div>

							<div>
								<label>Date Posted:</label>
								<input type="date" name="datePosted" value={jobDetails.datePosted} onChange={handleChange} />
								</div>

							<div>
								<label>Application Deadline:</label>
								<input type="date" name="applicationDeadline" value={jobDetails.applicationDeadline} onChange={handleChange} />
								</div>

							<div>
								<label>Job Category:</label>
								<select name="jobCategory" value={jobDetails.jobCategory} onChange={handleChange}>
										<option value="">--Select Category--</option>
										{mergedJobTypes.map(type => (
												<option key={type} value={type}>{type}</option>
				
										))}
								</select>
								</div>

								<button type="submit">Post Job</button>
						</form>
				</div>
			</div>
		);
};

export default PostJob;
