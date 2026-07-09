const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const sendEmail = require("../utils/sendEmail");


// ===============================
// Generate JWT Token
// ===============================
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};


// ===============================
// Register
// ===============================
exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone,
            address,
            city,
            pincode,
        } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({

                success: false,

                message: "Please fill all required fields",

            });

        }


        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({

                success: false,

                message: "User already exists",

            });

        }


        const hashedPassword = await bcrypt.hash(password, 10);


        // Email Verification Token
        const verificationToken = crypto.randomBytes(32).toString("hex");


        const user = await User.create({

            name,

            email,

            password: hashedPassword,

            phone: phone || "",

            address: address || "",

            city: city || "",

            pincode: pincode || "",

            paymentDetails: {

                method: "COD",

                status: "Pending",

            },

            isVerified: false,

            verificationToken,

            verificationTokenExpires:
                Date.now() + 24 * 60 * 60 * 1000,

        });


        // Verification URL
        const verifyURL =
            `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;


        // Email HTML
        const html = `
        <div style="font-family:Arial">

            <h2>Pizza Delivery</h2>

            <p>Hello ${user.name},</p>

            <p>
                Thank you for registering.
            </p>

            <p>
                Please verify your email by clicking the button below.
            </p>

            <a
                href="${verifyURL}"
                style="
                    background:#ff5722;
                    color:white;
                    padding:12px 25px;
                    text-decoration:none;
                    border-radius:5px;
                    display:inline-block;
                "
            >
                Verify Email
            </a>

            <p>
                This link expires in 24 hours.
            </p>

        </div>
        `;


        await sendEmail(

            user.email,

            "Verify Your Email",

            html

        );


        const token = generateToken(user);


        res.status(201).json({

            success: true,

            message:
                "Registration successful. Please verify your email.",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                isVerified: user.isVerified,

                phone: user.phone,

                address: user.address,

                city: user.city,

                pincode: user.pincode,

                paymentMethod: user.paymentDetails.method,

                paymentStatus: user.paymentDetails.status,

            },

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};

// ===============================
// Verify Email
// ===============================
exports.verifyEmail = async (req, res) => {
    try {

        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification link.",
            });
        }

        user.isVerified = true;
        user.verificationToken = null;
        user.verificationTokenExpires = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully. You can now login.",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }
};



// ===============================
// Login
// ===============================
exports.login = async (req, res) => {

    try {

        const {
            email,
            password,
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Please enter email and password",
            });

        }


        const user = await User.findOne({ email });


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }


        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {

            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });

        }


        // ===============================
        // Email Verification Check
        // ===============================
        if (!user.isVerified) {

            return res.status(403).json({

                success: false,

                message:
                    "Please verify your email before logging in.",

            });

        }


        const token = generateToken(user);


        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                isVerified: user.isVerified,

                phone: user.phone,

                address: user.address,

                city: user.city,

                pincode: user.pincode,

                paymentMethod:
                    user.paymentDetails?.method || "COD",

                paymentStatus:
                    user.paymentDetails?.status || "Pending",

            },

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};

// ===============================
// Get Profile
// ===============================
exports.getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id)
            .select("-password -verificationToken");

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found",
            });

        }

        return res.status(200).json({

            success: true,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                isVerified: user.isVerified,

                phone: user.phone,

                address: user.address,

                city: user.city,

                pincode: user.pincode,

                paymentMethod:
                    user.paymentDetails?.method || "COD",

                paymentStatus:
                    user.paymentDetails?.status || "Pending",

                createdAt: user.createdAt,

                updatedAt: user.updatedAt,

            },

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};




// ===============================
// Update Profile
// ===============================
exports.updateProfile = async (req, res) => {

    try {

        const {

            name,
            phone,
            address,
            city,
            pincode,
            paymentMethod,

        } = req.body;


        const user = await User.findById(req.user.id);

        if (!user) {

            return res.status(404).json({

                success: false,

                message: "User not found",

            });

        }


        if (name !== undefined)
            user.name = name;

        if (phone !== undefined)
            user.phone = phone;

        if (address !== undefined)
            user.address = address;

        if (city !== undefined)
            user.city = city;

        if (pincode !== undefined)
            user.pincode = pincode;


        // Create paymentDetails if missing
        if (!user.paymentDetails) {

            user.paymentDetails = {

                method: "COD",

                status: "Pending",

            };

        }


        if (paymentMethod !== undefined) {

            user.paymentDetails.method = paymentMethod;

        }


        await user.save();


        return res.status(200).json({

            success: true,

            message: "Profile Updated Successfully",

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                isVerified: user.isVerified,

                phone: user.phone,

                address: user.address,

                city: user.city,

                pincode: user.pincode,

                paymentMethod:
                    user.paymentDetails.method,

                paymentStatus:
                    user.paymentDetails.status,

            },

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};

// ===============================
// Forgot Password
// ===============================
exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({ email });

        // Security: Don't reveal whether the email exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message: "If an account exists, a reset link has been sent.",
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

        await user.save();

        const resetURL =
            `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const html = `
        <div style="font-family: Arial, sans-serif;">
            <h2>Pizza Delivery</h2>
            <p>Hello ${user.name},</p>
            <p>You requested a password reset.</p>

            <a href="${resetURL}"
               style="background:#ff5722;
                      color:white;
                      padding:12px 25px;
                      text-decoration:none;
                      border-radius:5px;">
                Reset Password
            </a>

            <p>This link expires in 1 hour.</p>

            <p>If you didn't request this, ignore this email.</p>
        </div>
        `;

        await sendEmail(
            user.email,
            "Reset Password",
            html
        );

        return res.status(200).json({
            success: true,
            message: "If an account exists, a reset link has been sent.",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};


// ===============================
// Reset Password
// ===============================
exports.resetPassword = async (req, res) => {

    try {

        const { token } = req.params;

        const { password } = req.body;

        if (!password) {

            return res.status(400).json({
                success: false,
                message: "Password is required",
            });

        }

        const user = await User.findOne({

            resetPasswordToken: token,

            resetPasswordExpires: {
                $gt: Date.now(),
            },

        });

        if (!user) {

            return res.status(400).json({

                success: false,

                message: "Invalid or expired reset link.",

            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        user.password = hashedPassword;

        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({

            success: true,

            message: "Password reset successful. Please login.",

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Server Error",

        });

    }

};