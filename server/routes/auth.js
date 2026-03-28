// routes/auth.js (or wherever your login route is)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // your user model
const JWT_SECRET = "your_jwt_secret"; // use your actual secret

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Invalid password" });

    // Generate JWT token
    const authtoken = jwt.sign({ id: user._id }, JWT_SECRET);

    // Send token + name + email to frontend
    res.json({
      authtoken,
      name: user.name, // <-- send the name
      email: user.email,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
