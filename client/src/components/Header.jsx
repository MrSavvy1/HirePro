import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
		const navigate = useNavigate();

		return (
				<header className="header">
						<div className="logo">
								<Link to="/">
										<img src={logo} alt="HirePro Logo" className="logo-img" />
								</Link>
								<Link to="/">
										<h2>HirePro</h2>
								</Link>
						</div>
						<div className="navigation">
								<button onClick={() => navigate('/whoAreYou')}>Sign Up</button>
								<button onClick={() => navigate('/login')}>Login</button>
						</div>
				</header>
		);
};

export default Header;
