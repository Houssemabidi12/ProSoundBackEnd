const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
router.put("/resetpassword/:resetToken", async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    user.password = await bcrypt.hash(req.body.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
});
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
module.exports = router;
