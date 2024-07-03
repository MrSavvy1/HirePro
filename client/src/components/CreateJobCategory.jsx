import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const jobTypes = ['Finance/Sales', 'Administration', 'Law', 'Health', 'Agriculture', 'Engineering', 'Tech'];

const CreateJobCategory = () => {
		const [jobTypeName, setJobTypeName] = useState('');
		const navigate = useNavigate();

		const handleSubmit = async (e) => {
				e.preventDefault();
				const jobCategoryData = { jobTypeName };

				try {
						await axios.post('https://hirepro-s561.onrender.com/api/jobCat/create', jobCategoryData, { withCredentials: true });
						alert('Job category created successfully');
						navigate('/post-job');
				} catch (error) {
						console.error('Error creating job category:', error);
				}
		};

		return (
				<div>
						<h2>Create Job Category</h2>
						<form onSubmit={handleSubmit}>
								<label htmlFor="jobTypeName">Select Job Category:</label>
								<select
										id="jobTypeName"
										value={jobTypeName}
										onChange={(e) => setJobTypeName(e.target.value)}
								>
										<option value="">--Select Category--</option>
										{jobTypes.map((type) => (
												<option key={type} value={type}>
														{type}
												</option>
										))}
								</select>
								<button type="submit">Create</button>
						</form>
				</div>
		);
};

export default CreateJobCategory;
