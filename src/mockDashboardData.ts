// Mock data for DashboardTable
export const data = [
  {
    id: 'atlas-crm',
    name: 'Atlas CRM', link: '#', compliant: true, issues: [0,0], vulns: [0,0], patching: ['0/0','0/0'], downtime: ['0.00','0.00'], category: 'CRM', status: 'Compliant'
  },
  {
    id: 'nova-analytics',
    name: 'Nova Analytics', link: '#', compliant: false, issues: [55,0], vulns: [0,0], patching: ['0/0','0/0'], downtime: ['0.00','0.00'], category: 'Analytics', status: 'Not compliant'
  },
  {
    id: 'zenith-portal',
    name: 'Zenith Portal', link: '#', compliant: false, issues: [8,0], vulns: [0,0], patching: ['82/82','44/55'], downtime: ['13.03','13.03'], category: 'Portal', status: 'Not compliant'
  },
  {
    id: 'orion-scheduler',
    name: 'Orion Scheduler', link: '#', compliant: false, issues: [2,0], vulns: [0,4], patching: ['16/16','13/13'], downtime: ['4.01','17.01'], category: 'Scheduler', status: 'Not compliant'
  },
  {
    id: 'pulse-mobile',
    name: 'Pulse Mobile', link: '#', compliant: true, issues: [0,0], vulns: [0,0], patching: ['57/57','22/22'], downtime: ['0.00','0.00'], category: 'Mobile', status: 'Compliant'
  },
  {
    id: 'helix-gateway',
    name: 'Helix Gateway', link: '#', compliant: false, issues: [70,0], vulns: [0,0], patching: ['187/383','139/184'], downtime: ['0.00','0.00'], category: 'Gateway', status: 'Not compliant'
  },
];

export const categories = ['All Categories', 'CRM', 'Analytics', 'Portal', 'Scheduler', 'Mobile', 'Gateway'];
export const statuses = ['Any Status', 'Compliant', 'Not compliant'];

export const mockAppDetails = {
  'atlas-crm': {
    id: 'atlas-crm',
    name: 'Atlas CRM',
    compliance: { compliant: true, complianceSince: '2024-05-01' },
    issues: [
      { id: 1, title: 'No issues', status: 'Closed' }
    ],
    vulnerabilities: [],
    patching: [],
    downtime: [],
    majorIncident: [],
    groupName: 'CRM',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  'nova-analytics': {
    id: 'nova-analytics',
    name: 'Nova Analytics',
    compliance: { compliant: false, complianceSince: '2024-05-20' },
    issues: [
      { id: 2, title: 'Data sync error', status: 'Open' },
      { id: 3, title: 'UI bug', status: 'Open' }
    ],
    vulnerabilities: [
      { id: 1, description: 'XSS vulnerability', severity: 'High' }
    ],
    patching: [
      { id: 1, patch: 'Security Patch 1', status: 'Pending' }
    ],
    downtime: [
      { start: '2024-06-01T10:00:00Z', end: '2024-06-01T12:00:00Z' }
    ],
    majorIncident: [],
    groupName: 'Analytics',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
  'zenith-portal': {
    id: 'zenith-portal',
    name: 'Zenith Portal',
    compliance: { compliant: false, complianceSince: '2024-05-15' },
    issues: [
      { id: 4, title: 'Login failure', status: 'Open' }
    ],
    vulnerabilities: [],
    patching: [],
    downtime: [],
    majorIncident: [],
    groupName: 'Portal',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  'orion-scheduler': {
    id: 'orion-scheduler',
    name: 'Orion Scheduler',
    compliance: { compliant: false, complianceSince: '2024-05-10' },
    issues: [],
    vulnerabilities: [
      { id: 2, description: 'Outdated library', severity: 'Medium' }
    ],
    patching: [],
    downtime: [],
    majorIncident: [],
    groupName: 'Scheduler',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
  'pulse-mobile': {
    id: 'pulse-mobile',
    name: 'Pulse Mobile',
    compliance: { compliant: true, complianceSince: '2024-04-01' },
    issues: [],
    vulnerabilities: [],
    patching: [],
    downtime: [],
    majorIncident: [],
    groupName: 'Mobile',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  'helix-gateway': {
    id: 'helix-gateway',
    name: 'Helix Gateway',
    compliance: { compliant: false, complianceSince: '2024-05-05' },
    issues: [
      { id: 5, title: 'Gateway timeout', status: 'Open' }
    ],
    vulnerabilities: [],
    patching: [],
    downtime: [],
    majorIncident: [],
    groupName: 'Gateway',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
}; 