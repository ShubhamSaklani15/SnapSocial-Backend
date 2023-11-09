const express = require('express');
const router = express.Router();
const authService = require("../services/auth-service");
const validationService = require("../services/validation-service");
const profileService = require("../services/profile-service");
const postService = require("../services/post-service");
const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* login-register routes */
router.post("/generate-otp", validationService.generateOtp);

router.post("/validate-otp/:otp", validationService.validateOtp);

router.post("/login", authService.login);

/* profile routes */
router.post('/update-profile-image', upload.single('image'), profileService.updateProfileImage);

router.get('/get-profile-image/:username', profileService.getProfileImage);

/* post routes */
router.post('/add-new-post', postService.addNewPost);

router.get('/get-all-posts/:pageNumber', postService.getAllPosts);

router.get('/get-posts/:username/:pageNumber', postService.getPosts);

router.delete('/delete-post/:id', postService.deletePost);

module.exports = router;