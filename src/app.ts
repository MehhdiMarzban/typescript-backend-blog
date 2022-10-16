import express, { Application, Response, Request, NextFunction } from "express";
import http, { Server } from "http";

import "./app.modules";
import router from "./routes/index.routes";
import { Messages, ServerConfig, StatusCode } from "./enums/index.enums";
import { ResponseMessage } from "./types/index.types";

//* build express server
const app: Application = express();
const server: Server = http.createServer(app);

//* apply middlewares
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

server.listen(ServerConfig.PORT, (): void => {
    console.log(`server is started on : ${ServerConfig.DEV_URL}:${ServerConfig.PORT}`);
});
