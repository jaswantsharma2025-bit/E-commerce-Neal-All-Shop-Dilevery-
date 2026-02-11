const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth.middleware");
const customerController = require("../controllers/customer.controller");

router.get(
  "/me",
  protect,
  authorize("customer"),
  customerController.getMe
);

module.exports = router;
