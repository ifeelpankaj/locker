import express from "express";
import passport from "passport";
import { logout, myProfile, updateUserRole } from "../controllers/User.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/googlelogin",
  passport.authenticate("google", {
    scope: ["profile" ,"https://www.googleapis.com/auth/drive.file"  ],
  })
);

router.get(
  "/login",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
  })
);

router.get("/me", isAuthenticated, myProfile);

router.get("/logout", logout);

router.put("/user/:id",isAuthenticated, updateUserRole);

export default router;
