import mongoose, { Schema, Document } from "mongoose";

export interface IReferrals extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  referredUserId: mongoose.Schema.Types.ObjectId;
  reward: {
    type: string;
    amount: number;
  };
  referralDate: Date;
}

const ReferralsSchema: Schema<IReferrals> = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reward: {
      type: { type: String, required: true },
      amount: { type: Number, required: true },
    },
    referralDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Referrals = mongoose.model<IReferrals>(
  "Referrals",
  ReferralsSchema
);
