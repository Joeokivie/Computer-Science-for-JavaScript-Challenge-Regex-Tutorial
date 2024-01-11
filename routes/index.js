const router = require('express').Router();
const apiRoutes = require('./api');

// Home route
router.get('/', (req, res) => {
  return res.send('Welcome to the home route!');
});

// API routes
router.use('/api', apiRoutes);

// Default route for any other path
router.use((req, res) => {
  return res.send('Wrong route!');
});

module.exports = router;