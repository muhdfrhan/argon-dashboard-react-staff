// src/views/Applicant/Dashboard.js
import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

const ApplicantDashboard = () => {
  const applicantName = localStorage.getItem("applicantName") || "Applicant";
  return (
    <>
      {/* Header is now part of ApplicantLayout */}
      {/* Page content */}
      <Container fluid /* className="mt--7" - This class is now in ApplicantLayout */ >
        <Row>
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Welcome, {applicantName}!</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <p>This is your applicant dashboard. From here you can manage your applications, view your profile, and more.</p>
                {/* Add dashboard content here */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ApplicantDashboard;