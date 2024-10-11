//Express modules imports
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet, { contentSecurityPolicy } from "helmet";
import morgan from "morgan";
//File imports
import connectDB from "./config/database";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import membershipRoutes from "./routes/membershipRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import passport from "passport";
import session from "express-session";

import "../src/passportGoogleSetup";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

connectDB();

app.use(helmet());

// Rate limiting middleware to limit requests to 100 per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/membeship", membershipRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
