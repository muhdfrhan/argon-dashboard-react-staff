// src/routes/StaffRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import StaffLayout from "layouts/StaffLayout";
import StaffDashboard from "views/Staff/Dashboard";
import Login from "views/Staff/Login";
import StaffLogout from "views/Staff/Logout";
import StaffProfile from "views/Staff/StaffProfile";
import Applicants from "views/Staff/Applicants";
// import Applications from "views/Staff/Applications"; // This was using sample data, replaced by StaffApplicationsList
import ApplicantDetail from 'views/Staff/ApplicantDetail';
import StaffApplicationsList from 'views/Staff/ApplicationList'; // List of applications from API
import StaffApplicationDetail from 'views/Staff/ApplicationDetail'; // Detail of a single application
import ApplicationUpdate from 'views/Staff/ApplicationUpdate';  


const StaffRoutes = () => (
  <Routes>
    {/* Routes that use the StaffLayout (for authenticated staff) */}
    <Route path="/" element={<StaffLayout />}>
      <Route index element={<StaffDashboard />} />
      <Route path="dashboard" element={<StaffDashboard />} />
      <Route path="settings" element={<StaffProfile />} />
      <Route path="applicants" element={<Applicants />} />
      <Route path="applicant-details/:applicantId" element={<ApplicantDetail />} />
      {/* Use StaffApplicationsList for the main applications view */}
      <Route path="applications" element={<StaffApplicationsList />} />
      <Route path="applications/detail/:applicationId" element={<StaffApplicationDetail />} />
      <Route path="applications/update/:applicationId" element={<ApplicationUpdate />} />
      {/*
        The route below was for 'Applications.js' which used sample data.
        It's commented out as StaffApplicationsList (from ApplicationList.js) is the API-driven one.
        <Route path="applications-sample" element={<Applications />} /> // If you want to keep it, give it a distinct path
      */}
    </Route>

    {/* Standalone routes that do NOT use StaffLayout */}
    <Route path="login" element={<Login />} />
    <Route path="logout" element={<StaffLogout />} />
  </Routes>
);

export default StaffRoutes;