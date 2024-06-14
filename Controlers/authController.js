const  User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if the user exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User Already Exists" });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            savedUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid User" });
        }
        // check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid Password" });
        }
        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role, // Include user's role in token data
        };
        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
        // Send response with token and user data
        res.cookie("access_token", token, {
            httpOnly: true,
        }).json({
            message: "Login is successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token: token // Include token in the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports = {
    login,
    register
};
