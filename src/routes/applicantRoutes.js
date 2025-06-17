// src/routes/ApplicantRoutes.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ApplicantLogin from "views/Applicant/Login";
import ApplicantDashboard from "views/Applicant/Dashboard";
import ApplicantLayout from "layouts/ApplicantLayout";
import ApplicantLogout from "views/Applicant/Logout";
import ApplyZakat from "views/Applicant/ApplyZakat"; 


const ApplicantRoutes = () => (
  <Routes>
    {/* Routes WITH sidebar, wrapped by ApplicantLayout */}
    <Route path="/" element={<ApplicantLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<ApplicantDashboard />} />
      <Route path="apply-zakat" element={<ApplyZakat />} /> {/* <--- ADD THE ROUTE HERE */} {/* New applications 
      {/* <Route path="my-applications" element={<MyApplications />} /> */} {/* You'll create this later */}
      {/* <Route path="profile" element={<ApplicantProfile />} /> */}
    </Route>

    {/* Standalone routes WITHOUT sidebar */}
    <Route path="login" element={<ApplicantLogin />} />
    <Route path="logout" element={<ApplicantLogout />} />
    {/* <Route path="register" element={<ApplicantRegister />} /> */}
  </Routes>
);

export default ApplicantRoutes;