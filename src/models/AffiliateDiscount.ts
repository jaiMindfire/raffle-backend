import mongoose, { Schema, Document } from "mongoose";

export interface IAffiliateDiscount extends Document {
  partnerId: mongoose.Schema.Types.ObjectId;
  discount: number;
}

const AffiliateDiscountSchema: Schema<IAffiliateDiscount> = new mongoose.Schema(
  {
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner" },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const AffiliateDiscount = mongoose.model<IAffiliateDiscount>(
  "AffiliateDiscount",
  AffiliateDiscountSchema
);
