const express = require('express');
const router = express.Router();
const authService = require("../services/auth-service");
const verifyToken = require('../services/verify-token');
const validationService = require("../services/validation-service");
const profileService = require("../services/profile-service");
const postService = require("../services/post-service");
const userService = require("../services/user-service");
const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* login-register routes */
router.post("/generate-otp", validationService.generateOtp);

router.post("/validate-otp/:otp", validationService.validateOtp);

router.post("/login", authService.login);

/* profile routes */
router.post('/update-profile-image', upload.single('image'), verifyToken, profileService.updateProfileImage);

router.get('/get-profile-image/:username', verifyToken, profileService.getProfileImage);

/* post routes */
router.post('/add-new-post', verifyToken, postService.addNewPost);

router.get('/get-all-posts/:pageNumber', verifyToken, postService.getAllPosts);

router.get('/get-posts/:username/:pageNumber', verifyToken, postService.getPosts);

router.get('/update-post/:id/:username', verifyToken, postService.updatePost);

router.delete('/delete-post/:id', verifyToken, postService.deletePost);

/* user routes */
router.get('/get-new-users', verifyToken, userService.getNewUsers);

module.exports = router;