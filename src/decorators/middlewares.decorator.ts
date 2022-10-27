import { RequestHandler } from "express";

import { MiddlewarePropertyDescriptor } from "../types";

export function ClassMiddlewares(middlewares: RequestHandler[]) {
    return function (target: any) {
        target._middlewares = middlewares;
    };
}

export function Middlewares(middlewares: RequestHandler[]): Function {
    return function (
        target: any,
        propertyKey: string,
        descriptor: MiddlewarePropertyDescriptor
    ): void {
        descriptor.middlewares = middlewares;
    };
}