import { User } from "@models/User";
//File imports
import { handleDbError } from "src/utils/databaseErrorHandler";
import { Membership, IMembership } from "@models/Membership";
import { UserMembership } from "@models/UserMembership";

//Get all memberships
export const getAllMemberships = async (data: IMembership) => {
  try {
    const memberships = await Membership.find();
    return memberships;
  } catch (error) {
    handleDbError(error);
  }
};

// Create a new membership
export const createMembership = async (data: IMembership) => {
  try {
    const newMembership = new Membership(data);
    return await newMembership.save();
  } catch (error) {
    handleDbError(error);
  }
};

// Update membership
export const updateMembership = async (
  membershipId: string,
  data: Partial<IMembership>
) => {
  try {
    const updatedMembership = await Membership.findByIdAndUpdate(
      membershipId,
      data,
      { new: true }
    );
    if (!updatedMembership) throw new Error("Membership not found");
    return updatedMembership;
  } catch (error) {
    handleDbError(error);
  }
};

// Delete membership
export const deleteMembership = async (membershipId: string) => {
  try {
    const deletedMembership = await Membership.findByIdAndDelete(membershipId);
    if (!deletedMembership) throw new Error("Membership not found");
    return deletedMembership;
  } catch (error) {
    handleDbError(error);
  }
};

// Buy membership using user's coins
export const buyMembershipWithCoins = async (
  userId: string,
  membershipId: string
) => {
  try {
    const membership = await Membership.findById(membershipId);
    if (!membership) throw new Error("Membership not found");
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Check if the user has enough coins
    if (user.coinsAvailable < membership.price) {
      throw new Error("Insufficient coins to purchase this membership");
    }
    // Deduct coins from user
    user.coinsAvailable -= membership.price;
    // Create a new UserMembership record
    const userMembership = new UserMembership({
      tier: membership._id,
      expirationDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month from now
    });
    await userMembership.save();
    // Assign the membership to the user
    user.tierId = userMembership._id;
    await user.save();
    return { message: "Membership purchased successfully" };
  } catch (error) {
    handleDbError(error);
  }
};
