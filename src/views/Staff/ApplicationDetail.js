// src/views/Staff/ApplicationDetail.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Container, Row, Col, Card, CardHeader, CardBody, Button, Spinner, Alert,
  ListGroup, ListGroupItem, Badge, Modal, ModalHeader, ModalBody,
  Table // <-- 1. IMPORT TABLE
} from 'reactstrap';
import { getStaffApplicationDetail } from '../../apicall';
import ScoringEngineWidget from 'components/scoringEngineWidget';

// Define your backend URL for constructing download links
const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const StaffApplicationDetail = () => {
  const { applicationId } = useParams();
  const location = useLocation();

  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const toggleModal = () => setModalOpen(!modalOpen);

  const openImageInModal = (docPath) => {
    if (!docPath) return;
    const fullUrl = `${BACKEND_URL}/${docPath}`;
    setCurrentImage(fullUrl);
    setModalOpen(true);
  };

  const handleViewDocument = (doc) => {
    if (!doc || !doc.file_path) return;
    const fullUrl = `${BACKEND_URL}/${doc.file_path}`;
    if (doc.mime_type === 'application/pdf' || doc.file_name.toLowerCase().endsWith('.pdf')) {
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    } else {
      openImageInModal(doc.file_path);
    }
  };

  const fetchApplicationData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStaffApplicationDetail(applicationId);
      setApplication(data);
      if (data.documents && Array.isArray(data.documents)) {
        setDocuments(data.documents);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      console.error(`Failed to fetch details for application ${applicationId}:`, err);
      setError(err.message || "Could not load application details.");
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);
      window.history.replaceState({}, document.title);
    }
    fetchApplicationData();
  }, [fetchApplicationData, location.state]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <Badge color="success" pill>{status}</Badge>;
      case 'Pending': return <Badge color="warning" pill>{status}</Badge>;
      case 'In Review': return <Badge color="info" pill>{status}</Badge>;
      case 'Rejected': return <Badge color="danger" pill>{status}</Badge>;
      default: return <Badge color="secondary" pill>{status || 'N/A'}</Badge>;
    }
  };

  const getFileName = (path) => {
    if (!path) return 'Unnamed File';
    return path.split('/').pop().split('\\').pop();
  };

  const getDocumentIcon = (doc) => {
    if (doc.mime_type === 'application/pdf' || doc.file_name?.toLowerCase().endsWith('.pdf')) {
      return 'fas fa-file-pdf text-danger';
    }
    if (doc.mime_type?.startsWith('image/')) {
      return 'fas fa-file-image text-success';
    }
    return 'fas fa-file-alt text-primary';
  };

  if (loading && !application) {
    return (
      <Container className="mt-5 text-center" fluid>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-2">Loading application details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5" fluid>
        <Alert color="danger" className="text-center">
          <h4>Error Loading Application Details</h4>
          <p>{error}</p>
          <Button tag={RouterLink} to="/staff/applications" color="secondary">Back to Applications List</Button>
        </Alert>
      </Container>
    );
  }

  if (!application) {
    return null; // or a not found component
  }

  return (
    <>
      <Container className="mt-5" fluid>
        <Row className="justify-content-center">
          <Col lg="10" md="12">
          <ScoringEngineWidget scoreData={application.scoreData} />
            {/* Main Application Card */}
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Application Details: {application.application_id}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button tag={RouterLink} to="/staff/applications" color="info" size="sm" className="mr-2">
                      <i className="fas fa-arrow-left mr-1"></i>Back to List
                    </Button>
                    <Button color="primary" size="sm" tag={RouterLink} to={`/staff/applications/update/${applicationId}`}>
                      <i className="fas fa-edit mr-1"></i>Update Status
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {successMessage && <Alert color="success" toggle={() => setSuccessMessage(null)}>{successMessage}</Alert>}

                <h6 className="heading-small text-muted mb-3">Application Information</h6>
                <ListGroup flush className="mb-4">
                  <ListGroupItem><strong>Application ID:</strong> {application.application_id}</ListGroupItem>
                  <ListGroupItem><strong>Category:</strong> {application.category_name || 'N/A'}</ListGroupItem>
                  <ListGroupItem><strong>Submission Date:</strong> {formatDate(application.submission_date)}</ListGroupItem>
                  <ListGroupItem><strong>Current Status:</strong> {getStatusBadge(application.application_status)}</ListGroupItem>
                  <ListGroupItem><strong>Status Detail:</strong> {application.status_detail || 'N/A'}</ListGroupItem>
                  <ListGroupItem><strong>Last Updated:</strong> {formatDate(application.last_updated)}</ListGroupItem>
                </ListGroup>

                <h6 className="heading-small text-muted mb-3">Applicant Information</h6>
                <ListGroup flush className="mb-4">
                    <ListGroupItem><strong>Applicant Name:</strong> {application.applicant_full_name || 'N/A'}</ListGroupItem>
                    <ListGroupItem><strong>Applicant NRIC:</strong> {application.applicant_nric || 'N/A'}</ListGroupItem>
                    <ListGroupItem><strong>Applicant Email:</strong> {application.applicant_email || 'N/A'}</ListGroupItem>
                    <ListGroupItem><strong>Applicant Phone:</strong> {application.applicant_phone || 'N/A'}</ListGroupItem>
                    <ListGroupItem><strong>Date of Birth:</strong> {formatDate(application.applicant_dob)}</ListGroupItem>
                    <ListGroupItem><strong>Address:</strong> {application.applicant_address || 'N/A'}</ListGroupItem>
                    <ListGroupItem><strong>Reported Salary:</strong> {application.applicant_base_salary ? `RM ${parseFloat(application.applicant_base_salary).toFixed(2)}` : 'N/A'}</ListGroupItem>
                    <ListGroupItem><strong>Marital Status:</strong> {application.applicant_marital_status || 'N/A'}</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>

            {/* --- 2. NEW CARD FOR HOUSEHOLD & DEPENDENTS --- */}
            <Card className="shadow mt-4">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Household & Dependents Information</h3>
              </CardHeader>
              <CardBody>
                {/* Spouse Details */}
                <h6 className="heading-small text-muted mb-3">Spouse Details</h6>
                {application.spouse_name ? (
                  <ListGroup flush className="mb-4">
                    <ListGroupItem><strong>Name:</strong> {application.spouse_name}</ListGroupItem>
                    <ListGroupItem><strong>Employment Status:</strong> {application.spouse_employment_status || 'N/A'}</ListGroupItem>
                  </ListGroup>
                ) : (
                  <p className="text-muted">No spouse information provided.</p>
                )}
                
                {/* Dependents Details */}
                <h6 className="heading-small text-muted mb-3 mt-4">Dependents List</h6>
                {application.dependents && application.dependents.length > 0 ? (
                  <Table className="align-items-center table-flush" responsive striped>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Relationship</th>
                        <th scope="col">Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {application.dependents.map((dependent, index) => (
                        <tr key={dependent.dependent_id}>
                          <td>{index + 1}</td>
                          <td>{dependent.name}</td>
                          <td>{dependent.relationship}</td>
                          <td>{dependent.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p className="text-muted">No dependents were listed for this application.</p>
                )}
              </CardBody>
            </Card>

            {/* Existing Documents and Staff Remarks Card */}
            <Card className="shadow mt-4">
              <CardHeader className="bg-white border-0">
                <h3 className="mb-0">Documents & Staff Remarks</h3>
              </CardHeader>
              <CardBody>
                <h6 className="heading-small text-muted mb-3">Uploaded Documents</h6>
                {documents.length > 0 ? (
                  <ListGroup flush className="mb-4">
                    {documents.map((doc) => (
                      <ListGroupItem key={doc.document_id} className="px-0">
                        <Button color="link" onClick={() => handleViewDocument(doc)} className="d-flex align-items-center p-0 text-left" title={`View ${doc.file_name}`}>
                          <i className={`${getDocumentIcon(doc)} mr-3`} style={{ fontSize: '1.2rem' }}></i>
                          <span className="flex-grow-1">{doc.file_name}</span>
                          <span className="ml-3 text-muted"><i className="fas fa-eye mr-1"></i> View</span>
                        </Button>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                ) : <p>No documents were uploaded for this application.</p>}
                
                 <h6 className="heading-small text-muted mb-3 mt-4">Assigned Staff</h6>
                <ListGroup flush className="mb-4">
                  <ListGroupItem><strong>Assigned To:</strong> {application.assigned_staff_name || 'N/A'}</ListGroupItem>
                  <ListGroupItem><strong>Officer Remarks:</strong> <pre style={{whiteSpace: "pre-wrap", fontFamily: "inherit"}}>{application.officer_remarks || 'N/A'}</pre></ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <Modal isOpen={modalOpen} toggle={toggleModal} size="xl" centered>
        <ModalHeader toggle={toggleModal}>Image Viewer - {getFileName(currentImage)}</ModalHeader>
        <ModalBody className="text-center">
          <img src={currentImage} alt="Zakat application document" style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default StaffApplicationDetail;