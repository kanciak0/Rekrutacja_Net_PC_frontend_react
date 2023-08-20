import React from 'react';
import API_BASE_URL from './config';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GetEmployees, CreateEmployee, DeleteEmployee, UpdateEmployee, Login, Register } from './Components/Components';
import Navigation from './Components/Navigation'; // Update the import for Navigation

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/api/Auth/register" element={<Register/>} />
          <Route path="/api/Auth/login" element={<Login/>} />
          <Route path="/api/Employee/GetEmployeeList" element={<GetEmployees />} />
          <Route path="/api/Employee/CreateEmployee" element={<CreateEmployee />}/>
          <Route path="/api/Employee/DeleteEmployee" element = {<DeleteEmployee />}/>
          <Route path="/api/Employee/UpdateEmployee" element = {<UpdateEmployee />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
