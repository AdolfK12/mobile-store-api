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
    console.log(err);
    next(err);
  }
}

module.exports = admin;
