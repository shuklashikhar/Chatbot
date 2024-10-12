import user from "../models/user.js";
import { hash, compare } from 'bcrypt';
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await user.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "error", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered");
        const hashedPass = await hash(password, 10);
        const newUser = new user({ name, email, password: hashedPass });
        await newUser.save();
        return res.status(201).json({ "message": "user created", id: newUser._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "error", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        //user signup
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser)
            return res.status(401).send("User not registered");
        const isPasswordCorrect = await compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password");
        }
        return res.status(200).json({ message: "ok", id: existingUser._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "error", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map