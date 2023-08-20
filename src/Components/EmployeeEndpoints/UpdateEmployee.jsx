// UpdateEmployee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const categoryEnumMap = {
  Business: 0,
  Private: 1,
  Other: 2,
};

function UpdateEmployee() {
  const [employeeIdInput, setEmployeeIdInput] = useState(''); // Added input state for employee ID
  const [employeeData, setEmployeeData] = useState({
    name:'',

  });
  const [responseMessage, setResponseMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };
  const handleIdChange = (e) => {
    setEmployeeIdInput(e.target.value);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Set the headers with the token
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', // You might need to set the content type based on your API's requirements
          
        };
        const employeeId = employeeIdInput;
        const payload = {
          details: {
              name: employeeData.detailsName,
              surname: employeeData.detailsSurname,
              email: employeeData.detailsEmail,
              password: employeeData.detailsPassword,
              birthdate: employeeData.detailsBirthdate,
              phoneNumber: employeeData.detailsPhoneNumber,
          },
          contact: {
              category: categoryEnumMap[employeeData.contactCategory], // Map to enum value
              subcategory: employeeData.contactSubcategory,
          }
        };
    try {
      const response = await axios.put(`${API_BASE_URL}/Employee/UpdateEmployee?employeeId=${employeeId}`,
       payload, 
       {
        headers: headers, // Include the headers in the request
    });

      if (response.status === 200) {
        setResponseMessage('Employee updated successfully.');
      }
    } catch (error) {
      setResponseMessage('Network error or other unexpected error.');
    }
  };
  return (
    <div>
      <h2>Update Employee</h2>
      <div>
        <label>Employee ID:</label>
        <input type="text" name="employeeIdInput" value={employeeIdInput} onChange={(e) => setEmployeeIdInput(e.target.value)}  required />
      </div>
      {employeeData && (
        <div>
          {responseMessage && <p>{responseMessage}</p>}
          <form onSubmit={handleUpdate}>
          <div>
                    <label>Name:</label>
                    <input type="text" name="detailsName" value={employeeData.detailsName} onChange={handleChange} required />
                </div>

                <div>
                    <label>Surname:</label>
                    <input type="text" name="detailsSurname" value={employeeData.detailsSurname} onChange={handleChange} required />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="text" name="detailsEmail" value={employeeData.detailsEmail} onChange={handleChange} required />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="text" name="detailsPassword" value={employeeData.detailsPassword} onChange={handleChange} required />
                </div>

                <div>
                    <label>Phone Number:</label>
                    <input type="text" name="detailsPhoneNumber" value={employeeData.detailsPhoneNumber} onChange={handleChange} required />
                </div>

                <div>
                    <label>Birthdate:</label>
                    <input type="text" name="detailsBirthdate" value={employeeData.detailsBirthdate} onChange={handleChange} required />
                </div>

                <div>
                    <label>Contact Category:</label>
                    <select name="contactCategory" value={employeeData.contactCategory} onChange={handleChange} required>
                        <option value="Business">Business</option>
                        <option value="Private">Private</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {employeeData.contactCategory === 'Business' && (
                    <div>
                        <label>Contact Subcategory:</label>
                        <select name="contactSubcategory" value={employeeData.contactSubcategory} onChange={handleChange} required>
                            <option value="boss">Boss</option>
                            <option value="client">Client</option>
                            <option value="management">Management</option>
                        </select>
                    </div>
                )}

                {employeeData.contactCategory === 'Private' && (
                    <div>
                        <label>Contact Subcategory:</label>
                        <input type="text" name="contactSubcategory" value={employeeData.contactSubcategory} onChange={handleChange} required readOnly placeholder='No category input'/>
                    </div>
                )}

                {employeeData.contactCategory === 'Other' && (
                    <div>
                        <label>Contact Subcategory:</label>
                        <input type="text" name="contactSubcategory" value={employeeData.contactSubcategory} onChange={handleChange} />
                    </div>
                )}

            <div>
              <button type="submit">Update Employee</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateEmployee;
