// src/components/Sidebar/ApplicantSidebar.js
import React from "react";
// Import NavLink from react-router-dom and alias it to avoid naming conflict
import { NavLink as RouterNavLink } from "react-router-dom";
import { Nav, NavItem, NavLink as ReactstrapNavLink, Navbar, Container, Collapse } from "reactstrap";
import zakatLogo from "assets/img/zakat-logo.png"; // Your logo

// src/components/Sidebar/ApplicantSidebar.js
// ... other imports
const ApplicantSidebar = () => {
  const applicantRoutes = [
    { path: "/applicant/dashboard", name: "Dashboard", icon: "ni ni-tv-2 text-primary" },
    { path: "/applicant/apply-zakat", name: "Apply for Zakat", icon: "ni ni-fat-add text-success" },
    { path: "/applicant/my-applications", name: "My Applications", icon: "ni ni-bullet-list-67 text-info" }, // <--- ENSURE THIS IS PRESENT
    { path: "/applicant/profile", name: "My Profile", icon: "ni ni-single-02 text-warning" },
  ];
// ... rest of the component

  return (
    <Navbar className="navbar-vertical fixed-left navbar-light bg-white" expand="md" id="applicant-sidenav-main">
      <Container fluid>
        {/* Toggler (optional if always expanded on desktop) */}
        {/* Logo */}
        {/* Use RouterNavLink for the brand link to navigate within the app */}
        <RouterNavLink to="/applicant/dashboard" className="navbar-brand pt-0 d-block mx-auto my-3">
          <img
            alt="Zakat Logo"
            className="navbar-brand-img img-fluid"
            src={zakatLogo}
            style={{ maxHeight: '60px' }} // Adjusted size
          />
        </RouterNavLink>
        {/* User (optional) */}
        {/* Collapse content */}
        <Collapse navbar isOpen={true}> {/* Assuming always open for simplicity */}
          {/* Navigation */}
          <Nav navbar>
            {applicantRoutes.map((route, index) => (
              <NavItem key={index}>
                <ReactstrapNavLink
                  to={route.path}
                  tag={RouterNavLink} // <--- USE THE ALIASED RouterNavLink HERE for react-router-dom functionality
                  // React Router v6 active class handling:
                  // className={({ isActive }) => isActive ? "active nav-link" : "nav-link"}
                  // The default "active" class from react-router-dom v6 should work if your CSS is set up.
                >
                  <i className={route.icon} /> {route.name}
                </ReactstrapNavLink>
              </NavItem>
            ))}
          </Nav>
          {/* Divider */}
          <hr className="my-3" />
          {/* Logout or other utility links */}
          <Nav className="mb-md-3" navbar>
            <NavItem>
              <ReactstrapNavLink
                to="/applicant/logout" // Make sure you have an /applicant/logout route defined
                tag={RouterNavLink}     // <--- USE THE ALIASED RouterNavLink HERE
              >
                <i className="ni ni-user-run text-danger" /> Logout
              </ReactstrapNavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default ApplicantSidebar;