import { MongoError } from "mongodb";
import mongoose from "mongoose";

export const handleDbError = (error: any) => {
  if (error instanceof mongoose.Error.ValidationError) {
    throw new Error(
      "Validation failed: " +
        Object.values(error.errors)
          .map((e) => e.message)
          .join(", ")
    );
  }

  if (error instanceof MongoError && error.code === 11000) {
    throw new Error(
      "Duplicate key error: A record with this value already exists."
    );
  }

  throw new Error("Database operation failed: " + "Something went wrong");
};
