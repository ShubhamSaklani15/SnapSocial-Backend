const mongoose = require('../db');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    profile: {
        data: Buffer, // Binary data for the image
        contentType: String, // MIME type of the image (e.g., 'image/jpeg')
    },
    followers: [String],
    following: [String]
}, {
    timestamps: false, // Enable/Disable timestamps for createdAt and updatedAt
}, { versionKey: false });
const userModel = new mongoose.model("user", userSchema);
module.exports = userModel;


/*
const user = new User({
  name: 'John Doe',
  // Other user properties...
  profile: {
      data: imageBinaryData, // Binary image data
      contentType: 'image/jpeg', // MIME type of the image
  },
});
*/