const RegisterModel = require("../model/RegisterModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await RegisterModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      token,
      profile: user.profileImage,
      id: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error. Please try again later.",
      });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const profileImage = req.file;

    if (!email || !password || !profileImage) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new RegisterModel({
      email,
      password: hashedPassword,
      profileImage: profileImage.filename,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: { email, profileImage: profileImage.filename },
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error. Please try again later.",
      });
  }
};
