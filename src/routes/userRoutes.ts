import express from "express";
//file imports
import {
  getUser,
  getUsers,
  deleteUserController,
} from "@controllers/userController";
import { authenticateJWT } from "@middlewares/authentication";
import { authorizeRoles } from "@middlewares/authorization";
import { body } from "express-validator";

const router = express.Router();

router.use(authenticateJWT, authorizeRoles(["admin"]));

// @route   GET /api/users
// @desc    Get all users
// @access  Admin
router.get("/", getUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Admin
router.get("/:id", getUser);

// @route   DELETE /api/users/:id
// @desc    Delete user by ID
// @access  Admin
router.delete("/:id", deleteUserController);

export default router;
