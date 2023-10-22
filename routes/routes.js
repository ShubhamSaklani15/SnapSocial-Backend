const express = require('express');
const router = express.Router();
const authService = require("../services/auth-service");
const validationService = require("../services/validation-service");

router.post("/generate-otp", validationService.generateOtp);

router.post("/validate-otp/:otp", validationService.validateOtp);

router.post("/login", authService.login);

module.exports = router;