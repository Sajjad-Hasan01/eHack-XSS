const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const dbConnection = require('./db');
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');
const { profileRoute } = require('./routes/profile');
const { commentsRoute } = require('./routes/comments');
const { addCommentRoute } = require('./routes/addcomment');
const { addTokenRoute } = require('./routes/addToken.js');
const { signupRoute } = require('./routes/signup');
const { loginRoute } = require('./routes/login');
const { logoutRoute } = require('./routes/logout');
require("dotenv").config();
const CommentModel = require('./models/Comments.model.js');

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

app.get("/", async (req, res) => {
    try {
        let comments = await CommentModel.find();
        res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-Hack</title>
    <style>*{box-sizing:border-box}body{margin:0;padding:2rem 10%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#282c34;color:#fff;font-size:calc(10px + 2vmin)}nav *{margin-inline-end:1rem;padding:.5rem}a{font-family:source-code-pro,Menlo,Monaco,Consolas,'Courier New',monospace;color:#61dafb}form{max-width:400px;margin:2rem auto;display:flex;flex-direction:column}button,input{width:100%;height:3rem;border-radius:8px;padding-inline:.5rem;border:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif;font-size:1.2rem;background-color:rgba(255,255,255,.8)}button{margin-top:2rem;height:4rem;background-color:#b193f1;font-weight:700;cursor:pointer}.comments>div{border:2px solid #eee;border-radius:8px;padding:1rem;margin-block:.5rem}</style>
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
        <a href="/signup">Signup</a>
        <a href="/login">Login</a>
        <a href="/logout">Logout</a>
    </nav>
    
    <h1>Home</h1>

    <form action="http://localhost:3000/api/addcomment" method="post" id="commentform">
        <input type="text" name="comment" id="comment" placeholder="write here...">
        <button type="submit">Add Comment</button>
    </form>

    <div class="comments" id="commentsContainer">
        ${comments.map(({comment}) => {
            return `<div>${comment}</div>`
        })}
    </div>

    <script>
        const form = document.getElementById('commentform');
        const input = document.getElementById('comment');
        form.addEventListener('submit', (e) => signUp(e))
        async function signUp(e){
            e.preventDefault();
            if (input.value == "" ) { return }
            const res = await fetch('http://localhost:3000/api/addcomment',{
                method:'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: input.value
                })
            })
            if(res.redirected) window.location.replace(res.url);
        }
    </script>
</body>
</html>`)
    } catch (error) {
        console.log(error)
        res.send()
    }
});
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
app.post('/api/xss', async (req, res) => addTokenRoute(req, res));
// app.get('/api/xss', async (req, res) => res.sendFile(path.join(__dirname, '/xss.js')));

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