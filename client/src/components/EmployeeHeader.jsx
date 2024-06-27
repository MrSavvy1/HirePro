import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeHeader.css'; // Import CSS file for styling
import logo from '../assets/logo.png';

const EmployeeHeader = () => (
		<header className="employee-header">
			<div className="logo">
					<img src={logo} alt="HirePro Logo" className="logo-img" />
				<h2>HirePro</h2>
			</div>

				<nav>
						<ul className="nav-links">
								<li><Link to="/joblisting">Jobs</Link></li>
								<li><Link to="/applied-jobs">Applied Jobs</Link></li>
								<li><Link to="/profile">Profile</Link></li>
						</ul>
				</nav>
		</header>
);

export default EmployeeHeader;
