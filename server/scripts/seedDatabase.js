const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Application = require('../models/Application');
const OpexData = require('../models/OpexData');

// Sample applications data
const applications = [
  {
    id: 'atlas-crm',
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
    id: 'nova-analytics',
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
    id: 'zenith-portal',
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
    id: 'orion-scheduler',
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
    id: 'pulse-mobile',
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
    id: 'helix-gateway',
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
    id: 'atlas-crm',
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