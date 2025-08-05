const express = require('express');
const router = express.Router();
const moment = require('moment');

// Mock operational excellence data for each app
const opexData = {
  'atlas-crm': {
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
  },
  'nova-analytics': {
    id: 'nova-analytics',
    name: 'Nova Analytics',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-20' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72137489',
        title: 'Data sync error causing intermittent failures',
        status: 'Open',
        priority: 2,
        dueDate: '2024-06-30',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-05',
        dri: 'Edward Scissorhands',
        category: 'operational'
      },
      {
        source: 'anteater',
        id: '72137490',
        title: 'UI bug in analytics dashboard',
        status: 'In Progress',
        priority: 3,
        dueDate: '2024-06-25',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-06-30',
        dri: 'Monica A',
        category: 'operational'
      },
      {
        source: 'anteater',
        id: '72137491',
        title: 'Add alpha/numeric link sorting',
        status: 'Analyze',
        priority: 1,
        dueDate: '2024-07-10',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-15',
        dri: 'Monica A',
        category: 'accessibility'
      }
    ],
    vulnerabilities: [
      {
        risk: 'vuln',
        id: 'VULN-002',
        vulnerability: 'Log4Shell CVE-2021-44228',
        category: 'category 2',
        fixByDate: '06/09/2024 13:00',
        hosts: 3
      },
      {
        risk: 'vuln',
        id: 'VULN-003',
        vulnerability: 'Spring4Shell CVE-2022-22965',
        category: 'category 1',
        fixByDate: '06/15/2024 09:00',
        hosts: 1
      }
    ],
    patching: [
      {
        environment: 'Test',
        id: 'PATCH-003',
        hostname: 'nova-analytics-test-01.subdomain.domain.com',
        ip: '192.168.1.20',
        patchDate: '2024-05-15',
        status: 'Expired'
      },
      {
        environment: 'Production',
        id: 'PATCH-004',
        hostname: 'nova-analytics-prod-01.subdomain.domain.com',
        ip: '192.168.1.21',
        patchDate: '2024-06-01',
        status: 'Pending'
      }
    ],
    downtime: [
      {
        type: 'unplanned',
        id: 'DOWN000358999',
        title: 'Unexpected Database Outage',
        outageStart: '06/01/2024 10:00',
        outageEnd: '06/01/2024 12:00',
        downtimeTotal: 2.0,
      },
      {
        type: 'planned',
        id: 'DOWN000358241',
        title: 'System Upgrade',
        outageStart: '05/20/2024 02:00',
        outageEnd: '05/20/2024 06:00',
        downtimeTotal: 4.0,
      }
    ],
    majorIncident: [],
    groupName: 'Analytics',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
  'zenith-portal': {
    id: 'zenith-portal',
    name: 'Zenith Portal',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-15' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72137492',
        title: 'Login failure affecting 5% of users',
        status: 'Open',
        priority: 1,
        dueDate: '2024-06-20',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-06-25',
        dri: 'Jack the Ripper',
        category: 'operational'
      },
      {
        source: 'anteater',
        id: '72137493',
        title: 'Accessibility compliance audit required',
        status: 'Analyze',
        priority: 2,
        dueDate: '2024-07-01',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-10',
        dri: 'Monica A',
        category: 'accessibility'
      }
    ],
    vulnerabilities: [
      {
        risk: 'vuln',
        id: 'VULN-004',
        vulnerability: 'Apache Struts CVE-2023-50164',
        category: 'category 1',
        fixByDate: '06/20/2024 14:00',
        hosts: 2
      }
    ],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-005',
        hostname: 'zenith-portal-prod-01.subdomain.domain.com',
        ip: '192.168.1.30',
        patchDate: '2024-05-20',
        status: 'Overdue'
      }
    ],
    downtime: [
      {
        type: 'planned',
        id: 'DOWN000358242',
        title: 'Security Patch Deployment',
        outageStart: '05/25/2024 01:00',
        outageEnd: '05/25/2024 03:00',
        downtimeTotal: 2.0,
      }
    ],
    majorIncident: [],
    groupName: 'Portal',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  'orion-scheduler': {
    id: 'orion-scheduler',
    name: 'Orion Scheduler',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-10' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72137494',
        title: 'Scheduler timeout causing job failures',
        status: 'In Progress',
        priority: 1,
        dueDate: '2024-06-15',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-06-20',
        dri: 'Edward Scissorhands',
        category: 'operational'
      }
    ],
    vulnerabilities: [
      {
        risk: 'vuln',
        id: 'VULN-005',
        vulnerability: 'Outdated library',
        category: 'category 2',
        fixByDate: '06/25/2024 11:00',
        hosts: 1
      }
    ],
    patching: [
      {
        environment: 'Test',
        id: 'PATCH-006',
        hostname: 'orion-scheduler-test-01.subdomain.domain.com',
        ip: '192.168.1.40',
        patchDate: '2024-05-10',
        status: 'Expired'
      },
      {
        environment: 'Production',
        id: 'PATCH-007',
        hostname: 'orion-scheduler-prod-01.subdomain.domain.com',
        ip: '192.168.1.41',
        patchDate: '2024-05-25',
        status: 'Pending'
      }
    ],
    downtime: [
      {
        type: 'unplanned',
        id: 'DOWN000359000',
        title: 'Scheduler Service Failure',
        outageStart: '05/15/2024 14:00',
        outageEnd: '05/15/2024 16:00',
        downtimeTotal: 2.0,
      }
    ],
    majorIncident: [],
    groupName: 'Scheduler',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
  'pulse-mobile': {
    id: 'pulse-mobile',
    name: 'Pulse Mobile',
    compliance: { 
      compliant: true, 
      complianceSince: '2024-04-01' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72137495',
        title: 'Mobile app accessibility improvements',
        status: 'Analyze',
        priority: 3,
        dueDate: '2024-07-30',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-08-05',
        dri: 'Monica A',
        category: 'accessibility'
      }
    ],
    vulnerabilities: [],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-008',
        hostname: 'pulse-mobile-prod-01.subdomain.domain.com',
        ip: '192.168.1.50',
        patchDate: '2024-06-01',
        status: 'Compliant'
      },
      {
        environment: 'Test',
        id: 'PATCH-009',
        hostname: 'pulse-mobile-test-01.subdomain.domain.com',
        ip: '192.168.1.51',
        patchDate: '2024-06-01',
        status: 'Compliant'
      }
    ],
    downtime: [
      {
        type: 'planned',
        id: 'DOWN000358243',
        title: 'Mobile API Update',
        outageStart: '06/05/2024 03:00',
        outageEnd: '06/05/2024 05:00',
        downtimeTotal: 2.0,
      }
    ],
    majorIncident: [],
    groupName: 'Mobile',
    gatehouseCheckin: true,
    gatehouseCheckinDate: '2024-06-01',
  },
  'helix-gateway': {
    id: 'helix-gateway',
    name: 'Helix Gateway',
    compliance: { 
      compliant: false, 
      complianceSince: '2024-05-05' 
    },
    issues: [
      {
        source: 'anteater',
        id: '72137496',
        title: 'Gateway timeout causing connection drops',
        status: 'Open',
        priority: 1,
        dueDate: '2024-06-10',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-06-15',
        dri: 'Jack the Ripper',
        category: 'operational'
      },
      {
        source: 'anteater',
        id: '72137497',
        title: 'Gateway security compliance review',
        status: 'Analyze',
        priority: 2,
        dueDate: '2024-07-01',
        keywords: 'K2-AX, K2-OpEx',
        fixEta: '2024-07-10',
        dri: 'Edward Scissorhands',
        category: 'compliance'
      }
    ],
    vulnerabilities: [
      {
        risk: 'vuln',
        id: 'VULN-006',
        vulnerability: 'Heartbleed CVE-2014-0160',
        category: 'category 1',
        fixByDate: '06/30/2024 16:00',
        hosts: 3
      }
    ],
    patching: [
      {
        environment: 'Production',
        id: 'PATCH-010',
        hostname: 'helix-gateway-prod-01.subdomain.domain.com',
        ip: '192.168.1.60',
        patchDate: '2024-05-05',
        status: 'Overdue'
      }
    ],
    downtime: [
      {
        type: 'unplanned',
        id: 'DOWN000359001',
        title: 'Gateway Connection Failure',
        outageStart: '05/10/2024 09:00',
        outageEnd: '05/10/2024 11:00',
        downtimeTotal: 2.0,
      },
      {
        type: 'planned',
        id: 'DOWN000358244',
        title: 'Gateway Maintenance',
        outageStart: '05/20/2024 00:00',
        outageEnd: '05/20/2024 02:00',
        downtimeTotal: 2.0,
      }
    ],
    majorIncident: [],
    groupName: 'Gateway',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '2024-06-01',
  },
};

