import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = ({ role }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			console.log(`Role: ${role}`);
			console.log("FormData:", formData);
			await axios.post(`https://8ed859db-3274-42a7-8bfe-0f4fc51860b6-00-1bu3l2l7vxr5i.spock.replit.dev:5000/api/auth/signup/${role.toLowerCase()}`, formData);
			navigate("/login");
		} catch (err) {
			console.error("Signup error:", err);
			setError("An error occurred during signup");
		}
	};

	return (
		<div className="signup-container">
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			
			<form onSubmit={handleSubmit} className="form-container">
				<h2>Signup as {role}</h2>
=======
			<h2>Signup as {role}</h2>
			<form onSubmit={handleSubmit}>
>>>>>>> parent of ca3cecf (sign up and login fully functional now included color)
=======
			<h2>Signup as {role}</h2>
			<form onSubmit={handleSubmit}>
>>>>>>> parent of ca3cecf (sign up and login fully functional now included color)
=======
			<h2>Signup as {role}</h2>
			<form onSubmit={handleSubmit}>
>>>>>>> parent of ca3cecf (sign up and login fully functional now included color)
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<input
					type="password"
					name="confirmPassword"
					placeholder="Confirm Password"
					value={formData.confirmPassword}
					onChange={handleChange}
					required
				/>
				<button type="submit">Signup</button>
			</form>
			{error && <p className="error">{error}</p>}
		</div>
	);
};

export default Signup;
