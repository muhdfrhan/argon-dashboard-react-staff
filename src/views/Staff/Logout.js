// src/views/Staff/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

const StaffLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutTimer = setTimeout(() => {
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('authToken'); // Ensure authToken is cleared
      localStorage.removeItem('staffName'); // Ensure staffName is cleared
      // localStorage.removeItem('userId'); // Clear if you were using it

      navigate('/staff/login');
    }, 1500);

    return () => clearTimeout(logoutTimer);

  }, [navigate]);

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-secondary">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="shadow border-0">
              <CardBody className="px-lg-5 py-lg-5 text-center">
                <div className="mb-4">
                  <i className="fas fa-spinner fa-spin fa-3x text-primary mb-3"></i>
                  <h2 className="text-muted">Logging out...</h2>
                  <p className="text-sm text-muted">
                    Please wait while we securely log you out.
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

export default StaffLogout;