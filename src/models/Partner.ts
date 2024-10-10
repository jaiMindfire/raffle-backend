import mongoose, { Schema, Document } from "mongoose";

export interface IPartner extends Document {
  partnerName: string;
  partnershipDetails: {
    startDate: Date;
    endDate: Date;
    terms: string;
  };
  userClicks: {
    userId: mongoose.Schema.Types.ObjectId;
    clickDate: Date;
    productPage: string;
  }[];
}

const PartnerSchema: Schema<IPartner> = new mongoose.Schema(
  {
    partnerName: { type: String, required: true },
    partnershipDetails: {
      startDate: { type: Date },
      endDate: { type: Date },
      terms: { type: String },
    },
    userClicks: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        clickDate: { type: Date },
        productPage: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Partner = mongoose.model<IPartner>("Partner", PartnerSchema);
