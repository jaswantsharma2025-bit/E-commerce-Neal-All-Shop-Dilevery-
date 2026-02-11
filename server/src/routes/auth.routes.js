const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

/* CUSTOMER */
router.post("/customer/signup", authController.customerSignup);
router.post("/customer/login", authController.customerLogin);

/* VENDOR */
router.post("/vendor/signup", authController.vendorSignup);
router.post("/vendor/login", authController.vendorLogin);

module.exports = router;
