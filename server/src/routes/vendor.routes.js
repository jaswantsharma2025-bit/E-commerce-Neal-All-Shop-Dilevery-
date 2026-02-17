const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth.middleware");
const vendorController = require("../controllers/vendor.controller");

router.get(
  "/profile",
  protect,
  authorize("vendor"),
  vendorController.getVendorProfile
);

router.put(
  "/profile",
  protect,
  authorize("vendor"),
  vendorController.updateVendorProfile
);

module.exports = router;