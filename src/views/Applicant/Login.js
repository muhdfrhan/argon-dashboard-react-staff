// src/views/Applicant/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <--- IMPORT Link HERE
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Container,
  Row,
  Col,
} from "reactstrap";
import zakatLogo from "assets/img/zakat-logo.png";

const ApplicantLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Please enter both your identifier and password.");
      return;
    }

    // --- START: Mock Authentication (for UI development) ---
    if (identifier && password) {
      console.log("Attempting login with:", identifier, password);
      localStorage.setItem("role", "applicant");
      localStorage.setItem("applicantName", "Demo Applicant (" + identifier + ")");
      localStorage.setItem("applicantId", identifier);
      navigate("/applicant/dashboard");
    } else {
      setError("Please enter both identifier and password.");
    }
    // --- END: Mock Authentication ---
  };

  return (
    <div className="main-content bg-gradient-light py-7 py-lg-8">
      <Container>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary shadow border-0">
              <CardHeader className="bg-transparent pb-5 text-center">
                <img
                  src={zakatLogo}
                  alt="Zakat System Logo"
                  className="img-fluid d-block mx-auto my-4"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <div className="text-muted text-center">
                  <h2 className="text-primary">Applicant Login</h2>
                  <small>Access your Zakat application portal</small>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}
                <Form role="form" onSubmit={handleLogin}>
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroupText>
                        <i className="ni ni-single-02" />
                      </InputGroupText>
                      <Input
                        placeholder="IC Number / Email / Username"
                        type="text"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                        autoComplete="username"
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                      <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="my-4 w-100" color="primary" type="submit">
                      Sign in
                    </Button>
                  </div>
                </Form>
                <Row className="mt-3">
                  <Col xs="6">
                    {/* Placeholder for Forgot Password */}
                  </Col>
                  <Col xs="6" className="text-right">
                    {/* Ensure the path /auth/register-applicant is correctly set up in your routes */}
                    <Link to="/auth/register-applicant" className="text-primary">
                      <small>Create new account</small>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="12" className="text-center">
                <small className="text-muted">
                  © {new Date().getFullYear()} Zakat Aid System
                </small>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplicantLogin;