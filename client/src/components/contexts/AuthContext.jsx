import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const [user, setUser] = useState(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState(null);

		const initializeAuth = async () => {
				const token = localStorage.getItem('token');
				if (token) {
						try {
								const decodedToken = jwtDecode.default(token);
								if (decodedToken.exp * 1000 > Date.now()) {
										setIsAuthenticated(true);
										setUser(decodedToken);
								} else {
										localStorage.removeItem('token');
								}
						} catch (err) {
								setError('Invalid token');
						}
				}
				setLoading(false);
		};

		useEffect(() => {
				initializeAuth();
		}, []);

		const login = async (username, password) => {
				try {
						setError(null);
						const response = await axios.post('/api/login', { username, password });
						const { token } = response.data;
						localStorage.setItem('token', token);
						const decodedToken = jwtDecode.default(token);
						setIsAuthenticated(true);
						setUser(decodedToken);
				} catch (error) {
						console.error('Login error:', error);
						setError('Invalid username or password');
						throw error;
				}
		};

		const logout = () => {
				localStorage.removeItem('token');
				setIsAuthenticated(false);
				setUser(null);
		};

		const refreshToken = async () => {
				try {
						setError(null);
						const response = await axios.post('https://8ed859db-3274-42a7-8bfe-0f4fc51860b6-00-1bu3l2l7vxr5i.spock.replit.dev:5000/api/refresh-token', {}, {
								headers: {
										'Authorization': `Bearer ${localStorage.getItem('token')}`
								}
						});
						const { token } = response.data;
						localStorage.setItem('token', token);
						const decodedToken = jwtDecode.default(token);
						setUser(decodedToken);
				} catch (error) {
						console.error('Token refresh error:', error);
						logout();
				}
		};

		useEffect(() => {
				if (isAuthenticated) {
						const token = localStorage.getItem('token');
						const decodedToken = jwtDecode.default(token);
						const tokenExpirationTime = decodedToken.exp * 1000;
						const timeout = tokenExpirationTime - Date.now() - 60000; // Refresh 1 minute before expiry

						const timer = setTimeout(() => {
								refreshToken();
						}, timeout);

						return () => clearTimeout(timer);
				}
		}, [isAuthenticated]);

		return (
				<AuthContext.Provider value={{ isAuthenticated, user, login, logout, error }}>
						{loading ? <div>Loading...</div> : children}
				</AuthContext.Provider>
		);
};

export { AuthProvider, AuthContext };
