const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });
    res.redirect('/auth/login');
  } catch (err) {
    res.status(400).send("Registration failed");
  }
}

// Login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // cookie
    res.cookie("token", token, { httpOnly: true });
    res.redirect('/home');
  } catch {
    res.status(400).send("Login failed");
  }
}

function showRegister(req, res) {
  res.render('index');
}

function showLogin(req, res) {
  res.render('login');
}

// Logout
function logout(req, res) {
  res.clearCookie("token");
  res.redirect('/');
}

module.exports = {
  register,
  login,
  showRegister,
  showLogin,
  logout
};