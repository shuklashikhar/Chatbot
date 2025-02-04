import { NextFunction, Response, Request } from "express";
import user from "../models/user.js";
import { hash , compare} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";



export const getAllUsers = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await user.find();
    return res.status(200).json({message: "OK", users});
  } catch (error) {
    console.log(error);
    return res.status(200).json({message: "error",cause: error.message});
  }
};

export const userSignup = async(req: Request, res: Response, next: NextFunction) => {
  try {
    //user signup
    const {name, email, password} = req.body;
    const existingUser = await user.findOne({email});
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPass = await hash(password,10);
    const newUser = new user({name, email, password: hashedPass});
    await newUser.save();

    //create token and store cookie

    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createToken(newUser._id.toString(),newUser.email,"7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7); 

    res.cookie(COOKIE_NAME,token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
      });

    return res.status(201).json({"message": "user created", name: existingUser.name, email: existingUser.email})
  } catch (error) {
    console.log(error);
    return res.status(200).json({message: "error",cause: error.message});
  }
};

export const userLogin = async(req: Request, res: Response, next: NextFunction) => {
  try {
    //user signup
    const { email, password} = req.body;
    const existingUser = await user.findOne({email});
    if (!existingUser) return res.status(401).send("User not registered");
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).send("Incorrect password");
    }
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });
    const token = createToken(existingUser._id.toString(),existingUser.email,"7d");

    const expires = new Date();
    expires.setDate(expires.getDate() + 7); 

    res.cookie(COOKIE_NAME,token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
      });

    return res.status(200).json({message: "ok", name: existingUser.name, email: existingUser.email});
  } catch (error) {
    console.log(error);
    return res.status(200).json({message: "error",cause: error.message});
  }
};