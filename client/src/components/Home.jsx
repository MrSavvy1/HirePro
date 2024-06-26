import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<h1>Welcome to HirePro</h1>
				
			</div>
			<Footer />
		</div>
	);
};

export default Home;
