// src/views/Staff/ApplicationList.js
import React, { useState, useEffect, useCallback } from 'react'; // Added useCallback
import {
  Card, CardHeader, CardBody, Container, Row, Col, Table, Input,
  InputGroup, InputGroupText, Button, Badge, Pagination, PaginationItem,
  PaginationLink, Spinner, Alert,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem // Added Dropdown components
} from 'reactstrap';
import { Link as RouterLink } from 'react-router-dom';
import { getStaffApplicationsList } from '../../apicall';

const APPLICATION_STATUS_OPTIONS = ['All', 'Pending', 'In Review', 'Approved', 'Rejected', 'Documents Requested', 'Pending Interview']; // Define your statuses

const StaffApplicationsList = () => {
  const [allApplications, setAllApplications] = useState([]); // Store all fetched applications
  const [filteredApplications, setFilteredApplications] = useState([]); // Applications after search and filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // State for Status Filter
  const [statusFilter, setStatusFilter] = useState('All'); // Default to 'All'
  const [statusFilterDropdownOpen, setStatusFilterDropdownOpen] = useState(false);

  const toggleStatusFilterDropdown = () => setStatusFilterDropdownOpen(prevState => !prevState);

  // Fetch initial data
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStaffApplicationsList();
        setAllApplications(Array.isArray(data) ? data : []);
        setFilteredApplications(Array.isArray(data) ? data : []); // Initialize filtered with all
      } catch (err) {
        console.error("Failed to fetch applications list:", err);
        setError(err.message || "Could not load applications data.");
        setAllApplications([]);
        setFilteredApplications([]);
        // if (err.message === "No authentication token found." || err.response?.status === 401) {
        //   navigate('/auth/login');
        // }
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  // Apply filters and search when searchTerm or statusFilter changes
  useEffect(() => {
    let currentApplications = [...allApplications];

    // Apply Status Filter
    if (statusFilter !== 'All') {
      currentApplications = currentApplications.filter(app => app.application_status === statusFilter);
    }

    // Apply Search Filter
    if (searchTerm) {
      currentApplications = currentApplications.filter(app =>
        (app.applicant_name && app.applicant_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.applicant_nric && app.applicant_nric.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.application_id && app.application_id.toString().includes(searchTerm)) ||
        (app.category_name && app.category_name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredApplications(currentApplications);
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [searchTerm, statusFilter, allApplications]);


  // Client-side Pagination Logic (operates on filteredApplications)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItemsOnPage = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <Badge color="success" pill>{status}</Badge>;
      case 'Pending': return <Badge color="warning" pill>{status}</Badge>;
      case 'In Review': return <Badge color="info" pill>{status}</Badge>;
      case 'Rejected': return <Badge color="danger" pill>{status}</Badge>;
      case 'Documents Requested': return <Badge color="primary" pill>{status}</Badge>;
      case 'Pending Interview': return <Badge color="info" pill>{status}</Badge>; // Or another color
      default: return <Badge color="secondary" pill>{status || 'N/A'}</Badge>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
    } catch (e) {
      return dateString;
    }
  };

  if (loading && !allApplications.length) { // Show loader if loading and no data yet
    return (
      <Container className="mt-5 text-center" fluid>
        <Spinner color="primary" style={{ width: '3rem', height: '3rem' }} />
        <p className="mt-2">Loading applications...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5" fluid>
        <Alert color="danger" className="text-center">
          <h4>Error Loading Applications</h4>
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
              <Row className="align-items-center gy-3"> {/* Added gy-3 for vertical spacing */}
                <Col xs="12" md="6">
                  <h3 className="mb-0">Manage Applications</h3>
                  <p className="text-sm text-muted mb-0">
                    List of applications assigned to you.
                  </p>
                </Col>
                <Col xs="12" sm="6" md="3"> {/* Search Input Column */}
                  <InputGroup>
                    <InputGroupText><i className="fas fa-search"></i></InputGroupText>
                    <Input
                      type="text"
                      placeholder="Search Applicant Name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col xs="12" sm="6" md="3"> {/* Status Filter Dropdown Column */}
                  <Dropdown isOpen={statusFilterDropdownOpen} toggle={toggleStatusFilterDropdown} className="w-100">
                    <DropdownToggle caret className="btn-outline-secondary w-100 text-truncate">
                      Status: {statusFilter}
                    </DropdownToggle>
                    <DropdownMenu className="w-100">
                      {APPLICATION_STATUS_OPTIONS.map(statusOption => (
                        <DropdownItem
                          key={statusOption}
                          onClick={() => setStatusFilter(statusOption)}
                          active={statusFilter === statusOption && statusOption !== 'All'}
                        >
                          {statusOption}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
              </Row>
            </CardHeader>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th scope="col">App ID</th>
                  <th scope="col">Applicant Name</th>
                  <th scope="col">NRIC</th>
                  <th scope="col">Category</th>
                  <th scope="col">Submitted On</th>
                  <th scope="col">Status</th>
                  <th scope="col">Priority Score</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItemsOnPage.length > 0 ? (
                  currentItemsOnPage.map((app) => (
                    <tr key={app.application_id}>
                      <td>
                        <RouterLink to={`/staff/applications/detail/${app.application_id}`}>
                          {app.application_id}
                        </RouterLink>
                      </td>
                      <th scope="row">{app.applicant_name || 'N/A'}</th>
                      <td>{app.applicant_nric || 'N/A'}</td>
                      <td>{app.category_name || 'N/A'}</td>
                      <td>{formatDate(app.submission_date)}</td>
                      <td>{getStatusBadge(app.application_status)}</td>
                      
                      {/* --- NEW COLUMN DATA --- */}
                      <td>
                        {app.total_priority_score !== null && app.total_priority_score !== undefined ? (
                          <Badge 
                          color={app.total_priority_score >= 70 ? 'danger' : 'info'} 
                        pill
                        >
                        {app.total_priority_score}
                        </Badge>
                        ) : (
                        <Badge color="secondary" pill>N/A</Badge>
                      )}
                    </td>
                      <td>
                        <Button
                          color="primary"
                          size="sm"
                          tag={RouterLink}
                          to={`/staff/applications/detail/${app.application_id}`}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No applications found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            {filteredApplications.length > itemsPerPage && (
              <CardBody className="d-flex justify-content-center justify-content-md-end">
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

export default StaffApplicationsList;