// src/views/Staff/StaffProfile.js
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
  CardText,
  Spinner,
  Alert
} from 'reactstrap';
import { getStaffProfile } from '../../apicall';
import zakatLogo from 'assets/img/zakat-logo.png';
// import { useNavigate } from 'react-router-dom'; // Uncomment if needed for redirect

const StaffProfile = () => {
  const [profile, setProfile] = useState({
    userId: '',
    username: localStorage.getItem('username') || 'Loading...',
    fullName: 'Loading...',
    email: 'Loading...',
    role: 'Loading...',
    department: 'N/A',
    joinDate: 'N/A',
    profileImage: zakatLogo,
  });

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  // const navigate = useNavigate(); // Uncomment if needed

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const data = await getStaffProfile();
        setProfile({
          userId: data.user_id,
          username: data.username,
          fullName: data.name,
          email: data.email,
          role: data.position,
          department: profile.department, // Keep placeholder or make editable
          joinDate: profile.joinDate,     // Keep placeholder or make editable
          profileImage: zakatLogo,
        });
      } catch (err) {
        console.error("Failed to fetch staff profile:", err);
        setApiError(err.message || "Could not load profile data.");
        if (err.message === "No authentication token found." || err.response?.status === 401) {
          // navigate('/staff/login'); // Optionally navigate to login page
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Initial fetch

  useEffect(() => {
    if (profile.username !== 'Loading...' || isEditing) { // Ensure profile is loaded or when entering edit mode
      setFormData({
        fullName: profile.fullName,
        email: profile.email,
        // department: profile.department, // If department becomes editable via API
      });
    }
  }, [isEditing, profile.fullName, profile.email]); // Rerun if these specific profile fields change or edit mode toggles

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
        setFormData({ // Reset form with current profile data when entering edit mode
            fullName: profile.fullName,
            email: profile.email,
        });
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to update profile data on the backend
    // Example:
    // setLoading(true);
    // setApiError(null);
    // try {
    //   const updatedProfileData = await updateStaffProfile(profile.userId, formData); // Create updateStaffProfile in apicall.js
    //   setProfile(prev => ({ ...prev, ...updatedProfileData })); // Update local profile state
    //   alert('Profile updated successfully!');
    //   setIsEditing(false);
    // } catch (err) {
    //   setApiError(err.message || "Failed to update profile.");
    // } finally {
    //   setLoading(false);
    // }
    console.log('Attempting to save data (locally for now):', formData);

    // Simulate local update for now
    setProfile((prevProfile) => ({
      ...prevProfile,
      fullName: formData.fullName || prevProfile.fullName,
      email: formData.email || prevProfile.email,
    }));

    alert('Profile changes saved locally! Backend update needs to be implemented.');
    setIsEditing(false);
  };

  if (loading && profile.username === 'Loading...') {
    return (
      <Container className="mt-5 text-center" fluid>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-2">Loading profile...</p>
      </Container>
    );
  }

  if (apiError && !isEditing) { // Don't show main error if user is just trying to edit and an update fails (handle that separately)
    return (
      <Container className="mt-5" fluid>
        <Alert color="danger" className="text-center">
          <h4>Error Loading Profile</h4>
          <p>{apiError}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" fluid>
      <Row className="justify-content-center">
        <Col xl="8">
          <Card className="shadow">
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">My Staff Profile</h3>
                </Col>
                <Col className="text-right" xs="4">
                  <Button
                    color={isEditing ? 'default' : 'primary'}
                    onClick={handleEditToggle}
                    size="sm"
                    disabled={loading && isEditing} // Disable while saving changes
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {apiError && isEditing && <Alert color="danger">{apiError}</Alert>} {/* Show update errors here */}
              <Form onSubmit={handleSaveChanges}>
                <div className="text-center mb-4">
                  <img
                    alt={profile.username}
                    className="rounded-circle img-fluid shadow"
                    src={profile.profileImage}
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <h6 className="heading-small text-muted mb-4">User Information</h6>
                <div className="pl-lg-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-username">
                          Username
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={profile.username}
                          id="input-username"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-email">
                          Email address
                        </label>
                        {isEditing ? (
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            name="email"
                            placeholder="staff.email@example.com"
                            type="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            required
                          />
                        ) : (
                          <CardText className="pt-2">{profile.email}</CardText>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-full-name">
                          Full name
                        </label>
                        {isEditing ? (
                          <Input
                            className="form-control-alternative"
                            id="input-full-name"
                            name="fullName"
                            placeholder="Full name"
                            type="text"
                            value={formData.fullName || ''}
                            onChange={handleInputChange}
                            required
                          />
                        ) : (
                          <CardText className="pt-2">{profile.fullName}</CardText>
                        )}
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label className="form-control-label" htmlFor="input-role">
                          Position / Role
                        </label>
                        <Input
                          className="form-control-alternative"
                          value={profile.role}
                          id="input-role"
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
                <hr className="my-4" />

                {isEditing && (
                  <div className="text-right mt-4">
                    <Button color="success" type="submit" disabled={loading}>
                       {loading ? <Spinner size="sm"/> : 'Save Changes'}
                    </Button>
                  </div>
                )}
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StaffProfile;