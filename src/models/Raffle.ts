import mongoose, { Schema, Document } from "mongoose";

export interface IRaffle extends Document {
  raffleName: string;
  description: string;
  entryFee: number;
  startDate: Date;
  endDate: Date;
  participants: {
    userId: mongoose.Schema.Types.ObjectId;
    ticketUsed: number;
    prizeWon: boolean;
  }[];
  prizeCoins: number;
}

const RaffleSchema: Schema<IRaffle> = new mongoose.Schema(
  {
    raffleName: { type: String, required: true },
    description: String,
    entryFee: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    participants: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        ticketUsed: { type: Number },
        prizeWon: { type: Boolean, default: false },
      },
    ],
    prizeCoins: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Raffle = mongoose.model<IRaffle>("Raffle", RaffleSchema);
