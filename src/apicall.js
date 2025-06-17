// src/apicall.js
import axios from "axios";

const BASE_URL = "http://192.168.0.240:3000/api"; // Ensure this matches your backend

// Helper to get token
const getToken = () => localStorage.getItem("authToken");

const getAuthHeader = () => {
  const token = getToken();
  if (!token) {
    console.error("Auth token not found for API request.");
    return {};
  }
  // The 'Bearer ' prefix is a standard for JWT authentication
  return { headers: { Authorization: `Bearer ${token}` } };
};

// --- Existing Functions (ensure they are here) ---
export const login = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/login`, { username, password });
  if (response.data && response.data.token) {
    localStorage.setItem("authToken", response.data.token);
    if (response.data.user) {
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("staffName", response.data.user.name);
      localStorage.setItem("userPosition", response.data.user.position);
    }
  }
  return response.data;
};

export const getStaffDashboardStats = async () => {
  const token = getToken();
  if (!token) throw new Error("No authentication token found.");
  // Assuming the backend route is indeed /api/dashboard-stats as used in Dashboard.js
  const response = await axios.get(`${BASE_URL}/dashboard-stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getAssignedApplicants = async () => { // For the /api/staff/assigned-applicants endpoint
  const token = getToken();
  if (!token) throw new Error("No authentication token found.");
  // PLEASE VERIFY: Is the /staff/ prefix correct for this endpoint on your backend?
  const response = await axios.get(`${BASE_URL}/assigned-applicants`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getSingleApplicantDetails = async (applicantId) => { // For /api/staff/applicant/:applicantId
  const token = getToken();
  if (!token) throw new Error("No authentication token found.");
  // PLEASE VERIFY: Is the /staff/ prefix correct for this endpoint on your backend?
  const response = await axios.get(`${BASE_URL}/applicant/${applicantId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const getStaffProfile = async () => {
  const token = getToken();
  if (!token) throw new Error("No authentication token found.");
  // PLEASE VERIFY: Is the /staff/ prefix correct for this endpoint on your backend?
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const register = async (formData) => {
  const response = await axios.post(`${BASE_URL}/register`, formData);
  return response.data;
};

export const getApplicantDashboard = async (applicant_id) => {
  const res = await axios.get(`${BASE_URL}/applicantDashboard/${applicant_id}`);
  return res.data;
};


// --- ✅ NEW FUNCTIONS FOR APPLICATIONS MANAGEMENT ---

/**
 * Fetches a list of applications for the staff.
 * (Corresponds to GET /api/applications/list in the backend)
 */
export const getStaffApplicationsList = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found for fetching applications list.");
  }
  // URL changed based on backend comment
  const response = await axios.get(`${BASE_URL}/staff-list`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return response.data;
};

/**
 * Fetches detailed information for a single application.
 * (Corresponds to GET /api/applications/detail/:applicationId in the backend)
 * @param {string|number} applicationId The ID of the application to fetch.
 */
export const getStaffApplicationDetail = async (applicationId) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found for fetching application detail.");
  }
  if (!applicationId) {
    throw new Error("Application ID is required to fetch details.");
  }
  // URL changed based on backend comment
  const response = await axios.get(`${BASE_URL}/detail/${applicationId}`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return response.data;
};  //postman succcessful

/**
 * Updates an application's status and other details.
 * (Corresponds to PUT /api/applications/update/:applicationId in the backend)
 * @param {string|number} applicationId The ID of the application to update.
 * @param {object} updateData The data to update (e.g., { application_status, status_detail, officer_remarks }).
 */
export const updateStaffApplication = async (applicationId, updateData) => {
  const token = getToken();
  if (!token) {
    throw new Error("No authentication token found for updating application.");
  }
  if (!applicationId) {
    throw new Error("Application ID is required for update.");
  }
  // URL changed based on backend comment
  const response = await axios.put(`${BASE_URL}/update/${applicationId}`, updateData, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return response.data;
};

// --- ✅ NEW FINANCE-SPECIFIC FUNCTIONS ---

/**
 * Fetches all applications that are 'Approved' and awaiting disbursement.
 * (Corresponds to GET /api/finance/approved-list in the backend)
 */

// --- FINANCE MODULE API CALLS ---

export const financeLogin = async (username, password) => {
  const response = await axios.post(`${BASE_URL}/finance/login`, { username, password });
  if (response.data && response.data.token) {
    // Store token and role to manage session and access
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("role", "finance");
    localStorage.setItem("staffName", response.data.user.name); // Store name for UI
  }
  return response.data;
};

/**
 * Fetches the statistics for the finance dashboard (original simple version).
 */
export const getFinanceDashboardStats = async () => {
  // This endpoint was created in our backend `financeActions.js` file
  const response = await axios.get(`${BASE_URL}/finance/dashboard-stats`, getAuthHeader());
  return response.data;
};

/**
 * Fetches all applications that are 'Approved' and waiting for disbursement.
 */
export const getApprovedApplications = async () => {
  const response = await axios.get(`${BASE_URL}/finance/approved-applications`, getAuthHeader());
  return response.data;
};

/**
 * Marks an application as disbursed and records the transaction.
 */
export const disburseAid = async (applicationId, disbursementData) => {
  const response = await axios.post(
    `${BASE_URL}/finance/disburse/${applicationId}`,
    disbursementData,
    getAuthHeader()
  );
  return response.data;
};