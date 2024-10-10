import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  socialMediaId?: string;
  role: "admin" | "user" | "partner";
  avatarUrl?: string;
  bankNumber?: string;
  referralCode?: string;
  referredUser?: mongoose.Schema.Types.ObjectId;
  ticketsAvailable: number;
  raffleParticipation: {
    raffleId: mongoose.Schema.Types.ObjectId;
    ticketUsed: boolean;
  }[];
  coinsAvailable: number;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password: {
      type: String,
      required: function () {
        // Password is required only if the user is not authenticated via OAuth
        console.log(this.socialMediaId,'sodfdsfdf')
        return !this.socialMediaId; // Make it required only if googleId is not present
      },
      minlength: [6, "Password must be at least 6 characters"],
    },
    socialMediaId: String,
    role: {
      type: String,
      enum: ["admin", "user", "partner"],
      default: "user",
    },
    avatarUrl: String,
    bankNumber: String,
    referralCode: String,
    referredUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ticketsAvailable: { type: Number, default: 0 },
    raffleParticipation: [
      {
        raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffle" },
        ticketUsed: { type: Boolean, default: false },
      },
    ],
    coinsAvailable: { type: Number, default: 0 },
  },
  { timestamps: true }
);

//encrypting the password before saving the yser
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

//compare the plain password with the encrypted password
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>("User", UserSchema);
