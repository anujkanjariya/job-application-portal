const express = require('express');
const mongoose = require('./config/db');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/jobs', require('./routes/jobs'));
app.use('/applications', require('./routes/applications'));

const auth = require('./middleware/authMiddleware');
app.get('/home', auth, (req, res) => 
    res.render('home', {user: req.user}));

app.get('/', (req, res) => res.render('index'));

module.exports = app;
