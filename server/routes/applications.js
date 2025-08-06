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
    const application = await Application.findOne({ id: id });
    
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