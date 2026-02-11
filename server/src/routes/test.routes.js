const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth.middleware");

router.get(
  "/customer",
  protect,
  authorize("customer"),
  (req, res) => {
    res.json({
      message: "Customer route access granted",
      user: req.user,
    });
  }
);

module.exports = router;
