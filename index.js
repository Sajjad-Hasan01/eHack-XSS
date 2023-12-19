const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dbConnection = require('./db');
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');
const { profileRoute } = require('./routes/profile');
const { commentsRoute } = require('./routes/comments');
const { addCommentRoute } = require('./routes/addcomment');
const { signupRoute } = require('./routes/signup');
const { loginRoute } = require('./routes/login');
const { logoutRoute } = require('./routes/logout');
// const { clearCollectionRoute } = require('./routes/clearCollection');
require("dotenv").config();

const domain = process.env.DOMAIN;
const corsOptions = {
    origin: domain,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser(process.env.SECRET));

dbConnection();

app.use(express.static(path.join(__dirname, '/public')));
app.get('/login', async (req, res) => res.sendFile(path.join(__dirname, '/public', '/login.html')));
app.get('/signup', async (req, res) => res.sendFile(path.join(__dirname, '/public', '/signup.html')));
app.get('/profile', async (req, res) => res.sendFile(path.join(__dirname, '/public', '/profile.html')));

app.get('/api', async (req, res) => res.send("API of localhost:3000"));
app.post('/api/signup', async (req, res) => signupRoute(req, res));
app.post('/api/login', async (req, res) => loginRoute(req, res));
app.get('/logout', async (req, res) => logoutRoute(req, res));
app.get('/api/profile', async (req, res) => cookieJwtAuth(req, res, profileRoute));
app.get('/api/comments', async (req, res) => commentsRoute(req, res));
app.post('/api/addcomment', async (req, res) => addCommentRoute(req, res));
app.get('/api/xss', async (req, res) => res.sendFile(path.join(__dirname, '/xss.js')));
// app.use((req, res) => res.status(404).send('<h1>Error 404</h1>'));

app.listen(process.env.PORT, ()=>console.log("    Server is live ! V.1 \n    http://localhost:3000"));




/*
200 OK
201 Created
202 Accepted
203 Non-Authoritative Information
204 No Content
205 Reset Content

400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed

500 Internal Server Error
501 Not Implemented

*/