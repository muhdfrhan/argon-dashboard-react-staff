// src/layouts/ApplicantLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
// import { Container } from "reactstrap"; // Not yet
import ApplicantSidebar from "components/Sidebar/ApplicantSideBar";
import ApplicantNavbar from "components/Navbars/ApplicantNavBar";

const ApplicantLayout = () => {
  console.log("ApplicantLayout: Testing main-content div");
  return (
    <>
      <ApplicantSidebar />
      <div className="main-content" id="applicant-main-content"> {/* <-- ADDED THIS WRAPPER */}
        <ApplicantNavbar brandText="Static Test Title" />
        {/* Remove Argon header and Container for now */}
        <Outlet />
      </div>
    </>
  );
};
export default ApplicantLayout;