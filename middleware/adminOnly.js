const { User } = require("../models/index");

async function admin(req, res, next) {
  try {
    const { UserId } = req.additionsData;
    const user = await User.findByPk(UserId);

    if (!user) {
      throw { name: "NotFound", message: "User not found" };
    }

    if (user.role.toLowerCase() === "admin") {
      next();
    } else {
      throw {
        name: "Unauthorized",
        message: "User is not authorized to perform this action",
      };
    }
  } catch (err) {
    console.error(err);

    res.status(403).json({
      message: err.message || "Forbidden: Access denied",
      error: err.name || "Unauthorized",
    });
  }
}

module.exports = admin;
