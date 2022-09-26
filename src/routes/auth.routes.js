import { Router } from "express";
import { check } from "express-validator";

import {
  login,
  register,
  revalidateToken,
} from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/validateToken.js";
import { validarCampos } from "../middlewares/validateFields.js";

const router = Router();

router.post(
  "/login",
  [
    check("email")
      .not()
      .isEmpty()
      .withMessage("the email is required")
      .isEmail()
      .withMessage("The email has to be valid")
      .isLength({ min: 12, max: 200 }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("the password is required")
      .isString()
      .isLength({ min: 10, max: 100 }),
    validarCampos,
  ],
  login
);

router.post(
  "/register",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("the name is required")
      .isLength({ min: 3, max: 200 }),
    check("email")
      .not()
      .isEmpty()
      .withMessage("the email is required")
      .isEmail()
      .withMessage("The email has to be valid")
      .isLength({ min: 12, max: 200 }),
    check("password")
      .not()
      .isEmpty()
      .withMessage("the password is required")
      .isString()
      .isLength({ min: 10, max: 100 }),
    validarCampos,
  ],
  register
);

router.get("/renew", validateToken, revalidateToken);

export default router;
