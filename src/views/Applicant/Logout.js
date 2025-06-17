// src/views/Applicant/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap'; // For styling consistency

const ApplicantLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a slight delay for the "Logging out..." message to be visible
    const logoutTimer = setTimeout(() => {
      // Perform logout actions for an applicant:
      // 1. Clear applicant-specific authentication items from localStorage
      localStorage.removeItem('role');         // Common role identifier
      localStorage.removeItem('applicantId');  // Specific to applicant
      localStorage.removeItem('applicantName'); // Specific to applicant
      // If you were using a JWT token, you'd remove that too:
      // localStorage.removeItem('token');

      // 2. (Optional) If you have global state management (Context, Redux),
      // dispatch an action to update the auth state for the applicant.

      // 3. Redirect the user to the applicant login page
      navigate('/applicant/login');

    }, 1500); // 1.5-second delay, adjust as needed

    // Cleanup timer if the component unmounts before timeout
    return () => clearTimeout(logoutTimer);

  }, [navigate]); // navigate is a dependency of this effect

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5 text-center">
                <div className="mb-4">
                  {/* Font Awesome Spinner */}
                  <i className="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
                  <h2 className="text-muted">Logging out...</h2>
                  <p className="text-sm text-muted">
                    Please wait while we securely log you out from the applicant portal.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplicantLogout;