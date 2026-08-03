import { NextApiResponse } from "next";

export class AuthenticationError extends Error {
  constructor(message = "Not signed in") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
  }
}

export const sendApiError = (
  res: NextApiResponse,
  error: unknown,
  context: string,
) => {
  if (error instanceof AuthenticationError) {
    res.status(401).json({ error: error.message });
    return;
  }

  if (error instanceof BadRequestError) {
    res.status(400).json({ error: error.message });
    return;
  }

  console.error(`${context}:`, error);
  res.status(500).json({ error: "Internal server error" });
};
