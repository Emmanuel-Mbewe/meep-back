const express = require("express");
const router = express.Router();
const userController = require("../Controlers/userController");
const { authenticate, restrict } = require("../middleware/verifyToken");

// Create a new user (accessible to all)
router.post("/", userController.createUser);

// Get all users (accessible to all)
router.get("/", authenticate, restrict(["admin"]), userController.getAllUsers);

// Get user by ID (accessible to all authenticated users)
router.get("/:id", authenticate, userController.getUserById);

// Update user by ID (accessible to admins only)
router.put("/:id", authenticate, restrict(["admin"]), userController.updateUserById);

// Delete user by ID (accessible to admins only)
router.delete("/:id", authenticate, restrict(["admin"]), userController.deleteUserById);

module.exports = router;
