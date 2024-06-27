import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'; // Adjust path and file extension as per your actual logo file

const Header = () => {
		const navigate = useNavigate();

		return (
				<header className="header">
						<div className="logo">
								<img src={logo} alt="HirePro Logo" className="logo-img" />
							<h2>HirePro</h2>
						</div>
						<div className="navigation">
								<button onClick={() => navigate('/whoAreYou')}>Sign Up</button>
								<button onClick={() => navigate('/login')}>Login</button>
						</div>
				</header>
		);
};

export default Header;
