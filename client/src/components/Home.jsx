import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import home from '../assets/Home.png';
import employ from '../assets/employ.jpeg';
import job from '../assets/job.jpeg';
import light from '../assets/light.png';
import './Home.css';

const Home = () => {
	const navigate = useNavigate();

	return (
		<div className="container">
			
			<div className="content">
				<div className="div1"> 
					<div className="div11">
				<h3> Seamless Job Hunt</h3>
					<p>....better at meeting dreams and fulfilling desires. Dream jobs aren't found, they're created. Stay persistent, stay hopeful, and craft the career you envision</p>
						</div>
				</div>

				<div className="div2"> 
					<img src={employ} alt="employ" />
					<img src={job} alt="job" />
					

				</div>

				<div className="div3"> 
					
					<img src={light} alt="light" />
						

				</div>

				<div class="join-us-container">
						<h1>Why You Need to Join Us</h1>
						<p class="message">
								At HirePro, we believe in connecting talented individuals with opportunities that align with their passions. Our platform is designed to make your job search seamless and efficient. Join us today and take the first step towards your dream career!
						</p>
					<button className="join-button" onClick={() => navigate('/whoAreYou')}>Join Now</button>
				</div>
				
			</div>
			
		</div>
	);
};

export default Home;
