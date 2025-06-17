// components/Sidebar/StaffSidebar.js
import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  Container,
  Collapse,
} from "reactstrap";
import zakatLogo from "assets/img/zakat-logo.png";


const StaffSidebar = () => {
  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md">
      <Container fluid>

        {/* Zakat Logo */}
        <img
          src={zakatLogo}
          alt="Zakat Logo"
          className="img-fluid d-block mx-auto my-3"
          style={{ maxWidth: "120px", height: "auto" }}
        />
        <Collapse navbar isOpen={true}>
          <Nav navbar>
            <NavItem>
              {/* Corrected path to be lowercase "dashboard" */}
              <NavLink 
                to="/staff/dashboard" 
                tag={RRNavLink} 
                // For React Router v6, active class is often handled like this:
                // className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
                // Or rely on default 'active' class if your CSS handles it.
                // activeClassName="active" is more of a v5 pattern.
              >
                <i className="ni ni-tv-2 text-primary" /> Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/staff/applicants" tag={RRNavLink}>
                <i className="ni ni-single-02 text-blue" /> Applicants
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/staff/applications" tag={RRNavLink}>
                <i className="ni ni-single-copy-04 text-blue" /> Applications
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/staff/reports" tag={RRNavLink}>
                <i className="ni ni-chart-bar-32 text-green" /> Reports
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/staff/settings" tag={RRNavLink}>
                <i className="ni ni-circle-08 text-orange" /> Staff Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/staff/logout" tag={RRNavLink}>
                <i className="ni ni-user-run text-orange" /> Logout
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default StaffSidebar;