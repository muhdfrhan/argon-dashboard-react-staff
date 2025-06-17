import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col, CardText, Spinner, Alert } from "reactstrap";
import { getStaffDashboardStats } from '../../apicall'; // Import from apicall.js
import { useNavigate } from 'react-router-dom';

const StaffDashboard = () => {
  const staffName = localStorage.getItem("staffName") || localStorage.getItem("username") || "Staff";
  const [dashboardStats, setDashboardStats] = useState({
    totalApplicationSended: 0,
    totalApplicantsAssigned: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    inReviewApplications: 0,
    rejectedApplications: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStaffDashboardStats();
        setDashboardStats(data);
      } catch (e) {
        console.error("Failed to fetch dashboard data:", e);
        setError(e.message || "Failed to load dashboard data. Please try again later.");
        if (e.message === "No authentication token found." || e.response?.status === 401) {
           // navigate('/staff/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // --- MODIFIED: Added the new card definition ---
  const cardDefinitions = [
    {
      title: "Total Applicants Assigned",
      stateKey: "totalApplicantsAssigned",
      icon: "fas fa-users",
      color: "primary",
      description: "Overall number of applicants assigned to you for review.",
    },
    {
      title: "Total Applications Sent", // The new card
      stateKey: "totalApplicationSended",
      icon: "fas fa-paper-plane",
      color: "info",
      description: "Total applications submitted by all applicants.",
    },
    {
      title: "Pending Applications",
      stateKey: "pendingApplications",
      icon: "fas fa-hourglass-half",
      color: "warning",
      description: "Applications awaiting your review and processing.",
    },
    {
      title: "Approved Applications",
      stateKey: "approvedApplications",
      icon: "fas fa-check-circle",
      color: "success",
      description: "Applications you have successfully approved.",
    },
    {
      title: "In Review Applications",
      stateKey: "inReviewApplications",
      icon: "fas fa-microscope",
      color: "info",
      description: "Applications currently under active review by you.",
    },
    {
      title: "Rejected Applications",
      stateKey: "rejectedApplications",
      icon: "fas fa-times-circle",
      color: "danger",
      description: "Applications you have reviewed and rejected.",
    },
  ];

  // --- MODIFIED: Logic to separate the top two cards from the rest ---
  const topCardTitles = ["Total Applicants Assigned", "Total Applications Sent"];
  const topCards = cardDefinitions.filter(card => topCardTitles.includes(card.title));
  const remainingCardDefs = cardDefinitions.filter(card => !topCardTitles.includes(card.title));

  if (loading) {
    return (
      <Container className="mt-5 text-center" fluid>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-2">Loading dashboard data...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5" fluid>
        <Alert color="danger" className="text-center">
          <h4>Error</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center mb-5">
        <Col lg="10" md="12">
          <Card className="shadow border-0">
            <CardBody className="text-center">
              <h2 className="text-primary">Assalamualaikum, {staffName}!</h2>
              <p className="text-muted mt-2">
                Welcome to your staff dashboard. Here's an overview of the system.
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* --- NEW: Row for the two top cards --- */}
      <Row className="justify-content-center mb-4">
        {topCards.map((cardDef, index) => (
          <Col lg="5" md="6" className="mb-4" key={index}>
            <Card className="card-stats shadow h-100">
              <CardBody>
                <Row>
                  <Col>
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      {cardDef.title}
                    </CardTitle>
                    <span className={`h2 font-weight-bold mb-0 text-${cardDef.color}`}>
                      {dashboardStats[cardDef.stateKey]}
                    </span>
                  </Col>
                  <Col xs="auto">
                    <div className={`icon icon-shape bg-${cardDef.color} text-white rounded-circle shadow`}>
                      <i className={cardDef.icon}></i>
                    </div>
                  </Col>
                </Row>
                <CardText className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-wrap">{cardDef.description}</span>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* --- Row for the remaining status cards --- */}
      <Row>
        {remainingCardDefs.map((cardDef, index) => (
          <Col lg="3" md="6" sm="6" xs="12" className="mb-4" key={index}>
            <Card className="card-stats shadow h-100">
              <CardBody>
                {/* The content here is identical to the top cards */}
                <Row>
                  <Col>
                    <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                      {cardDef.title}
                    </CardTitle>
                    <span className={`h2 font-weight-bold mb-0 text-${cardDef.color}`}>
                      {dashboardStats[cardDef.stateKey]}
                    </span>
                  </Col>
                  <Col xs="auto">
                    <div className={`icon icon-shape bg-${cardDef.color} text-white rounded-circle shadow`}>
                      <i className={cardDef.icon}></i>
                    </div>
                  </Col>
                </Row>
                <CardText className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-wrap">{cardDef.description}</span>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StaffDashboard;