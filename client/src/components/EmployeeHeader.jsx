import React from 'react';
import { Link } from 'react-router-dom';

const EmployeeHeader = () => (
		<header>
				<nav>
						<ul>
								<li><Link to="/JobListing">Jobs</Link></li>
								<li><Link to="/AppliedJobs">Applied Jobs</Link></li>
							<li><Link to="/Profile">Profile</Link></li>
						</ul>
				</nav>
		</header>
);

export default EmployeeHeader;
