// src/components/Navbars/FinanceNavBar.js
import React from "react";
import { Navbar, Container, Nav, NavItem } from "reactstrap";

// FIX: Rename component from StaffNavbar to FinanceNavbar
const FinanceNavbar = () => {
  const staffName = localStorage.getItem("staffName") || "Finance Staff";

  return (
    // Removed bg-primary for a more standard look, can be customized
    <Navbar className="navbar-top navbar-dark bg-success" expand="md" id="navbar-main">
      <Container fluid>
        {/* You can add breadcrumbs or page titles here in the future */}
        <span className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
          Finance Portal
        </span>
        {/* Example of showing user name in top right */}
        <Nav className="align-items-center d-none d-md-flex" navbar>
          <NavItem>
            <span className="mb-0 text-sm font-weight-bold text-white">
              Welcome, {staffName}
            </span>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

// FIX: Export the correctly named component
export default FinanceNavbar;