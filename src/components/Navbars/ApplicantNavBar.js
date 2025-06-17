// src/layouts/ApplicantLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import ApplicantSidebar from "components/Sidebar/ApplicantSideBar";
import ApplicantNavbar from "components/Navbars/ApplicantNavBar"; // <-- ADD IMPORT

const ApplicantLayout = () => {
  console.log("ApplicantLayout rendering with Sidebar & Navbar");
  return (
    <>
      <ApplicantSidebar />
      <div> {/* This div will later become .main-content */}
        <ApplicantNavbar brandText="Static Test Title" /> {/* <-- ADD COMPONENT with static prop */}
        <h1>Simplified Applicant Layout Content</h1>
        <Outlet />
      </div>
    </>
  );
};
export default ApplicantLayout;