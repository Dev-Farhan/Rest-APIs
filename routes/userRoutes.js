import express from "express";
import passport from "passport";
import {
  deleteUser,
  login,
  logout,
  register,
} from "../controller/registerUser.js";
const router = express.Router();

router.post("/register", register);

router.get("/login", login);

// Define a route to handle user logout. You can customize the route path as needed.
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);

router.get("/profile", (req, res) => {
  res.send("Welcome to your profile!");
});

// Define a route to delete a user by their ID. You can customize the route path as needed.
router.delete("/users/:userId", deleteUser);
export default router;
