import { body, param } from "express-validator";

export const registerValidation = [
  body("username").notEmpty().withMessage("Product name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const createMembershipValidation = [
  body("tierName").notEmpty().withMessage("Tier name is required"),
  body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("durationInMonths")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Duration in months must be greater than 0"),
  body("benefits.raffleTickets")
    .isInt({ min: 0 })
    .withMessage("Raffle tickets must be a non-negative integer"),
];

export const updateMembershipValidation = [
  param("id").isMongoId().withMessage("Valid membership ID is required"),
  body("tierName").optional().notEmpty().withMessage("Tier name is required"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("durationInMonths")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Duration in months must be greater than 0"),
  body("benefits.raffleTickets")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Raffle tickets must be a non-negative integer"),
];

export const deleteMembershipValidation = [
  param("id").isMongoId().withMessage("Valid membership ID is required"),
];

export const buyMembershipValidation = [
  param("membershipId")
    .isMongoId()
    .withMessage("Valid membership ID is required"),
];
