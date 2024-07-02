import React from 'react';
import Header from './Header';
import Footer from './Footer';
import home from '../assets/Home.png';
import './Home.css';

const Home = () => {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<img src={home} alt="home pic" className="home-img" />

			</div>
			<Footer />
		</div>
	);
};

export default Home;
