import { RequestHandler } from "express";

export interface MiddlewarePropertyDescriptor extends PropertyDescriptor {
    middlewares?: RequestHandler[];
}