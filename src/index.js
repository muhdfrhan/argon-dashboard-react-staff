// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import StaffRoutesComponent from "routes/staffRoutes";
import ApplicantRoutesComponent from "routes/applicantRoutes";

// CORRECT: Import the new finance ROUTER, not the individual components
//import FinanceRoutes from 'routes/financeRoutes.js'; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="/staff/*" element={<StaffRoutesComponent />} />
      
      {/* THIS IS NOW THE CORRECT AND COMPLETE INTEGRATION */}
      {/*<Route path="/finance/*" element={<FinanceRoutes />} />*/}

      <Route path="/applicant/*" element={<ApplicantRoutesComponent />} />
      <Route path="*" element={<Navigate to="/staff/login" replace />} />
    </Routes>
  </BrowserRouter>
);