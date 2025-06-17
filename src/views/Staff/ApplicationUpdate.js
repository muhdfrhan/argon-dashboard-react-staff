// src/views/Staff/ApplicationUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container, Row, Col, Card, CardHeader, CardBody, Button, Spinner, Alert,
  Form, FormGroup, Label, Input, InputGroup, InputGroupText
} from 'reactstrap';
import { getStaffApplicationDetail, updateStaffApplication } from '../../apicall';

const ApplicationUpdate = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  
  // FIX: Add approved_amount to our form's state
  const [formData, setFormData] = useState({
    application_status: '',
    status_detail: '',
    officer_remarks: '',
    approved_amount: 0 // Initialize with 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrentData = async () => {
      setLoading(true);
      try {
        const data = await getStaffApplicationDetail(applicationId);
        setApplication(data);
        // Pre-fill the form with existing data from the database
        setFormData({
          application_status: data.application_status || '',
          status_detail: data.status_detail || '',
          officer_remarks: data.officer_remarks || '',
          approved_amount: data.approved_amount || 0 // Pre-fill with existing amount
        });
      } catch (err) {
        setError("Failed to load application data. " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentData();
  }, [applicationId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // FIX: Add validation for the approved amount
    if (formData.application_status === 'Approved' && (!formData.approved_amount || parseFloat(formData.approved_amount) <= 0)) {
      setError('An approved amount greater than zero is required when approving an application.');
      setLoading(false);
      return;
    }

    try {
      // The `formData` now includes the approved_amount if it was entered
      const response = await updateStaffApplication(applicationId, formData);
      navigate(`/staff/applications/detail/${applicationId}`, {
        state: { successMessage: response.message || "Application updated successfully!" }
      });
    } catch (err) {
      setError(err.response?.data?.error || err.message || "An error occurred while updating.");
      setLoading(false);
    }
  };

  if (loading && !application) {
    return <Container className="mt-5 text-center"><Spinner /> <p>Loading application form...</p></Container>;
  }

  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center">
        <Col lg="8" md="10">
          <Card className="shadow">
            <CardHeader>
              <h3 className="mb-0">Update Application: {applicationId}</h3>
              {application && <p className="text-muted mb-0">Applicant: {application.applicant_full_name}</p>}
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="application_status">Application Status</Label>
                  <Input type="select" name="application_status" id="application_status" value={formData.application_status} onChange={handleInputChange} required>
                    <option value="" disabled>Select a Status...</option>
                    <option value="Pending">Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Documents Requested">Documents Requested</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Input>
                </FormGroup>

                {/* --- FIX: CONDITIONALLY RENDER THE AMOUNT INPUT --- */}
                {/* This block will only appear if the staff selects "Approved" */}
                {formData.application_status === 'Approved' && (
                  <FormGroup>
                    <Label for="approved_amount">Approved Disbursement Amount</Label>
                    <InputGroup>
                      <InputGroupText>RM</InputGroupText>
                      <Input
                        type="number"
                        name="approved_amount"
                        id="approved_amount"
                        value={formData.approved_amount}
                        onChange={handleInputChange}
                        placeholder="e.g., 500.00"
                        step="0.01"
                        min="0.01"
                        required
                      />
                    </InputGroup>
                    <small className="form-text text-muted">This is the final amount that will be sent to the finance team for disbursement.</small>
                  </FormGroup>
                )}

                <FormGroup>
                  <Label for="status_detail">Status Detail (Visible to Applicant)</Label>
                  <Input type="text" name="status_detail" id="status_detail" value={formData.status_detail} onChange={handleInputChange} placeholder="e.g., Awaiting income verification" />
                </FormGroup>

                <FormGroup>
                  <Label for="officer_remarks">Officer Remarks (Internal Note)</Label>
                  <Input type="textarea" name="officer_remarks" id="officer_remarks" rows="5" value={formData.officer_remarks} onChange={handleInputChange} placeholder="Add internal notes for auditing..." />
                </FormGroup>
                
                <div className="d-flex justify-content-end mt-4">
                  <Button color="secondary" tag={RouterLink} to={`/staff/applications/detail/${applicationId}`} className="mr-2" disabled={loading}>
                    Cancel
                  </Button>
                  <Button type="submit" color="success" disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationUpdate;