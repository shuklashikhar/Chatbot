import { Router } from 'express';
import { getAllUsers, userLogin, userSignup, verifyUser } from '../controllers/user-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';
// Ensure this is correctly imported
const userRoutes = Router();
// Route to get all users
userRoutes.get("/", getAllUsers);
// Route for user signup with validation middleware
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map