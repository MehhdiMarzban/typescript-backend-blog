import express, { Application, Response, Request, NextFunction } from "express";
import http, { Server } from "http";

import "./app.modules";
import router from "./routes/index.routes";
import { Messages, ServerConfig, StatusCode } from "./enums";
import { ResponseMessage } from "./types";

//* build express server
const app: Application = express();
const server: Server = http.createServer(app);

//* apply middlewares

//* apply built-in middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* main routes
app.use(router);

//* not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    const message: ResponseMessage = {
        status: StatusCode.NOT_FOUND,
        message: Messages.NOT_FOUND,
    };
    return res.status(StatusCode.NOT_FOUND).json(message);
});

//* error route
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status || StatusCode.SERVER_ERROR;
    const message: string | Messages = error.message || Messages.SERVER_ERROR;
    res.status(status).json({ status, message });
});

server.listen(ServerConfig.PORT, (): void => {
    console.log(`server is started on : ${ServerConfig.DEV_URL}:${ServerConfig.PORT}`);
});
