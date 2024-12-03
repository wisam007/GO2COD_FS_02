const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../model/userModel");

// -----------------Register User-------------------
//------------------Method POST--------------------

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  //Check if the user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    res.json("User exists!!");
  }
  //Hash the password

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);
  // Create the user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  //message when user is created

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// _____________ LOGIN USER___________________
// --------------------------------------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill in both email and password");
  }
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      message: "logged in successfully",
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user credientals");
  }
});

/// Generate a token using json_web_token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser };
