import { NextFunction, Request, Response } from 'express';
import { body, ValidationChain, validationResult } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run each validation
    for (let validation of validations) {
      await validation.run(req);
    }

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // Correctly check if there are errors
      return res.status(422).json({ errors: errors.array() });
    }

    next(); // Proceed to the next middleware if validation passed
  };
}

// Define your signup validation rules

export const loginValidator = [ 
  body("email").isEmail().withMessage("Invalid email").notEmpty().withMessage('Email is required'),
  body("password").trim().isLength({ min: 6 }).withMessage("Password should contain at least 6 characters")
];


export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator,
];