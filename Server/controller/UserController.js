const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

require("dotenv").config();

exports.registerUser = async (req, res) => {
  try {
    const { formdata } = req.body;

    const { token } = formdata;
    const { firstName, lastName, password } = formdata.formData;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email is not registered" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // or "7d", etc.
    );
    // ✅ Send token in cookie instead of body
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only use HTTPS in prod
      sameSite: "Strict", // or 'Lax' if needed
      maxAge: 1000 * 60 * 60, // 1 hour
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    // Generate JWT token with 24-hour expiration
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const url = `${process.env.BASE_URL}/verify-token?token=${token}`; // or a real verification URL

    await transporter.sendMail({
      to: email,
      subject: "Verify your email",
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              padding: 20px;
              background-color: #ffffff;
              margin: 0 auto;
              max-width: 600px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #3498db;
              color: #fff;
              text-align: center;
              padding: 15px;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .content p {
              font-size: 16px;
              line-height: 1.6;
              color: #333;
            }
            .button {
              background-color: #3498db;
              color: white;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 4px;
              font-size: 16px;
              margin-top: 20px;
              display: inline-block;
            }
            .footer {
              text-align: center;
              padding: 20px;
              background-color: #f1f1f1;
              font-size: 14px;
              color: #777;
              border-radius: 0 0 8px 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Your Dream Property!</h1>
            </div>
            <div class="content">
              <p>Hello!</p>
              <p>Thank you for registering with us. We’re excited to help you find your perfect property. To get started, please verify your email address by clicking the link below.</p>
              <a href="${url}" class="button">Verify Your Email</a>
            </div>
            <div class="footer">
              <p>If you didn’t create an account with us, please disregard this email.</p>
              <p>Best regards, <br/> Your Real Estate Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
    });

    return res.status(201).json({ message: "Verification email sent" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res.status(500).json({ message: "Failed to send email" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Verification token missing.");
  }

  try {
    // Decode token

    const url = `${process.env.CLIENT_URL}/auth/register?token=${token}`;

    return res.redirect(url);
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(400).send("Invalid or expired token.");
  }
};
