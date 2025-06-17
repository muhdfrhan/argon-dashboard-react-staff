import React from "react";
import { Outlet } from "react-router-dom";
import StaffNavbar from "components/Navbars/StaffNavBar";
import StaffSidebar from "components/Sidebar/StaffSidebar";
import { Container, Row, Col } from "reactstrap";

const StaffLayout = () => {
  return (
    <>
      <StaffSidebar />
      <div className="main-content">
        <StaffNavbar />
        <Container fluid className="mt-4">
          <Row>
            <Col>
              <Outlet /> {/* Render nested views like StaffDashboard */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default StaffLayout;
