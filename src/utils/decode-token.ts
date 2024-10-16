import { AuthModels } from "@/types/auth";
import jwt from "jsonwebtoken";

export const decodeToken = (token: string): AuthModels | null => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.decode(token) as AuthModels;
    return decoded;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};
