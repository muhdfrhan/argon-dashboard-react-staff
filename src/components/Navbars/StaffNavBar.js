import React from "react";
import { Navbar, Container } from "reactstrap";

const StaffNavbar = () => {
  const username = localStorage.getItem("username") || "Staff";

  return (
    <Navbar className="navbar-top navbar-light bg-primary" expand="md">
      <Container fluid>
        <h4 className="mb-0">{username}</h4>
      </Container>
    </Navbar>
  );
};

export default StaffNavbar;
