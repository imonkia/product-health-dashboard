const express = require('express');
const router = express.Router();

// Mock applications data
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

// GET /api/v1/app/applications
// Returns list of all applications
router.get('/applications', (req, res) => {
  try {
    res.json(applications);
  } catch (error) {
    console.error('Error in /applications endpoint:', error);
    res.status(500).json({ error: 'Failed to get applications' });
  }
});

// GET /api/v1/app/applications/:id
// Returns specific application by ID
router.get('/applications/:id', (req, res) => {
  try {
    const { id } = req.params;
    const application = applications.find(app => app.id === id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error in /applications/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to get application' });
  }
});

module.exports = router; 