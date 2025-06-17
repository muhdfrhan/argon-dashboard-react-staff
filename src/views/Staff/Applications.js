// src/views/Staff/Applications.js
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
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

// Sample Application Data (replace with API data)
const sampleApplications = [
  {
    id: 'APPZ001',
    applicantName: 'Fatimah Binti Abdullah',
    applicantId: 'APP001', // Link to applicant profile
    programName: 'Zakat Asnaf Fakir Miskin',
    submissionDate: '2024-03-10',
    lastUpdate: '2024-03-11',
    status: 'Pending Review',
    assignedTo: 'Ahmad Staff',
  },
  {
    id: 'APPZ002',
    applicantName: 'Ahmad Bin Ibrahim',
    applicantId: 'APP002',
    programName: 'Bantuan Pendidikan Zakat',
    submissionDate: '2024-03-12',
    lastUpdate: '2024-03-15',
    status: 'Approved',
    assignedTo: 'Siti Admin',
  },
  {
    id: 'APPZ003',
    applicantName: 'Siti Khadijah Binti Ismail',
    applicantId: 'APP003',
    programName: 'Zakat Asnaf Fakir Miskin',
    submissionDate: '2024-03-15',
    lastUpdate: '2024-03-18',
    status: 'Documents Requested',
    assignedTo: 'Ahmad Staff',
  },
  {
    id: 'APPZ004',
    applicantName: 'Muhammad Ali Bin Hassan',
    applicantId: 'APP004',
    programName: 'Bantuan Perubatan Zakat',
    submissionDate: '2024-03-18',
    lastUpdate: '2024-03-20',
    status: 'Pending Interview',
    assignedTo: 'Fatimah Supervisor',
  },
  {
    id: 'APPZ005',
    applicantName: 'Nurul Huda Binti Osman',
    applicantId: 'APP005',
    programName: 'Zakat Asnaf Fakir Miskin',
    submissionDate: '2024-03-20',
    lastUpdate: '2024-03-21',
    status: 'Rejected',
    assignedTo: 'Ahmad Staff',
  },
  {
    id: 'APPZ006',
    applicantName: 'John Doe',
    applicantId: 'APP006',
    programName: 'Bantuan Pendidikan Zakat',
    submissionDate: '2024-03-22',
    lastUpdate: '2024-03-22',
    status: 'Pending Review',
    assignedTo: null, // Unassigned example
  },
];

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [statusFilter, setStatusFilter] = useState('All');
  const [programFilter, setProgramFilter] = useState('All Programs');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);

  useEffect(() => {
    // In a real app, fetch applications from an API
    setApplications(sampleApplications);
  }, []);

  const toggleStatusDropdown = () => setStatusDropdownOpen(prevState => !prevState);
  const toggleProgramDropdown = () => setProgramDropdownOpen(prevState => !prevState);

  // Derive unique values for filters from the applications data
  const uniquePrograms = ['All Programs', ...new Set(applications.map(app => app.programName).sort())];
  const uniqueStatuses = ['All', ...new Set(applications.map(app => app.status).sort())];

  // Filter and Search Logic
  const filteredApplications = applications
    .filter(app => {
      if (statusFilter === 'All') return true;
      return app.status === statusFilter;
    })
    .filter(app => {
      if (programFilter === 'All Programs') return true;
      return app.programName === programFilter;
    })
    .filter(app =>
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.assignedTo && app.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())) ||
      app.programName.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': return <Badge color="success" pill>{status}</Badge>;
      case 'Pending Review': return <Badge color="warning" pill>{status}</Badge>;
      case 'Pending Interview': return <Badge color="info" pill>{status}</Badge>;
      case 'Documents Requested': return <Badge color="primary" pill>{status}</Badge>;
      case 'Rejected': return <Badge color="danger" pill>{status}</Badge>;
      default: return <Badge color="secondary" pill>{status}</Badge>;
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        <Col>
          <Card className="shadow">
            <CardHeader className="border-0">
              <Row className="align-items-center gy-3"> {/* gy-3 for vertical spacing on small screens */}
                <Col xs="12" md="auto" className="flex-grow-1"> {/* Title takes available space */}
                  <h3 className="mb-0">Manage Applications</h3>
                </Col>
                <Col xs="12" sm="6" md="4" lg="3">
                  <InputGroup>
                    <InputGroupText><i className="fas fa-search"></i></InputGroupText>
                    <Input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col xs="6" sm="3" md="auto"> {/* md="auto" makes column fit content */}
                  <Dropdown isOpen={statusDropdownOpen} toggle={toggleStatusDropdown} className="w-100">
                    <DropdownToggle caret className="btn-outline-secondary w-100 text-truncate">
                      Status: {statusFilter}
                    </DropdownToggle>
                    <DropdownMenu className="w-100">
                      {uniqueStatuses.map(status => (
                        <DropdownItem key={status} onClick={() => {setStatusFilter(status); setCurrentPage(1);}}>
                          {status}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Col>
                <Col xs="6" sm="3" md="auto"> {/* md="auto" makes column fit content */}
                  <Dropdown isOpen={programDropdownOpen} toggle={toggleProgramDropdown} className="w-100">
                    <DropdownToggle caret className="btn-outline-secondary w-100 text-truncate">
                      Program: {programFilter === 'All Programs' ? 'All' : programFilter}
                    </DropdownToggle>
                    <DropdownMenu className="w-100">
                      {uniquePrograms.map(program => (
                        <DropdownItem key={program} onClick={() => {setProgramFilter(program); setCurrentPage(1);}}>
                          {program}
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
                  <th scope="col">Program</th>
                  <th scope="col">Submitted</th>
                  <th scope="col">Last Update</th>
                  <th scope="col">Status</th>
                  <th scope="col">Assigned To</th>
                  <th scope="col" className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((app) => (
                    <tr key={app.id}>
                      <td>
                        <Link to={`/staff/applications/${app.id}`}>{app.id}</Link>
                      </td>
                      <th scope="row">
                        <Link to={`/staff/applicants/${app.applicantId}`}>{app.applicantName}</Link>
                      </th>
                      <td>{app.programName}</td>
                      <td>{app.submissionDate}</td>
                      <td>{app.lastUpdate}</td>
                      <td>{getStatusBadge(app.status)}</td>
                      <td>{app.assignedTo || <em className="text-muted">Unassigned</em>}</td>
                      <td className="text-right">
                        <Button
                          color="primary"
                          size="sm"
                          tag={Link}
                          to={`/staff/applications/${app.id}`}
                          title="View Application Details"
                        >
                          <i className="fas fa-eye"></i>
                        </Button>
                        {/* Add more actions like 'Assign', 'Update Status', 'Process' */}
                        {/* Example:
                        <Button color="info" size="sm" className="ml-1" title="Process">
                          <i className="fas fa-cogs"></i>
                        </Button>
                        */}
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
                <Pagination aria-label="Applications pagination">
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

export default Applications;