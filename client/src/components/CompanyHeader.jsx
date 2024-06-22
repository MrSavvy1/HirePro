import React from 'react';
import { Link } from 'react-router-dom';

const CompanyHeader = () => (
		<header>
				<nav>
						<ul>
								<li><Link to="/PostJob">Post Job</Link></li>
								<li><Link to="/CompanyJobs">Company Jobs</Link></li>
								<li><Link to="/Profile">Profile</Link></li>
						</ul>
				</nav>
		</header>
);

export default CompanyHeader;
