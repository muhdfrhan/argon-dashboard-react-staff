// src/layouts/FinanceLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
// FIX: Import FinanceNavbar and FinanceSidebar, not Staff...
import FinanceNavbar from "components/Navbars/FinanceNavBar"; 
import FinanceSidebar from "components/Sidebar/FinanceSideBar";
import { Container } from "reactstrap";

const FinanceLayout = () => {
  return (
    <>
      {/* FIX: Use the correctly named components */}
      <FinanceSidebar />
      <div className="main-content">
        <FinanceNavbar />
        {/* The Outlet will render the current route's component, e.g., FinanceDashboard */}
        <Outlet />
      </div>
    </>
  );
};

// FIX: Change export name for consistency
export default FinanceLayout;