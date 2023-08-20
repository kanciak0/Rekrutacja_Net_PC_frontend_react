import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/Auth/register`, formData);

      if (response.status === 200) {
        setResponseMessage('Registration successful. You can now log in.');
      } else {
        setResponseMessage('Registration failed. Please check your information.');
      }
    } catch (error) {
      setResponseMessage('Network error or other unexpected error.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
