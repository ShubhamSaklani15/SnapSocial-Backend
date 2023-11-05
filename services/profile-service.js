const userModel = require('../model/user');
const _ = require('lodash');

/*
endpoint: /get-profile-image/:username
function: getProfileImage
description: get profile image
*/
exports.getProfileImage = async (req, res) => {
    console.log("Inside getProfileImage");
    const username = req.params.username;
        try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
            throw "User Not Found";
        } else if (JSON.stringify(user.profile) === JSON.stringify({})) {
            throw "Profile Image Not Found";
        } else {
            res.setHeader('Content-Type', user.profile.contentType);
            res.status(200).send(user.profile.data);
        }
    } catch (error) {
        console.log("Error inside getProfileImage: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
};

/*
endpoint: /update-profile-image
function: updateProfileImage
description: upload profile image
*/
exports.updateProfileImage = async (req, res) => {
    console.log("Inside updateProfileImage...");
    const profile = {
        data: req.file.buffer,
        contentType: req.file.mimetype
    }
    try {
        const user = await userModel.findOne({ username: req.body.username });
        if (!user) {
            throw "User not found";
        }
        user.profile = profile;
        await user.save();
        console.log("Profile image uploaded successfully.");
        res.status(200).send({
            message: "Profile Image uploaded successfully",
            time: new Date()
        });
    } catch (error) {
        console.log("Error inside updateProfileImage: ", error);
        res.status(401).send({
            message: error,
            time: new Date()
        });
    }
};