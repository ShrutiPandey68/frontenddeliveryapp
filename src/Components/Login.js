import React, { useState, useEffect } from 'react';
import "./style.css";
import axios from 'axios';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission's default behavior
    setLoading(true); // Show loading indicator
    setErrorMessage(''); // Clear any previous errors
  
    const userData = {
      email,
      password,
    };
  
    try {
      // Send POST request to the login API
      const response = await axios.post('http://localhost:3001/api/auth/login', userData);
      console.log('Login successful', response);
      // Check if the response includes a token
      if (response.data?.token) {
        console.log('Login successful', response.data);
  
        // Save the token in localStorage
        localStorage.setItem('token', response.data.token);
  
        // Navigate to the dashboard
        window.location.href = '/orders';
      } else {
        throw new Error('Token missing in response');
      }
    } catch (error) {
      // Handle error and show a user-friendly message
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };
  

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-center">Sign In</h3>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Logging in...' : 'Sign In'}
            </button>
          </form>
          <div className="text-center mt-3">
            <p>Don't have an account? <a href="/signin">Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;