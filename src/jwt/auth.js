import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../config.js";

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
  };

  const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: "1h" });

  return token;
};
