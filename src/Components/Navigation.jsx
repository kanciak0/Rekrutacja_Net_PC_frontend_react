import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token)},
    []);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/api/Auth/register">Register</Link>
        </li>
        <li>
          <Link to="/api/Auth/login">Login</Link>
        </li>
        <li>
          <Link to="/api/Employee/GetEmployeeList">Get Employees</Link>
        </li>
        {token &&
        <>
        <li>
          <Link to="api/Employee/CreateEmployee">Create Employee</Link>
        </li>
        <li>
          <Link to="api/Employee/DeleteEmployee">Delete Employee</Link>
          </li>
          <li>
          <Link to="api/Employee/UpdateEmployee">Update Employee</Link>
          </li>
          </>
        }
      </ul>
    </nav>
  );
};

export default Navigation;