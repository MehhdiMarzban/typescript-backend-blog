import { Response, Request, NextFunction } from "express";

import { StatusCode } from "../enums";
import { IUser } from "../types";
import { Controller, Post } from "../decorators/routers.decorators";
import UserModel from "../models/user.model";

@Controller("/auth")
class AuthController {
    @Post("/register")
    async register(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const {fullname, username, password} : IUser = req.body;
        await UserModel.create({fullname, username, password}); 
        return res.status(StatusCode.CREATE_SUCCESSFULL).json({fullname, username, password});
    }

    @Post("/login")
    login(req: Request, res: Response, next: NextFunction): Response {
        return res.status(StatusCode.SUCCESSFULL).json();
    }
}

export default AuthController;