import { Response, Request, NextFunction } from "express";

import { Messages, StatusCode } from "../enums";
import { IUser } from "../types";
import { Controller, Post } from "../decorators/routers.decorators";
import UserModel from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/auth";

@Controller("/auth")
class AuthController {
    @Post("/register")
    async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { fullname, username, password, email = "", mobile = "" }: IUser = req.body;

            //* check for exist user
            const foundUser = await UserModel.findOne({ username });
            if (foundUser) {
                return res
                    .status(StatusCode.BAD_REQUEST)
                    .json({ status: StatusCode.BAD_REQUEST, message: Messages.REGISTER_FAILED });
            }

            //* create new user
            const hashedPassword: string = hashPassword(password);
            await UserModel.create({ fullname, username, password: hashedPassword, email, mobile });
            return res.status(StatusCode.CREATE_SUCCESSFULL).json({
                status: StatusCode.CREATE_SUCCESSFULL,
                message: Messages.REGISTER_SUCCESS,
            });
        } catch (error) {
            next(error);
        }
    }

    @Post("/login")
    async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { username, password }: IUser = req.body;
            const foundUser: IUser | null = await UserModel.findOne({ username });

            //* checking user
            if (!foundUser) {
                return res
                    .status(StatusCode.UNAUTHORZIED)
                    .json({ status: StatusCode.UNAUTHORZIED, message: Messages.LOGIN_FAILED });
            }

            //* checking password
            const isPasswordCorrect: boolean = comparePassword(password, foundUser.password);
            if (isPasswordCorrect) {
                return res
                    .status(StatusCode.SUCCESSFULL)
                    .json({ status: StatusCode.SUCCESSFULL, message: Messages.LOGIN_SUCCESS });
            } else {
                return res
                    .status(StatusCode.UNAUTHORZIED)
                    .json({ status: StatusCode.UNAUTHORZIED, message: Messages.LOGIN_FAILED });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
