import jwt from 'jsonwebtoken';
import { COOKIE_NAME } from './constants.js';
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
export const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    console.log(token);
};
//# sourceMappingURL=token-manager.js.map