// src/components/Headers/FinanceHeader.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FinanceHeader = () => {
  const navigate = useNavigate();
  // Retrieve user's name from localStorage, with a fallback
  const staffName = localStorage.getItem("staffName") || "Finance Staff";

  const handleLogout = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("staffName");
    localStorage.removeItem("userPosition");
    // Redirect to the login page
    navigate('/finance/login');
  };

  return (
    <div className="header bg-success pb-8 pt-5 pt-md-8">
      <div className="container-fluid">
        <div className="header-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-white">Finance Dashboard</h1>
              <p className="text-white mt-2">Welcome, {staffName}. Here's the summary of Zakat disbursements.</p>
            </div>
            <button onClick={handleLogout} className="btn btn-light">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceHeader;