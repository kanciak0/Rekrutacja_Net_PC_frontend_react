// GetEmployees.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

function GetEmployees() {
  const [employeeIds, setEmployeeIds] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    // Fetch the list of employee IDs when the component mounts
    fetchEmployeeIds();
  }, []);

  const fetchEmployeeIds = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Employee/GetEmployeeList`);
      if (response.status === 200) {
        setEmployeeIds(response.data);
      } else {

        console.error('Error fetching employee IDs');
      }
    } catch (error) {

      console.error('Other error:', error);
    }
  };

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Employee/GetEmployeeDetails/${employeeId}`);
      if (response.status === 200) {
        setSelectedEmployee(response.data);
      } else {
        console.error('Error fetching employee details');
      }
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <ul>
        {employeeIds.map((employeeId) => (
          <li key={employeeId.id}>
            <button onClick={() => fetchEmployeeDetails(employeeId.id)}>View Details</button>
            {employeeId.id}
          </li>
        ))}
      </ul>
      {selectedEmployee && (
        <div>
          <h2>Employee Details</h2>
          <pre>{JSON.stringify(selectedEmployee, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default GetEmployees;
