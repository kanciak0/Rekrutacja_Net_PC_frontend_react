import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

function DeleteEmployee() {
  const [employeeId, setEmployeeId] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
         // Get the token from localStorage
         const token = localStorage.getItem('token');

         // Set the headers with the token
         const headers = {
             'Authorization': `bearer ${token}`,
             'Content-Type': 'application/json', // You might need to set the content type based on your API's requirements
         };
    try {
      const response = await axios.delete(`${API_BASE_URL}/Employee/DeleteEmployee/${employeeId}`,{headers : headers});

      if (response.status === 200) {
        setResponseMessage('Employee deleted successfully.');
        setEmployeeId(''); // Clear the input field
      } else {
        setResponseMessage('Error deleting employee.');
      }
    } catch (error) {
      setResponseMessage('Network error or other unexpected error.');
    }
  };

  return (
    <div>
      <h2>Delete Employee</h2>
      {responseMessage && <p>{responseMessage}</p>}
      <form onSubmit={handleDelete}>
        <div>
          <label>Employee ID:</label>
          <input type="text" value={employeeId} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Delete Employee</button>
        </div>
      </form>
    </div>
  );
}

export default DeleteEmployee;