const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function auth(req, res, next) {
  try {
    const { token } = req.headers;

    if (!token) {
      throw { name: "Unauthenticated", message: "Please provide a token" };
    }

    const payload = verifyToken(token);

    if (!payload) {
      throw { name: "Unauthenticated", message: "Invalid token" };
    }

    let user = await User.findOne({ where: { id: payload.id } });

    if (!user) {
      throw { name: "Unauthenticated", message: "User not found" };
    }

    req.additionsData = {
      UserId: user.id,
      Email: user.email,
      Role: user.role,
    };

    next();
  } catch (err) {
    console.error(err);
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    next(err);
  }
}

module.exports = auth;
