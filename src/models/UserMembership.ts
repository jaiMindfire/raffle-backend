import mongoose, { Schema, Document } from "mongoose";

export interface IUserMembership extends Document {
  _id: string;
  tier: mongoose.Schema.Types.ObjectId;
  upgradeHistory: Date[];
  expirationDate: Date;
}

const UserMembershipSchema: Schema<IUserMembership> = new mongoose.Schema(
  {
    tier: { type: mongoose.Schema.Types.ObjectId, ref: "Membership" },
    upgradeHistory: [{ type: Date }],
    expirationDate: { type: Date },
  },
  { timestamps: true }
);

export const UserMembership = mongoose.model<IUserMembership>(
  "UserMembership",
  UserMembershipSchema
);
