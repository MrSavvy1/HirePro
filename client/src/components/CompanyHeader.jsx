import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyHeader.css';
import logo from '../assets/logo.png'; 


const CompanyHeader = () => (
		<header className="company-header">
			<div className="logo">
				<img src={logo} alt="HirePro Logo" className="logo-img" />
				<h2>HirePro</h2>
			</div>

				<nav>
						<ul className="nav-links">
								<li><Link to="/post-job">Post-Job</Link></li>
								<li><Link to="/company-jobs">Applied-Jobs</Link></li>
								<li><Link to="/profilecom">Profile</Link></li>
						</ul>
				</nav>
		</header>
);

export default CompanyHeader;