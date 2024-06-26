import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyHeader.css';


const CompanyHeader = () => (
		<header className="company-header">
			<div className="logo">
				<h2>HirePro</h2>
			</div>

				<nav>
						<ul className="nav-links">
								<li><Link to="/PostJob">Post Job</Link></li>
								<li><Link to="/CompanyJobs">Company Jobs</Link></li>
								<li><Link to="/Profile">Profile</Link></li>
						</ul>
				</nav>
		</header>
);

export default CompanyHeader;