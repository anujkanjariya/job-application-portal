const router = require('express').Router();
const { seedJobs, getJobs } = require('../controllers/jobController');

router.get('/seed', seedJobs);
router.get('/', getJobs);

module.exports = router;