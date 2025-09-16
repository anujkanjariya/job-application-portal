const router = require('express').Router();
const { register, login, showRegister, showLogin, logout } = require('../controllers/authcontroller');

router.get('/register', showRegister);
router.post('/register', register);

router.get('/login', showLogin);
router.post('/login', login);

router.get('/logout', logout);

module.exports = router;
