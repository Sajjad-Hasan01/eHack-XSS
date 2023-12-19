const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/Users.model');
const StudentModel = require('./models/Students.model');
const LectureModel = require('./models/Lectures.model');
const { cookieJwtAuth } = require('./middleware/cookieJwtAuth');
const { profileRoute } = require('./routes/profile');
const { loginRoute } = require('./routes/login');
const { logoutRoute } = require('./routes/logout');
require("dotenv").config();

export const generateToken = (user) => {
    delete user.password;
    const token = jwt.sign(user , process.env.SECRET, { expiresIn: 3600 });
};

export const getUserByEmail = async (email) => {
    return await UserModel.findOne({ email });
};

function parseCookies (request) {
    const list = {};
    const cookieHeader = request.headers['set-cookie'];

    if (!cookieHeader) return list;
    const cookies = cookieHeader[0];

    cookies.split(`,`).forEach(cookie => {
        let [ name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}