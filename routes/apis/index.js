const router = require('express').Router();
const usersRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');

// setting to use User and Thoughts model
router.use('/User', usersRoutes);
router.use('/Thoughts', thoughtsRoutes);

module.exports = router;