// src/views/Applicant/ApplyZakat.js
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label, // For better accessibility with form controls
  Alert
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

// Sample Zakat programs - in a real app, this might come from an API
const zakatPrograms = [
  "Zakat Asnaf Fakir Miskin (Needy & Poor)",
  "Bantuan Pendidikan Zakat (Education Aid)",
  "Bantuan Perubatan Zakat (Medical Aid)",
  "Bantuan Gharimin (Debt Relief)",
  "Bantuan Musafir (Stranded Traveler Aid)",
  "Lain-lain (Others - Please Specify)"
];

const ApplyZakat = () => {
  const navigate = useNavigate();
  const applicantId = localStorage.getItem('applicantId') || 'N/A';
  const applicantName = localStorage.getItem('applicantName') || 'Applicant';

  const [formData, setFormData] = useState({
    applicantId: applicantId,
    applicantName: applicantName,
    icNumber: '', // Or fetch from profile if available
    phoneNumber: '', // Or fetch from profile
    email: '', // Or fetch from profile
    address: '',
    zakatProgram: zakatPrograms[0], // Default to the first program
    otherProgramDetails: '', // For "Lain-lain"
    applicationReason: '',
    monthlyIncome: '',
    householdDependents: '',
    supportingDocuments: [], // Will handle file input later if needed
    declaration: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState({
    submitted: false,
    error: null,
    message: ''
  });

  // If you have applicant profile data stored, pre-fill some fields
  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     // const profile = await getApplicantProfile(applicantId); // API call
  //     // if (profile) {
  //     //   setFormData(prev => ({
  //     //     ...prev,
  //     //     icNumber: profile.icNumber || '',
  //     //     phoneNumber: profile.phoneNumber || '',
  //     //     email: profile.email || '',
  //     //     address: profile.address || '',
  //     //   }));
  //     // }
  //   };
  //   fetchProfileData();
  // }, [applicantId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Basic file handling example (can be expanded)
  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      supportingDocuments: [...e.target.files], // Store FileList object or array of files
    }));
    // For multiple files, you might want to show a list of selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({ submitted: false, error: null, message: '' });

    if (!formData.declaration) {
      setSubmissionStatus({ submitted: false, error: true, message: 'You must agree to the declaration.' });
      return;
    }
    if (formData.zakatProgram === "Lain-lain (Others - Please Specify)" && !formData.otherProgramDetails) {
        setSubmissionStatus({ submitted: false, error: true, message: 'Please specify details for "Others" Zakat program.' });
        return;
    }

    // --- Placeholder for API Submission ---
    console.log("Submitting Zakat Application:", formData);
    // In a real app, you would send `formData` (and files) to your backend API
    // const apiFormData = new FormData();
    // Object.keys(formData).forEach(key => {
    //   if (key === 'supportingDocuments') {
    //     formData.supportingDocuments.forEach(file => apiFormData.append('documents', file));
    //   } else {
    //     apiFormData.append(key, formData[key]);
    //   }
    // });
    // try {
    //   const response = await fetch('/api/applicant/apply-zakat', { method: 'POST', body: apiFormData });
    //   const result = await response.json();
    //   if (response.ok) {
    //     setSubmissionStatus({ submitted: true, success: true, message: 'Application submitted successfully! Application ID: ' + result.applicationId });
    //     // Optionally, navigate to a "My Applications" page or a success page
    //     // navigate('/applicant/my-applications');
    //   } else {
    //     setSubmissionStatus({ submitted: true, success: false, message: result.message || 'Submission failed.' });
    //   }
    // } catch (error) {
    //   setSubmissionStatus({ submitted: true, success: false, message: 'An error occurred: ' + error.message });
    // }
    // --- End Placeholder ---

    // Mock Success:
    setSubmissionStatus({ submitted: true, success: true, message: 'Mock submission successful! Your application is being processed.' });
    // Reset form or navigate away after a delay
    // setTimeout(() => {
    //   navigate('/applicant/dashboard');
    // }, 3000);
  };


  if (submissionStatus.submitted && submissionStatus.success) {
    return (
      <Container className="mt-5" fluid>
        <Row className="justify-content-center">
          <Col lg="8">
            <Alert color="success" className="text-center">
              <h4>Application Submitted!</h4>
              <p>{submissionStatus.message}</p>
              <Button color="primary" onClick={() => navigate('/applicant/my-applications')}>View My Applications</Button>
              {' '}
              <Button color="info" onClick={() => navigate('/applicant/dashboard')}>Back to Dashboard</Button>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
      {/* Header can be part of ApplicantLayout or added here if specific */}
      <Container className="mt-5 mb-5" fluid> {/* Added mb-5 for bottom spacing */}
        <Row className="justify-content-center">
          <Col lg="10" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0 text-center text-primary">Zakat Application Form</h3>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                {submissionStatus.error && (
                    <Alert color="danger">{submissionStatus.message}</Alert>
                )}
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">Applicant Information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="input-applicant-name">Full Name (as per IC)</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-applicant-name"
                            name="applicantName"
                            placeholder="Full Name"
                            type="text"
                            value={formData.applicantName}
                            onChange={handleChange}
                            required
                            disabled // Pre-filled from login
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="input-ic-number">IC Number</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-ic-number"
                            name="icNumber"
                            placeholder="e.g., 901010-10-1234"
                            type="text"
                            value={formData.icNumber}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="input-phone">Phone Number</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-phone"
                            name="phoneNumber"
                            placeholder="e.g., 012-3456789"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="input-email">Email Address</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            name="email"
                            placeholder="your.email@example.com"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                     <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="input-address">Full Address</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            name="address"
                            placeholder="Home Address"
                            type="textarea"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Application Details</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="select-zakat-program">Type of Zakat Aid</Label>
                          <Input
                            type="select"
                            name="zakatProgram"
                            id="select-zakat-program"
                            className="form-control-alternative"
                            value={formData.zakatProgram}
                            onChange={handleChange}
                            required
                          >
                            {zakatPrograms.map(program => (
                              <option key={program} value={program}>{program}</option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      {formData.zakatProgram === "Lain-lain (Others - Please Specify)" && (
                        <Col md="6">
                          <FormGroup>
                            <Label className="form-control-label" htmlFor="input-other-program">Specify Other Program</Label>
                            <Input
                              className="form-control-alternative"
                              id="input-other-program"
                              name="otherProgramDetails"
                              placeholder="Details for other program"
                              type="text"
                              value={formData.otherProgramDetails}
                              onChange={handleChange}
                              required
                            />
                          </FormGroup>
                        </Col>
                      )}
                    </Row>
                    <Row>
                        <Col lg="6">
                            <FormGroup>
                                <Label className="form-control-label" htmlFor="input-monthly-income">Estimated Monthly Income (RM)</Label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-monthly-income"
                                    name="monthlyIncome"
                                    placeholder="e.g., 1500"
                                    type="number"
                                    value={formData.monthlyIncome}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col lg="6">
                            <FormGroup>
                                <Label className="form-control-label" htmlFor="input-household-dependents">Number of Household Dependents</Label>
                                <Input
                                    className="form-control-alternative"
                                    id="input-household-dependents"
                                    name="householdDependents"
                                    placeholder="e.g., 3"
                                    type="number"
                                    min="0"
                                    value={formData.householdDependents}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="input-application-reason">Reason for Application / Description of Need</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-application-reason"
                            name="applicationReason"
                            placeholder="Briefly explain your situation and why you need this aid."
                            type="textarea"
                            rows="4"
                            value={formData.applicationReason}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col md="12">
                        <FormGroup>
                          <Label className="form-control-label" htmlFor="input-supporting-documents">Supporting Documents (Optional)</Label>
                          <Input
                            className="form-control-alternative"
                            id="input-supporting-documents"
                            name="supportingDocuments"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                          />
                          <small className="form-text text-muted">
                            E.g., IC copy, utility bills, medical reports, income statement. Max 5MB per file.
                          </small>
                          {formData.supportingDocuments.length > 0 && (
                            <ul className="mt-2">
                              {Array.from(formData.supportingDocuments).map((file, index) => (
                                <li key={index}><small>{file.name} ({(file.size / 1024).toFixed(1)} KB)</small></li>
                              ))}
                            </ul>
                          )}
                        </FormGroup>
                      </Col>
                    </Row> */}
                  </div>

                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Declaration</h6>
                  <div className="pl-lg-4">
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="checkbox"
                          name="declaration"
                          checked={formData.declaration}
                          onChange={handleChange}
                          required
                        />{' '}
                        I hereby declare that the information provided in this application is true and accurate to the best of my knowledge. I understand that providing false information may lead to the rejection of this application or other actions.
                      </Label>
                    </FormGroup>
                  </div>

                  <div className="text-center mt-5">
                    <Button color="primary" type="submit" disabled={submissionStatus.submitted && !submissionStatus.error}>
                      Submit Application
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ApplyZakat;