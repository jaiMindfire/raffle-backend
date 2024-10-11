import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
//File imports
import {
  createMembership,
  updateMembership,
  deleteMembership,
  buyMembershipWithCoins,
  getAllMemberships,
} from "@services/membershipService";

//Get all memberships
export const getAllMembershipsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const memberships = await getAllMemberships(req.body);
    res.status(201).json({
      message: "All memberships",
      membership: memberships,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new membership
export const createMembershipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newMembership = await createMembership(req.body);
    res.status(201).json({
      message: "Membership created successfully",
      membership: newMembership,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Update a membership
export const updateMembershipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updatedMembership = await updateMembership(req.params.id, req.body);
    res.status(200).json({
      message: "Membership updated successfully",
      membership: updatedMembership,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a membership
export const deleteMembershipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await deleteMembership(req.params.id);
    res.status(200).json({
      message: "Membership deleted successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// Buy membership using coins
export const buyMembershipController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const result = await buyMembershipWithCoins(
      req.userData.id,
      req.params.membershipId
    );
    res.status(200).json({
      message: "Membership purchased successfully",
      result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
