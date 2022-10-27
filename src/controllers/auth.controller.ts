import { Response, Request, NextFunction } from "express";

import AuthServices from "../services/auth.service";
import { Messages, StatusCode } from "../enums";
import { Controller, Post } from "../decorators/routers.decorator";
import { IUser } from "../types";

@Controller("/auth")
class AuthController {
    @Post("/register")
    async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const user: IUser = await AuthServices.register(req.body);
            if (user) {
                return res.status(StatusCode.CREATE_SUCCESSFULL).json({
                    status: StatusCode.CREATE_SUCCESSFULL,
                    message: Messages.REGISTER_SUCCESS,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    @Post("/login")
    async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const accessToken: string = await AuthServices.login(req.body);
            if (accessToken) {
                return res.header("X-Auth-Token", accessToken).status(StatusCode.SUCCESSFULL).json({
                    status: StatusCode.SUCCESSFULL,
                    message: Messages.LOGIN_SUCCESS,
                    data: { accessToken },
                });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;
