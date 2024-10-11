import express from "express";
//File imports
import {
  createMembershipController,
  updateMembershipController,
  deleteMembershipController,
  buyMembershipController,
  getAllMembershipsController,
} from "@controllers/membershipController";
import { authenticateJWT } from "@middlewares/authentication";
import { authorizeRoles } from "@middlewares/authorization";
import {
  buyMembershipValidation,
  createMembershipValidation,
  deleteMembershipValidation,
  updateMembershipValidation,
} from "@middlewares/validators";

const router = express.Router();
router.use(authenticateJWT);
// @route   POST /api/membeship/create
// @desc    Create a membership
// @access  admin
router.post(
  "/create",
  authorizeRoles(["admin"]),
  createMembershipValidation,
  createMembershipController
);

/// @route   PUT /api/membeship/:id
// @desc    Update a membership
// @access  admin
router.put(
  "/:id",
  authorizeRoles(["admin"]),
  updateMembershipValidation,
  updateMembershipController
);

// @route   DELETE /api/membeship/:id
// @desc    Delete a membership
// @access  admin
router.delete(
  "/:id",
  authorizeRoles(["admin"]),
  deleteMembershipValidation,
  deleteMembershipController
);

/// @route   GET /api/membeship/
// @desc    get all memberships
// @access  user
router.get("/", getAllMembershipsController);

// @route   POST /api/membeship/buy/:membershipId
// @desc    Buy a membership
// @access  user
router.post(
  "/buy/:membershipId",
  buyMembershipValidation,
  buyMembershipController
);

export default router;
