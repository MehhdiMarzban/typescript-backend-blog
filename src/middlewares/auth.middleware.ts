import { NextFunction, Request, RequestHandler, Response } from "express";
import { Messages, StatusCode } from "../enums";
import UserModel from "../models/user.model";
import { IDecodeToken, IUser } from "../types";
import { verifyToken } from "../utils/auth";

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
        }
    }
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        //* check for exist token
        const token: string | undefined = req.headers["x-auth-token"]?.toString();
        if (!token) throw { status: StatusCode.UNAUTHORZIED, message: Messages.UNAUTHORZIED };

        //* verify token
        const userToken: IDecodeToken = verifyToken(token);
        if (!userToken) throw { status: StatusCode.UNAUTHORZIED, message: Messages.UNAUTHORZIED };

        //* check token doesn't expire [multipy to thousand for make them equal]
        if (userToken.exp * 1000 < new Date().getTime()) {
            throw { status: StatusCode.UNAUTHORZIED, message: Messages.UNAUTHORZIED };
        }

        //* check user exist in database
        const userDatabase: IUser | null = await UserModel.findOne({
            username: userToken.username,
        });
        if (!userDatabase)
            throw { status: StatusCode.UNAUTHORZIED, message: Messages.UNAUTHORZIED };

        //* add user info to req to be available for routes
        req.user = userDatabase;
        next();
    } catch (error) {
        next(error);
    }
}
