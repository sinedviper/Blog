import { body } from "express-validator";

export const registerValidation = [
  body("email", "Uncorrect format email").isEmail(),
  body("password", "Password has been minimal 5 symbol").isLength({ min: 5 }),
  body("fullName", "Press name").isLength({ min: 3 }),
  body("avatarUrl", "Uncorrect link on avatar").optional().isURL(),
];
