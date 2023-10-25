const express = require('express');
const router = express.Router();
const authService = require("../services/auth-service");
const validationService = require("../services/validation-service");
const profileService = require("../services/profile-service");
const multer = require('multer');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/generate-otp", validationService.generateOtp);

router.post("/validate-otp/:otp", validationService.validateOtp);

router.post("/login", authService.login);

router.post('/update-profile-image', upload.single('image'), profileService.updateProfileImage);

router.get('/get-profile-image/:username', profileService.getProfileImage);


module.exports = router;