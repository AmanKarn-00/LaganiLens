import express from "express";
import UserPortfolio from "../Models/Users.js"; 

const router = express.Router();

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const { firebaseUid, name, email } = req.body;

    if (!firebaseUid || !name || !email) {
      return res.status(400).json({ message: "firebaseUid, name, and email are required" });
    }

    // Check if user already exists
    const existingUser = await UserPortfolio.findOne({ firebaseUid });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const newUser = new UserPortfolio({
      firebaseUid,
      name,
      email,
      stocks: [], // Empty portfolio initially
    });

    await newUser.save();

    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
