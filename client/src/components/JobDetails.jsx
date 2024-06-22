import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
		const { id } = useParams();
		const [job, setJob] = useState(null);

		useEffect(() => {
				const fetchJobDetails = async () => {
						const response = await axios.get(`/api/jobs/${id}`);
						setJob(response.data);
				};
				fetchJobDetails();
		}, [id]);

		if (!job) return <div>Loading...</div>;

		return (
				<div>
						<h2>{job.title}</h2>
						<p>{job.description}</p>
						<a href={`/company/${job.companyId}`}>View Company Profile</a>
						<form>
								<input type="file" name="resume" />
								<button type="submit">Apply</button>
						</form>
				</div>
		);
};

export default JobDetails;
