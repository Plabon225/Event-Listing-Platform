import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/config.js";

export default (req, res, next) => {

    let token = req.headers["token"];
    if (!token) {
        token = req.cookies["token"];
    }

    if (!token) {
        return res.status(401).json({status: "fail", message: "unauthorized"});
    }

    try {

        const decoded = jwt.verify(token, JWT_KEY);
        req.headers.email = decoded.email;
        req.headers.user_id = decoded.user_id;
        next();

    } catch (error) {

        return res.status(401).json({status: "fail", message: "unauthorized"});

    }
};