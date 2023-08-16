import { Response } from "express";

// Helper function to set a cookie
export function setCookie(
  res: Response,
  name: string,
  value: string,
  options: any = {}
) {
  res.cookie(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set 'secure' to true in production
    ...options,
  });
}
