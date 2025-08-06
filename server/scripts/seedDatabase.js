const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Application = require('../models/Application');
const OpexData = require('../models/OpexData');

// Sample applications data
const applications = [
  {
    id: 1,
    name: 'Atlas CRM',
    category: 'CRM',
    groupName: 'CRM',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
    links: [
      { order: 1, category: 'ServiceNow', linkName: 'Atlas CRM Incidents', linkUrl: 'https://servicenow.com/atlas-crm' },
      { order: 2, category: 'Database', linkName: 'Atlas CRM Database', linkUrl: 'https://database.com/atlas-crm' },
      { order: 3, category: 'Splunk Dashboard', linkName: 'Atlas CRM Dashboard', linkUrl: 'https://splunk.com/atlas-crm' },
      { order: 4, category: 'Other Dashboards', linkName: 'Atlas CRM Assets', linkUrl: 'https://assets.com/atlas-crm' }
    ]
  },
  {
    id: 2,
    name: 'Nova Analytics',
    category: 'Analytics',
    groupName: 'Analytics',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
    links: [
      { order: 1, category: 'ServiceNow', linkName: 'Nova Analytics Incidents', linkUrl: 'https://servicenow.com/nova-analytics' },
      { order: 2, category: 'Database', linkName: 'Nova Analytics Database', linkUrl: 'https://database.com/nova-analytics' },
      { order: 3, category: 'Splunk Dashboard', linkName: 'Nova Analytics Dashboard', linkUrl: 'https://splunk.com/nova-analytics' },
      { order: 4, category: 'Link sorting', linkName: 'Nova Analytics Sorting', linkUrl: 'https://sorting.com/nova-analytics' }
    ]
  },
  {
    id: 3,
    name: 'Zenith Portal',
    category: 'Portal',
    groupName: 'Portal',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
    links: [
      { order: 1, category: 'ServiceNow', linkName: 'Zenith Portal Incidents', linkUrl: 'https://servicenow.com/zenith-portal' },
      { order: 2, category: 'Database', linkName: 'Zenith Portal Database', linkUrl: 'https://database.com/zenith-portal' },
      { order: 3, category: 'Splunk Dashboard', linkName: 'Zenith Portal Dashboard', linkUrl: 'https://splunk.com/zenith-portal' },
      { order: 4, category: 'Other Dashboards', linkName: 'Zenith Portal Assets', linkUrl: 'https://assets.com/zenith-portal' }
    ]
  },
  {
    id: 4,
    name: 'Orion Scheduler',
    category: 'Scheduler',
    groupName: 'Scheduler',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
    links: [
      { order: 1, category: 'ServiceNow', linkName: 'Orion Scheduler Incidents', linkUrl: 'https://servicenow.com/orion-scheduler' },
      { order: 2, category: 'Database', linkName: 'Orion Scheduler Database', linkUrl: 'https://database.com/orion-scheduler' },
      { order: 3, category: 'Splunk Dashboard', linkName: 'Orion Scheduler Dashboard', linkUrl: 'https://splunk.com/orion-scheduler' },
      { order: 4, category: 'Link sorting', linkName: 'Orion Scheduler Sorting', linkUrl: 'https://sorting.com/orion-scheduler' }
    ]
  },
  {
    id: 5,
    name: 'Pulse Mobile',
    category: 'Mobile',
    groupName: 'Mobile',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
    links: [
      { order: 1, category: 'ServiceNow', linkName: 'Pulse Mobile Incidents', linkUrl: 'https://servicenow.com/pulse-mobile' },
      { order: 2, category: 'Database', linkName: 'Pulse Mobile Database', linkUrl: 'https://database.com/pulse-mobile' },
      { order: 3, category: 'Splunk Dashboard', linkName: 'Pulse Mobile Dashboard', linkUrl: 'https://splunk.com/pulse-mobile' },
      { order: 4, category: 'Other Dashboards', linkName: 'Pulse Mobile Assets', linkUrl: 'https://assets.com/pulse-mobile' }
    ]
  },
  {
    id: 6,
    name: 'Helix Gateway',
    category: 'Gateway',
    groupName: 'Gateway',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
    links: [
      { order: 1, category: 'ServiceNow', linkName: 'Helix Gateway Incidents', linkUrl: 'https://servicenow.com/helix-gateway' },
      { order: 2, category: 'Database', linkName: 'Helix Gateway Database', linkUrl: 'https://database.com/helix-gateway' },
      { order: 3, category: 'Splunk Dashboard', linkName: 'Helix Gateway Dashboard', linkUrl: 'https://splunk.com/helix-gateway' },
      { order: 4, category: 'Link sorting', linkName: 'Helix Gateway Sorting', linkUrl: 'https://sorting.com/helix-gateway' }
    ]
  }
];

