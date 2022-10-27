import { Router } from "express";
import { MiddlewarePropertyDescriptor } from "../types";

import { routerPathMaker } from "../utils/path";

const DecoratorRouter: Router = Router();

export function Controller(decoratorPath?: string): Function {
    return function (target: any): void {
        const path: string = routerPathMaker(decoratorPath, "/");
        if (target._middlewares) {
            DecoratorRouter.use(path, target._middlewares, DecoratorRouter);
        } else {
            DecoratorRouter.use(path, DecoratorRouter);
        }
    };
}

export function Get(decoratorPath?: string): Function {
    return function (
        target: any,
        propertyKey: string,
        descriptor: MiddlewarePropertyDescriptor
    ): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        //* can use target[propertyKey] instead of descriptor.value
        if (descriptor.middlewares) {
            DecoratorRouter.get(path, descriptor.middlewares, descriptor.value);
        } else {
            DecoratorRouter.get(path, descriptor.value);
        }
    };
}

export function Post(decoratorPath?: string): Function {
    return function (
        target: any,
        propertyKey: string,
        descriptor: MiddlewarePropertyDescriptor
    ): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        if (descriptor.middlewares) {
            DecoratorRouter.post(path, descriptor.middlewares, descriptor.value);
        } else {
            DecoratorRouter.post(path, descriptor.value);
        }
    };
}

export function Put(decoratorPath?: string): Function {
    return function (
        target: any,
        propertyKey: string,
        descriptor: MiddlewarePropertyDescriptor
    ): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        if (descriptor.middlewares) {
            DecoratorRouter.put(path, descriptor.middlewares, descriptor.value);
        } else {
            DecoratorRouter.put(path, descriptor.value);
        }
    };
}

export function Patch(decoratorPath?: string): Function {
    return function (
        target: any,
        propertyKey: string,
        descriptor: MiddlewarePropertyDescriptor
    ): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        if (descriptor.middlewares) {
            DecoratorRouter.patch(path, descriptor.middlewares, descriptor.value);
        } else {
            DecoratorRouter.patch(path, descriptor.value);
        }
    };
}

export function Delete(decoratorPath?: string): Function {
    return function (
        target: any,
        propertyKey: string,
        descriptor: MiddlewarePropertyDescriptor
    ): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        if (descriptor.middlewares) {
            DecoratorRouter.delete(path, descriptor.middlewares, descriptor.value);
        } else {
            DecoratorRouter.delete(path, descriptor.value);
        }
    };
}

export default DecoratorRouter;
