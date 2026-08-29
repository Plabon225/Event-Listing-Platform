import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../model/UserModel.js";


// Register User
export const RegisterUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({status: "fail", message: "Name, email and password are required"});
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({status: "fail", message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        return res.status(201).json({status: "success", message: "User registered successfully"});

    } catch (error) {

        return res.status(500).json({status: "fail", message: error.message});

    }
};


// Login User
export const LoginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({status: "fail", message: "Invalid email or password"});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({status: "fail", message: "Invalid email or password"});
        }

        const token = jwt.sign(
            {
                email: user.email,
                user_id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Cookie Option
        let cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        // Set Cookie
        res.cookie("token", token, cookieOption);

        return res.status(200).json({status: "success", message: "Login successful"});

    } catch (error) {

        return res.status(500).json({status: "fail", message: error.message});

    }
};


// Logout User
export const LogoutUser = async (req, res) => {

    res.cookie("token", "", {expires: new Date(0), httpOnly: true});
    return res.status(200).json({status: "success", message: "Logout successful"});
};