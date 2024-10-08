const userModel = require('../model/user');
const _ = require('lodash');

/*
endpoint: /get-new-users
function: getNewUsers
description: get users who joined SnapSocial recently
*/
exports.getNewUsers = async (req, res) => {
    console.log("Inside getNewUsers");
    try {
        const newUsers = await userModel.find({}, 'username name').sort({ createdAt: -1 }).limit(10);
        console.log(newUsers[0])
        res.status(200).send({
            users: newUsers,
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside getNewUsers: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
};