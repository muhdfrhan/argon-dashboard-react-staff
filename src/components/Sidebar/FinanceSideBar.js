// src/components/Sidebar/FinanceSideBar.js
import React from "react";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Container,
  Collapse,
} from "reactstrap";
import zakatLogo from "assets/img/zakat-logo.png";

// FIX: Rename component from StaffSidebar to FinanceSidebar
const FinanceSidebar = () => {
  const navigate = useNavigate();

  // FIX: Create a proper logout handler
  const handleLogout = (e) => {
    e.preventDefault(); // Prevent default NavLink behavior
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("staffName");
    localStorage.removeItem("userPosition");
    navigate('/finance/login');
  };

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md">
      <Container fluid>
        <img
          src={zakatLogo}
          alt="Zakat Logo"
          className="img-fluid d-block mx-auto my-3"
          style={{ maxWidth: "120px", height: "auto" }}
        />
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            <NavItem>
              {/* FIX: Correct path to the finance dashboard */}
              <NavLink to="/finance/disbursements" tag={RRNavLink}>
                <i className="ni ni-tv-2 text-primary" /> Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/finance/manage-disbursements" tag={RRNavLink}>
                <i className="ni ni-collection text-success" /> Manage Disbursements
              </NavLink>
            </NavItem>
            <NavItem>
              {/* FIX: Placeholder for a future finance profile page */}
              <NavLink to="/finance/profile" tag={RRNavLink}>
                <i className="ni ni-single-02 text-yellow" /> My Profile
              </NavLink>
            </NavItem>
          </Nav>
          {/* Logout Button */}
          <hr className="my-3" />
          <Nav className="mb-md-3" navbar>
             <NavItem>
                {/* FIX: Use an onClick handler for the logout action */}
               <NavLink href="#" onClick={handleLogout}>
                 <i className="ni ni-user-run text-info" />
                 <span>Logout</span>
               </NavLink>
             </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

// FIX: Export the correctly named component
export default FinanceSidebar;