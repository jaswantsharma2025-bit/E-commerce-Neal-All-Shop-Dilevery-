exports.getVendorProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    vendor: req.user,
  });
};