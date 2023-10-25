const userModel = require('../model/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const authService = require('./auth-service')
require('dotenv').config(); // Load environment variables from .env
let expectedOtp;

/*
endpoint: /generate-otp
function: generateOtp
description: generate OTP (One Time Password)
*/
exports.generateOtp = async (req, res) => {
    try {
        const userData = req.body;
        console.log("userData")
        //joi validation
        const users = await userModel.find();

        //check if username already exist
        const existingUser = users.filter(user => user.username == userData.username);
        
        if (!_.isEmpty(existingUser)) {
            throw "Username already exist";
        }
        expectedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        //send otp in email
        res.status(200).send({
            message: "Success",
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside generateOtp: ",error)
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}

/*
endpoint: /validate-otp/:otp
function: validateOtp
description: validate OTP (One Time Password)
*/
exports.validateOtp = async (req, res) => {
    try {
        const userOtp = req.params.otp;
        // if (userOtp !== expectedOtp) {
        //     throw "Incorrect OTP";
        // }
        await authService.register(req, res);
    } catch (error) {
        console.log("Error inside validateOtp: ",error)
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
}