// GET /api/v1/app/opex/:appId
// Returns operational excellence data for a specific app
router.get('/opex/:appId', (req, res) => {
  try {
    const { appId } = req.params;
    const appData = opexData[appId];
    
    if (!appData) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    // Calculate compliance duration
    const currentDatetime = moment();
    const complianceSinceDatetime = moment(appData.compliance.complianceSince);
    const complianceDuration = currentDatetime.diff(complianceSinceDatetime, 'days');
    
    // Add calculated fields
    const responseData = {
      ...appData,
      complianceDuration,
      // Add any additional calculated fields here
    };
    
    res.json(responseData);
  } catch (error) {
    console.error('Error in /opex/:appId endpoint:', error);
    res.status(500).json({ error: 'Failed to get operational excellence data' });
  }
});

// GET /api/v1/app/appdata/:appId/vulns/:qid/hosts
// Returns host data for a specific vulnerability
router.get('/appdata/:appId/vulns/:qid/hosts', (req, res) => {
  try {
    const { appId, qid } = req.params;
    
    // Mock host data
    const hostData = {
      body: [
        {
          hostname: 'host-001.example.com',
          ip: '192.168.1.100',
          status: 'affected',
          lastScan: '2024-06-01T10:00:00Z'
        },
        {
          hostname: 'host-002.example.com',
          ip: '192.168.1.101',
          status: 'affected',
          lastScan: '2024-06-01T10:00:00Z'
        }
      ]
    };
    
    res.json(hostData);
  } catch (error) {
    console.error('Error in /appdata/:appId/vulns/:qid/hosts endpoint:', error);
    res.status(500).json({ error: 'Failed to get host data' });
  }
});

module.exports = router; 