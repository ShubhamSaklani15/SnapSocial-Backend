const userModel = require('../model/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env

/*
function: verifyToken
description: Authentication middleware
*/
function verifyToken(req, res, next) {
    try {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).send('Unauthorized');

        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.status(403).send('Forbidden');
            req.user = user;
            next();
        });
    } catch (error) {
        console.log("Error inside verifyToken: ", error);
    }
}

/*
function: login
description: login user
*/
exports.login = async (req, res) => {
    try {
        const userData = req.body;
        //joi validation
        if (_.isEmpty(userData) || _.isEmpty(userData.username) || _.isEmpty(userData.password)) {
            throw ("Invalid request");
        }

        //find user details
        const user = await userModel.findOne({ username: userData.username });

        if (_.isEmpty(user)) {
            throw "User does not exist";
        } else if (user.password !== userData.password) {
            throw "Invalid password";
        } else {
            const secretKey = process.env.JWT_TOKEN_KEY;
            const token = jwt.sign(userData, secretKey);
            res.status(200).send({
                token: token,
                time: new Date()
            });
        }
    } catch (error) {
        console.log("Error inside login: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}

/*
function: register
description: register/create user account
*/
exports.register = async (req, res) => {
    try {
        const userData = req.body;

        //create and save user
        const user = new userModel({
            name: userData.name,
            username: userData.username,
            password: userData.password,
            profile: null,
            followers: [],
            following: []
        });
        user.save();

        res.status(200).send({
            message: "Account created",
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside register: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}