import express from "express";
import passport from "passport";
//file imports
import {
  register,
  login,
  googleLogin,
  googleCallback,
} from "@controllers/authController";
import { registerValidation, loginValidation } from "@middlewares/validators";

const router = express.Router();

// @route   POST /api/auth/register
router.post("/register", registerValidation, register);

// @route   POST /api/auth/login
router.post("/login", loginValidation, login);

// @route   GET /api/auth/google
// @desc    Initiate Google login
// @access  Public
router.get("/google", googleLogin);

// @route   GET /api/auth/google/callback
// @desc    Handle Google login callback
// @access  Public
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback
);

export default router;
