import { NextFunction, Request, Response } from "express";

import { Controller, Get } from "../decorators/routers.decorators";
import { StatusCode } from "../enums/index.enums";

@Controller("/users")
class HomeController {
    @Get("/")
    GetHomeInfo(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(StatusCode.SUCCESSFULL).send("salam");
        } catch (error) {
            next(error);
        }
    }
}

export default HomeController;
