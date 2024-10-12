import { Router } from 'express';
import { getAllUsers, userLogin, userSignup } from '../controllers/user-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
 // Ensure this is correctly imported

const userRoutes = Router();

// Route to get all users
userRoutes.get("/", getAllUsers);

// Route for user signup with validation middleware
userRoutes.post("/signup", validate(signupValidator), userSignup);

userRoutes.post("/login", validate(loginValidator), userLogin);

export default userRoutes;
