import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  paymentType: string;
  amount: number;
  currency: string;
  transactionId: string;
  status: "pending" | "completed" | "failed";
  paymentDate: Date;
}

const PaymentSchema: Schema<IPayment> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
      enum: ["credit_card", "paypal", "bank_transfer", "other"],
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: "USD" },
    transactionId: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
