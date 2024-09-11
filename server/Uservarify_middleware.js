import express from "express";
import jwt from "jsonwebtoken";
import usermodel from "./Model/user-model.js";

const userlogin = async (req, res, next) => {
    const token = req.cookies.token;  // Corrected from req.cookie to req.cookies

 
   

    if (!token) {
        return res.json({ isuserlogin: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.USER_KEY);
        const user = await usermodel.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(403).json({ isuserlogin: false, message: 'Invalid token or not an user' });
        }

        req.id = decoded.id;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ isuserlogin: false, message: 'Token expired' });
        } else {
            return res.status(401).json({ isuserlogin: false, message: 'Failed to authenticate token', error: err.message });
        }
    }
};

export default userlogin;
