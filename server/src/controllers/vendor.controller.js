const User = require("../models/user");
exports.getVendorProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    vendor: req.user,
  });
};

exports.updateVendorProfile = async (req, res) => {
  try {
    const vendor = await User.findById(req.user._id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Owner updates
    vendor.name = req.body.name || vendor.name;
    vendor.phone = req.body.phone || vendor.phone;

    // Store updates
    vendor.storeName = req.body.storeName || vendor.storeName;
    vendor.storeDescription =
      req.body.storeDescription || vendor.storeDescription;
    vendor.storeAddress =
      req.body.storeAddress || vendor.storeAddress;
    vendor.storeCategory =
      req.body.storeCategory || vendor.storeCategory;
    vendor.storeImage =
      req.body.storeImage || vendor.storeImage;

    if (typeof req.body.storeOpen === "boolean") {
      vendor.storeOpen = req.body.storeOpen;
    }

    const updatedVendor = await vendor.save();

    res.status(200).json({
      success: true,
      vendor: updatedVendor,
    });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};