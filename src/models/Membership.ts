import mongoose, { Schema, Document } from "mongoose";

export interface IMembership extends Document {
  tierName: string;
  price: number;
  durationInMonths: number;
  benefits: {
    raffleTickets: number;
  };
  affiliateDiscount: mongoose.Schema.Types.ObjectId[];
}

const MembershipSchema: Schema<IMembership> = new mongoose.Schema(
  {
    tierName: { type: String, required: true },
    price: { type: Number, required: true },
    durationInMonths: { type: Number, required: true },
    benefits: {
      raffleTickets: { type: Number, default: 0 },
    },
    affiliateDiscount: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AffiliateDiscount" },
    ],
  },
  { timestamps: true }
);

export const Membership = mongoose.model<IMembership>(
  "Membership",
  MembershipSchema
);
