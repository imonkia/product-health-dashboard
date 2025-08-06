const express = require('express');
const router = express.Router();
const moment = require('moment');
const OpexData = require('../models/OpexData');

// GET /api/v1/app/opex/:appId
// Returns operational excellence data for a specific app
router.get('/opex/:appId', async (req, res) => {
  try {
    const { appId } = req.params;
    const numericAppId = parseInt(appId, 10);
    
    if (isNaN(numericAppId)) {
      return res.status(400).json({ error: 'Invalid application ID' });
    }
    
    const appData = await OpexData.findOne({ id: numericAppId });

    if (!appData) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Calculate compliance duration
    const currentDatetime = moment();
    const complianceSinceDatetime = moment(appData.compliance.complianceSince);
    const complianceDuration = currentDatetime.diff(complianceSinceDatetime, 'days');

    // Add calculated fields
    const responseData = {
      ...appData.toObject(), // Convert Mongoose document to plain object
      complianceDuration,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error in /opex/:appId endpoint:', error);
    res.status(500).json({ error: 'Failed to get operational excellence data' });
  }
});

// PUT /api/v1/app/opex/:appId
router.put('/opex/:appId', async (req, res) => {
  try {
    const { appId } = req.params;
    const numericAppId = parseInt(appId, 10);
    const updateData = req.body;
    
    if (isNaN(numericAppId)) {
      return res.status(400).json({ error: 'Invalid application ID' });
    }

    // Update the opex data
    const updatedOpexData = await OpexData.findOneAndUpdate(
      { id: numericAppId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedOpexData) {
      return res.status(404).json({ error: 'Opex data not found' });
    }

    res.json(updatedOpexData);
  } catch (error) {
    console.error('Error in PUT /opex/:appId endpoint:', error);
    res.status(500).json({ error: 'Failed to update opex data' });
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