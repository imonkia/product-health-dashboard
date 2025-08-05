const express = require('express');
const router = express.Router();

// GET /api/v1/app/user
// Returns user authentication information
router.get('/user', (req, res) => {
  try {
    // Mock user data - in a real app, this would check JWT tokens, session, etc.
    const userData = {
      authType: 'Administrator', // or 'User' for non-admin users
      userId: 'user123',
      email: 'admin@example.com',
      permissions: ['read', 'write', 'admin']
    };
    
    res.json(userData);
  } catch (error) {
    console.error('Error in /user endpoint:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

module.exports = router; 