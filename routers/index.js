const express = require("express");
const Controller = require("../controllers");
const auth = require("../middleware/authentication");
const adminOnly = require("../middleware/adminOnly");
const authorization = require("../middleware/authorization");
const router = express.Router();

// User routes
router.post("/users", Controller.register);
router.post("/users/login", Controller.login);
router.get("/users/profile", auth, Controller.getUserProfile);
router.put("/users/profile", auth, Controller.updateUserProfile);
router.delete("/users/profile", auth, Controller.deleteUser);

// Product routes
router.get("/products", Controller.getAllProducts);
router.get("/products/:id", Controller.getProductById);
router.post("/products", auth, adminOnly, Controller.createProduct);
router.put("/products/:id", auth, adminOnly, Controller.updateProduct);
router.delete("/products/:id", auth, adminOnly, Controller.deleteProduct);

module.exports = router;