// Sample opex data
const opexData = [
  {
    id: 1,
    name: 'Atlas CRM',
    compliance: { 
      compliant: true, 
      complianceSince: '2024-05-01' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72299672',
        title: 'Include due date when calculating compliance status for CST issues',
        status: 'Analyze',
        priority: 1,
        dueDate: '2024-07-15',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-20',
        dri: 'Jack the Ripper',
        category: 'compliance'
      }
    ],
    vulnerabilities: [
      {
        risk: 'vuln',
        id: 'VULN-001',
        vulnerability: 'OpenSSL CVE-2023-1234',
        category: 'category 1',
        fixByDate: '06/10/2024 10:00',
        hosts: 2
      }
    ],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-001',
        hostname: 'atlas-crm-prod-01.subdomain.domain.com',
        ip: '192.168.1.10',
        patchDate: '2024-06-01',
        status: 'Compliant'
      },
      {
        environment: 'Production',
        id: 'PATCH-002',
        hostname: 'atlas-crm-prod-02.subdomain.domain.com',
        ip: '192.168.1.11',
        patchDate: '2024-06-01',
        status: 'Compliant'
      }
    ],
    downtime: [
      {
        type: 'planned',
        id: 'DOWN000358239',
        title: 'Monthly Maintenance Window',
        outageStart: '06/01/2024 15:00',
        outageEnd: '06/01/2024 18:00',
        downtimeTotal: 3.0,
      },
      {
        type: 'planned',
        id: 'DOWN000358240',
        title: 'Database Migration',
        outageStart: '05/15/2024 11:00',
        outageEnd: '05/15/2024 14:00',
        downtimeTotal: 3.0,
      }
    ],
    majorIncident: [],
    groupName: 'CRM',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  {
    id: 2,
    name: 'Nova Analytics',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-20' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72299673',
        title: 'Data sync error in analytics pipeline',
        status: 'Open',
        priority: 2,
        dueDate: '2024-07-20',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-25',
        dri: 'Jane Smith',
        category: 'operational'
      },
      {
        source: 'anteater',
        id: '72299674',
        title: 'UI bug in dashboard rendering',
        status: 'Open',
        priority: 3,
        dueDate: '2024-07-25',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-30',
        dri: 'John Doe',
        category: 'accessibility'
      }
    ],
    vulnerabilities: [
      {
        risk: 'vuln',
        id: 'VULN-002',
        vulnerability: 'SQL Injection CVE-2023-5678',
        category: 'category 2',
        fixByDate: '06/15/2024 10:00',
        hosts: 1
      }
    ],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-003',
        hostname: 'nova-analytics-prod-01.subdomain.domain.com',
        ip: '192.168.1.20',
        patchDate: '2024-06-01',
        status: 'Pending'
      }
    ],
    downtime: [
      {
        type: 'unplanned',
        id: 'DOWN000358241',
        title: 'Unexpected server crash',
        outageStart: '06/01/2024 10:00',
        outageEnd: '06/01/2024 12:00',
        downtimeTotal: 2.0,
      }
    ],
    majorIncident: [],
    groupName: 'Analytics',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
  {
    id: 3,
    name: 'Zenith Portal',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-15' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72299675',
        title: 'Login failure in portal authentication',
        status: 'Open',
        priority: 1,
        dueDate: '2024-07-10',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-15',
        dri: 'Alice Johnson',
        category: 'compliance'
      }
    ],
    vulnerabilities: [],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-004',
        hostname: 'zenith-portal-prod-01.subdomain.domain.com',
        ip: '192.168.1.30',
        patchDate: '2024-06-01',
        status: 'Compliant'
      },
      {
        environment: 'Production',
        id: 'PATCH-005',
        hostname: 'zenith-portal-prod-02.subdomain.domain.com',
        ip: '192.168.1.31',
        patchDate: '2024-06-01',
        status: 'Compliant'
      }
    ],
    downtime: [
      {
        type: 'planned',
        id: 'DOWN000358242',
        title: 'Portal maintenance window',
        outageStart: '05/15/2024 20:00',
        outageEnd: '05/15/2024 23:00',
        downtimeTotal: 3.0,
      }
    ],
    majorIncident: [],
    groupName: 'Portal',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  {
    id: 4,
    name: 'Orion Scheduler',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-10' 
    },
    issues: [],
    vulnerabilities: [
      {
        risk: 'vuln',
        id: 'VULN-003',
        vulnerability: 'Outdated library CVE-2023-9012',
        category: 'category 3',
        fixByDate: '06/20/2024 10:00',
        hosts: 4
      }
    ],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-006',
        hostname: 'orion-scheduler-prod-01.subdomain.domain.com',
        ip: '192.168.1.40',
        patchDate: '2024-06-01',
        status: 'Compliant'
      },
      {
        environment: 'Production',
        id: 'PATCH-007',
        hostname: 'orion-scheduler-prod-02.subdomain.domain.com',
        ip: '192.168.1.41',
        patchDate: '2024-06-01',
        status: 'Compliant'
      },
      {
        environment: 'Production',
        id: 'PATCH-008',
        hostname: 'orion-scheduler-prod-03.subdomain.domain.com',
        ip: '192.168.1.42',
        patchDate: '2024-06-01',
        status: 'Compliant'
      },
      {
        environment: 'Production',
        id: 'PATCH-009',
        hostname: 'orion-scheduler-prod-04.subdomain.domain.com',
        ip: '192.168.1.43',
        patchDate: '2024-06-01',
        status: 'Compliant'
      }
    ],
    downtime: [
      {
        type: 'planned',
        id: 'DOWN000358243',
        title: 'Scheduler maintenance',
        outageStart: '05/10/2024 14:00',
        outageEnd: '05/10/2024 18:00',
        downtimeTotal: 4.0,
      },
      {
        type: 'unplanned',
        id: 'DOWN000358244',
        title: 'Network connectivity issue',
        outageStart: '05/05/2024 09:00',
        outageEnd: '05/05/2024 13:00',
        downtimeTotal: 4.0,
      }
    ],
    majorIncident: [],
    groupName: 'Scheduler',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
  {
    id: 5,
    name: 'Pulse Mobile',
    compliance: { 
      compliant: true, 
      complianceSince: '2024-04-01' 
    },
    issues: [],
    vulnerabilities: [],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-010',
        hostname: 'pulse-mobile-prod-01.subdomain.domain.com',
        ip: '192.168.1.50',
        patchDate: '2024-06-01',
        status: 'Compliant'
      },
      {
        environment: 'Production',
        id: 'PATCH-011',
        hostname: 'pulse-mobile-prod-02.subdomain.domain.com',
        ip: '192.168.1.51',
        patchDate: '2024-06-01',
        status: 'Compliant'
      }
    ],
    downtime: [],
    majorIncident: [],
    groupName: 'Mobile',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  {
    id: 6,
    name: 'Helix Gateway',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-05' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72299676',
        title: 'Gateway timeout in load balancer',
        status: 'Open',
        priority: 1,
        dueDate: '2024-07-05',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-10',
        dri: 'Bob Wilson',
        category: 'operational'
      }
    ],
    vulnerabilities: [],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-012',
        hostname: 'helix-gateway-prod-01.subdomain.domain.com',
        ip: '192.168.1.60',
        patchDate: '2024-06-01',
        status: 'Pending'
      },
      {
        environment: 'Production',
        id: 'PATCH-013',
        hostname: 'helix-gateway-prod-02.subdomain.domain.com',
        ip: '192.168.1.61',
        patchDate: '2024-06-01',
        status: 'Pending'
      }
    ],
    downtime: [],
    majorIncident: [],
    groupName: 'Gateway',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Application.deleteMany({});
    await OpexData.deleteMany({});

    console.log('Cleared existing data');

    // Insert applications
    await Application.insertMany(applications);
    console.log('Inserted applications data');

    // Insert opex data
    await OpexData.insertMany(opexData);
    console.log('Inserted opex data');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 