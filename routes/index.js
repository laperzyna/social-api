const router = require('express').Router();
const apiRoutes = require('./apis');

// route to use api routes
router.use('/api', apiRoutes);

// error handling
router.use((req, res) => {
    res.status(404).send('<h1>404 Error....</h1>');
  });

module.exports = router;