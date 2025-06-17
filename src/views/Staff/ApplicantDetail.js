// src/views/Staff/ApplicantDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Button,
  Spinner,
  Alert,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { getSingleApplicantDetails } from '../../apicall';

const ApplicantDetail = () => {
  const { applicantId } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicantData = async () => {
      if (!applicantId) {
        setError("Applicant ID not found in URL.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const data = await getSingleApplicantDetails(applicantId);
        setApplicant(data);
      } catch (err) {
        console.error(`Failed to fetch details for applicant ${applicantId}:`, err);
        setError(err.message || "Could not load applicant details.");
        if (err.message === "No authentication token found." || err.response?.status === 401) {
          // Optionally navigate to login page
          // navigate('/login');
        } else if (err.response?.status === 404) {
            setError("Applicant not found.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplicantData();
  }, [applicantId]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center" fluid>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-2">Loading applicant details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5" fluid>
        <Alert color="danger" className="text-center">
          <h4>Error Loading Details</h4>
          <p>{error}</p>
          <Button tag={RouterLink} to="/staff/applicants" color="secondary">Back to Applicants List</Button>
        </Alert>
      </Container>
    );
  }

  if (!applicant) {
    return (
      <Container className="mt-5" fluid>
        <Alert color="warning" className="text-center">Applicant data not available.</Alert>
         <Button tag={RouterLink} to="/staff/applicants" color="secondary">Back to Applicants List</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center">
        <Col lg="9" md="10">
          <Card className="shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Applicant Details: {applicant.full_name}</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Button tag={RouterLink} to="/staff/applicants" color="info" size="sm">
                    <i className="fas fa-arrow-left mr-2"></i>Back to List
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="6">
                  <h6 className="heading-small text-muted mb-3">Personal Information</h6>
                  <ListGroup flush>
                    <ListGroupItem>
                      <strong>Applicant ID:</strong> {applicant.applicant_id}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Full Name:</strong> {applicant.full_name}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>NRIC:</strong> {applicant.nric}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Date of Birth:</strong> {formatDate(applicant.date_of_birth)}
                    </ListGroupItem>
                     <ListGroupItem>
                      <strong>Marital Status:</strong> {applicant.marital_status || 'N/A'}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
                <Col md="6" className="mt-4 mt-md-0">
                  <h6 className="heading-small text-muted mb-3">Contact & Financial Information</h6>
                  <ListGroup flush>
                    <ListGroupItem>
                      <strong>Email:</strong> {applicant.email}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Phone:</strong> {applicant.phone}
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Address:</strong>
                      <CardText className="mt-1" style={{ whiteSpace: 'pre-line' }}>
                        {applicant.address || 'N/A'}
                      </CardText>
                    </ListGroupItem>
                    <ListGroupItem>
                      <strong>Salary:</strong> {applicant.salary ? `RM ${parseFloat(applicant.salary).toFixed(2)}` : 'N/A'}
                    </ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicantDetail;