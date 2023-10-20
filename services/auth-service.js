const userModel = require('../model/user');
const _ = require('lodash');

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
            res.status(200).send({
                user: user,
                time: new Date()
            });
        }
    } catch (error) {
        res.send({
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
        //joi validation
        const users = await userModel.find();

        //check if username already exist
        const existingUser = users.filter(user => user.username == userData.username);
        if (!_.isEmpty(existingUser)) {
            throw "Username already exist";
        }

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
        res.send({
            message: error,
            time: new Date()
        });
    }
}