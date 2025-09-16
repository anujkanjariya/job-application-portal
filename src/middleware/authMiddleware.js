const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect('/auth/login');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password")
     if (!user) {
      return res.redirect('/auth/login');
    }
    req.user = user;
    next();
  } catch (err) {
    res.redirect('/auth/login');
    console.log(err);
  }
}

module.exports = authMiddleware;  