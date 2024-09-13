import usermodel from "../Model/user-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Sign Up Controller
export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const alreadyUsername = await usermodel.findOne({ username });
        const alreadyEmail = await usermodel.findOne({ email });

        if (alreadyUsername || alreadyEmail) {
            return res.json({ register: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await usermodel.create({
            username,
            email,
            password: hash,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.USER_KEY);
        res.cookie("token", token, { httpOnly: true });
        
        const user = await usermodel.findOne({ email }).select("-password");
        res.json({ register: true, newuser: user, kok:token});

    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
};

// Sign In Controller
export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usermodel.findOne({ email });

        if (!user) {
            return res.json({ signin: false, message: "Email is incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({ id: user._id }, process.env.USER_KEY);
            res.cookie("token", token, { httpOnly: true });

            const userWithoutPassword = await usermodel.findOne({ email }).select("-password");
            return res.json({ signin: true, newuser: userWithoutPassword });
        } else {
            return res.json({ signin: false, message: "Password is incorrect" });
        }
    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
};

// Google Sign In Controller
export const googl = async (req, res) => {
    const { name, email, photo } = req.body;

    try {
        let user = await usermodel.findOne({ email }).select("-password");

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.USER_KEY);
            res.cookie("token", token, { httpOnly: true });
            return res.json({ login: true, newuser: user });
        } else {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const username = name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4);

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = await usermodel.create({
                username,
                email,
                password: hash,
                photo,
            });

            const token = jwt.sign({ id: newUser._id }, process.env.USER_KEY);
            res.cookie("token", token, { httpOnly: true });

            const userWithoutPassword = await usermodel.findOne({ email }).select("-password");
            res.json({ register: true, newuser: userWithoutPassword });
        }
    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
};

// Update Profile Controller
export const updateprofile = async (req, res) => {
    const { username, email, password, userid } = req.body;

    try {
        const existingUser = await usermodel.findById(userid);
        if (!existingUser) {
            return res.json({ update: false, error: 'Original email not found' });
        }

        const alreadyUsername = await usermodel.findOne({ username });
        const alreadyEmail = await usermodel.findOne({ email });

        if (alreadyUsername || alreadyEmail) {
            return res.json({ update: false, message: 'Username or email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const updatedUser = await usermodel.findByIdAndUpdate(
            existingUser._id,
            { username, email, password: hash },
            { new: true }
        );

        if (updatedUser) {
            const token = jwt.sign({ id: updatedUser._id }, process.env.USER_KEY);
            res.cookie("token", token, { httpOnly: true });

            const userWithoutPassword = await usermodel.findById(updatedUser._id).select("-password");
            return res.json({ update: true, newuser: userWithoutPassword });
        } else {
            return res.json({ error: 'User not found after update attempt' });
        }
    } catch (err) {
        console.error(err);
        res.json({ error: 'Server error' });
    }
};

// Delete Account Controller
export const deleteaccount = async (req, res) => {
    try {
        const { userid } = req.body;

        const deletedUser = await usermodel.findByIdAndDelete(userid);

        if (deletedUser) {
            res.cookie("token", "", { httpOnly: true });
            res.json({ delete: true });
        } else {
            res.json({ delete: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while deleting the account.' });
    }
};

// Update Profile Picture Controller
export const updatepic = async (req, res) => {
    try {
        const { userid, downloadURL } = req.body;

        const updatedUserPic = await usermodel.findByIdAndUpdate(
            userid,
            { photo: downloadURL },
            { new: true }
        );

        if (updatedUserPic) {
            const { password, ...rest } = updatedUserPic._doc;
            return res.json({ picupdate: true, updateuser: rest });
        } else {
            return res.json({ picupdate: false });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// Check Login Controller
export const checklogin = async (req, res) => {
    try {
        const user = await usermodel.findById(req.id).select("-password");
        res.json({ userlogin: true, curuser: user });
    } catch (err) {
        console.error(err);
        res.json({ error: err.message });
    }
};

// Get User Controller
export const getuser = async (req, res) => {
    try {
        const user = await usermodel.findById(req.params.id).select("-password");
        res.json({ listingowner: true, listingowner: user });
    } catch (err) {
        console.error(err);
        res.json({ error: err.message })
    }
};
