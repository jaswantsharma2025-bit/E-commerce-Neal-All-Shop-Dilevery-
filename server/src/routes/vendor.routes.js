const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth.middleware");
const vendorController = require("../controllers/vendor.controller");

router.get(
  "/me",
  protect,
  authorize("vendor"),
  vendorController.getVendorProfile
);

module.exports = router;
