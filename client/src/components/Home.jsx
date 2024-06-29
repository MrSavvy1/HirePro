import React from 'react';
import Header from './Header';
import Footer from './Footer';
import home from '../assets/Home.png';


const Home = () => {
	return (
		<div className="container">
			<Header />
			<div className="content">
				<img src={home} alt="home pic" className="home-img" />
				<div className="home-content">
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Home;
