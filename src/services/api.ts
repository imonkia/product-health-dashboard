import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const apiService = {
  // Get user information
  getUser: async () => {
    const response = await api.get('/api/v1/app/user');
    return response.data;
  },

  // Get all applications
  getApplications: async () => {
    const response = await api.get('/api/v1/app/applications');
    return response.data;
  },

  // Get specific application
  getApplication: async (id: string) => {
    const response = await api.get(`/api/v1/app/applications/${id}`);
    return response.data;
  },

  // Get operational excellence data for an app
  getOpexData: async (appId: string) => {
    const response = await api.get(`/api/v1/app/opex/${appId}`);
    return response.data;
  },

  // Get host data for a vulnerability
  getVulnerabilityHosts: async (appId: string, qid: string) => {
    const response = await api.get(`/api/v1/app/appdata/${appId}/vulns/${qid}/hosts`);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

// Data transformation functions
export const transformDashboardData = (applications: any[]) => {
  return applications.map(app => ({
    id: app.id,
    name: app.name,
    category: app.category,
    compliant: app.compliance?.compliant || false,
    issues: [0, 0], // Will be populated from opex data
    vulns: [0, 0], // Will be populated from opex data
    patching: [0, 0], // Will be populated from opex data
    downtime: ['0', '0'], // Will be populated from opex data
  }));
};

export const transformOpexData = (opexData: any) => {
  return {
    id: opexData.id,
    name: opexData.name,
    compliance: opexData.compliance,
    issues: opexData.issues || [],
    vulnerabilities: opexData.vulnerabilities || [],
    patching: opexData.patching || [],
    downtime: opexData.downtime || [],
    majorIncident: opexData.majorIncident || [],
    groupName: opexData.groupName,
    gatehouseCheckin: opexData.gatehouseCheckin,
    gatehouseCheckinDate: opexData.gatehouseCheckinDate,
  };
};

export default apiService; 