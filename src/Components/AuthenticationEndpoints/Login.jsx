import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/Auth/Login`, formData);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);

        setResponseMessage('Login successful.');

      } else {
        setResponseMessage('Login failed. Please check your username and password.');
      }
    } catch (error) {
      setResponseMessage('Unexpected error.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;