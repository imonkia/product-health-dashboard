const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

// GET /api/v1/app/applications
// Returns list of all applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find({}).sort({ name: 1 });
    res.json(applications);
  } catch (error) {
    console.error('Error in /applications endpoint:', error);
    res.status(500).json({ error: 'Failed to get applications' });
  }
});

// GET /api/v1/app/applications/:id
// Returns specific application by ID
router.get('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Invalid application ID' });
    }
    
    const application = await Application.findOne({ id: numericId });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Error in /applications/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to get application' });
  }
});

// PUT /api/v1/app/applications/:id
router.put('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    const updateData = req.body;

    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Invalid application ID' });
    }

    // Validate required fields
    if (!updateData.name || !updateData.category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    // Update the application
    const updatedApplication = await Application.findOneAndUpdate(
      { id: numericId },
      {
        name: updateData.name,
        category: updateData.category,
        groupName: updateData.groupName || '',
        gatehouseCheckin: updateData.gatehouseCheckin || false,
        gatehouseCheckinDate: updateData.gatehouseCheckinDate || '',
        links: updateData.links || [],
        // Add any additional fields that might be updated
        customKeywords: updateData.customKeywords || '',
        emailNotifications: updateData.emailNotifications || false,
        emailNotificationFrequency: updateData.emailNotificationFrequency || 'Monthly',
        p0p1cP2hIncidents: updateData.p0p1cP2hIncidents || false,
        includeInitialCi: updateData.includeInitialCi || false,
        supportHours: updateData.supportHours || false,
        abcWorkgroup: updateData.abcWorkgroup || ''
      },
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(updatedApplication);
  } catch (error) {
    console.error('Error in PUT /applications/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
});

// DELETE /api/v1/app/applications/:id
router.delete('/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    
    if (isNaN(numericId)) {
      return res.status(400).json({ error: 'Invalid application ID' });
    }

    // Delete the application
    const deletedApplication = await Application.findOneAndDelete({ id: numericId });

    if (!deletedApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application deleted successfully', deletedApplication });
  } catch (error) {
    console.error('Error in DELETE /applications/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

module.exports = router; 