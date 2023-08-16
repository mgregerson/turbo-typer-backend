import express from "express";
import { getUserByEmail, createUser } from "../db/users";
import { random, authentication } from "../helpers";
import { Document } from "mongoose";
import { setCookie } from "./cookieUtils";

export interface UserDocument extends Document {
  username: string;
  email: string;
  authentication?: {
    password: string;
    salt?: string;
    sessionToken?: string;
  };
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user: UserDocument | null = await getUserByEmail(email).select(
      "+authentication.password +authentication.salt"
    );

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    setCookie(res, "USER-AUTH", user.authentication.sessionToken, {
      httpOnly: true,
    });

    const userData = {
      username: user.username,
      id: user._id,
      email: user.email,
      token: user.authentication.sessionToken,
    };

    return res.status(200).json(userData).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();

    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    const userData = {
      username: user.username,
      id: user._id,
      email: user.email,
      token: user.authentication.sessionToken,
    };

    return res.status(200).json(userData).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
