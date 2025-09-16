const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/authMiddleware');
const { applyForJob, getApplications } = require('../controllers/applicationController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'src/uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/:jobId', auth, upload.single('resume'), applyForJob);
router.get('/', auth, getApplications);

module.exports = router;
