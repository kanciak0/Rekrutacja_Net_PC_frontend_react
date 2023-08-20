
import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config';

const categoryEnumMap = {
    Business: 0,
    Private: 1,
    Other: 2,
};
function CreateEmployee() {
    const [employeeData, setEmployeeData] = useState({
        detailsName: '',
        detailsSurname: '',
        detailsEmail: '',
        detailsPassword: '',
        detailsPhoneNumber: '',
        detailsBirthdate: '',
        contactCategory: '',
        contactSubcategory: '',
    });
    const [responseMessage, setResponseMessage] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData((prevState) => {
          return {
            ...prevState,
            [name]: value,
          }});
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
         // Get the token from localStorage
         const token = localStorage.getItem('token');

         // Set the headers with the token
         const headers = {
             'Authorization': `bearer ${token}`,
             'Content-Type': 'application/json', 
         };
        try {
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

            const response = await axios.post(`${API_BASE_URL}/Employee/CreateEmployee`, payload, {
                headers: headers, // Include the headers in the request
            });
            if (response.status === 200) {
                setEmployeeData({
                    detailsName: '',
                    detailsSurname: '',
                    detailsEmail: '',
                    detailsPassword: '',
                    detailsPhoneNumber: '',
                    detailsBirthdate: '',
                    contactCategory: '',
                    contactSubcategory: '',
                });
                setResponseMessage('Employee created successfully.');
            } else {
                setResponseMessage('Error creating employee. Check Api for more information.');
            }
        } catch (error) {
            setResponseMessage('Unexpected error')
        }
    };

    return (
        <div>
            <h2>Create Employee</h2>
            {responseMessage && <p>{responseMessage}</p>}
            <form onSubmit={handleSubmit}>
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
                    <button type="submit">Create Employee</button>
                </div>
            </form>
        </div>
    );
}

export default CreateEmployee;
