// src/views/Staff/Applicants.js
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Table,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Alert
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { getAssignedApplicants } from '../../apicall'; // Adjust path if apicall.js is elsewhere

const MARITAL_STATUS_OPTIONS = ['All', 'Single', 'Married', 'Divorced', 'Widowed', 'Other'];

const Applicants = () => {
  const [allApplicantsData, setAllApplicantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [applicantsPerPage] = useState(5);

  const [maritalStatusFilter, setMaritalStatusFilter] = useState('All');
  const [maritalFilterDropdownOpen, setMaritalFilterDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      setError(null);
      try {
        const dataFromApi = await getAssignedApplicants();
        const mappedData = dataFromApi.map(app => ({
          id: app.applicant_id,
          name: app.full_name,
          nric: app.nric,
          email: app.email,
          phone: app.phone,
          maritalStatus: app.marital_status,
          address: app.address,
          dateOfBirth: app.date_of_birth,
          salary: app.salary,
        }));
        setAllApplicantsData(mappedData);
      } catch (err) {
        console.error("Failed to fetch applicants:", err);
        setError(err.message || "Could not load applicant data.");
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, []);

  const toggleMaritalFilterDropdown = () => setMaritalFilterDropdownOpen(prevState => !prevState);

  const filteredAndSearchedApplicants = allApplicantsData
    .filter(applicant => {
      if (maritalStatusFilter === 'All') return true;
      return applicant.maritalStatus === maritalStatusFilter;
    })
    .filter(applicant =>
      (applicant.name && applicant.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (applicant.email && applicant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (applicant.id && applicant.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) || // Ensure ID is string for toLowerCase
      (applicant.nric && applicant.nric.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentPagedApplicants = filteredAndSearchedApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);
  const totalPages = Math.ceil(filteredAndSearchedApplicants.length / applicantsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <Container className="mt-5 text-center" fluid>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-2">Loading applicants...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5" fluid>
        <Alert color="danger" className="text-center">
          <h4>Error Loading Applicants</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center">
                <Col xs="12" md="6">
                  <h3 className="mb-0">Assigned Applicants</h3>
                </Col>
                <Col xs="12" md="6" className="mt-3 mt-md-0">
                  <Row>
                    <Col sm="7" xs="12" className="mb-2 mb-sm-0">
                      <InputGroup>
                        <InputGroupText>
                          <i className="fas fa-search"></i>
                        </InputGroupText>
                        <Input
                          type="text"
                          placeholder="Search by name, email, ID, NRIC..."
                          value={searchTerm}
                          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                      </InputGroup>
                    </Col>
                    <Col sm="5" xs="12">
                       <Dropdown isOpen={maritalFilterDropdownOpen} toggle={toggleMaritalFilterDropdown} className="w-100">
                        <DropdownToggle caret className="btn-secondary w-100">
                          Marital Status: {maritalStatusFilter}
                        </DropdownToggle>
                        <DropdownMenu className="w-100">
                          {MARITAL_STATUS_OPTIONS.map(statusOption => (
                            <DropdownItem
                              key={statusOption}
                              onClick={() => { setMaritalStatusFilter(statusOption); setCurrentPage(1); }}
                              active={maritalStatusFilter === statusOption && statusOption !== 'All'}
                            >
                              {statusOption}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">Applicant ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">NRIC</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Marital Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPagedApplicants.length > 0 ? (
                  currentPagedApplicants.map((applicant) => (
                    <tr key={applicant.id}>
                      <td>
                        <Link to={`/staff/applicant-details/${applicant.id}`}>
                          {applicant.id}
                        </Link>
                      </td>
                      <th scope="row">{applicant.name}</th>
                      <td>{applicant.nric}</td>
                      <td>{applicant.email}</td>
                      <td>{applicant.phone || 'N/A'}</td>
                      <td>{applicant.maritalStatus || 'N/A'}</td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          tag={Link}
                          to={`/staff/applicant-details/${applicant.id}`}
                          className="mr-1"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No applicants found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {filteredAndSearchedApplicants.length > applicantsPerPage && (
              <CardBody className="d-flex justify-content-end">
                <Pagination>
                  <PaginationItem disabled={currentPage <= 1}>
                    <PaginationLink previous onClick={() => paginate(currentPage - 1)} />
                  </PaginationItem>
                  {[...Array(totalPages).keys()].map(number => (
                    <PaginationItem active={number + 1 === currentPage} key={number + 1}>
                      <PaginationLink onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem disabled={currentPage >= totalPages}>
                    <PaginationLink next onClick={() => paginate(currentPage + 1)} />
                  </PaginationItem>
                </Pagination>
              </CardBody>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Applicants;