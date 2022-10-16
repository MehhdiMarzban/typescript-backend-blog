import { Router } from "express";

import { routerPathMaker } from "../utils/path";

const DecoratorRouter: Router = Router();

export function Controller(decoratorPath?: string): Function {
    return function (target: any): void {
        const path: string = routerPathMaker(decoratorPath, "/");
        DecoratorRouter.use(path, DecoratorRouter);
    };
}

export function Get(decoratorPath?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        DecoratorRouter.get(path, descriptor.value); //* can use target[propertyKey] instead of descriptor.value
    };
}

export function Post(decoratorPath?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        DecoratorRouter.post(path, descriptor.value);
    };
}

export function Put(decoratorPath?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        DecoratorRouter.put(path, descriptor.value);
    };
}

export function Patch(decoratorPath?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        DecoratorRouter.patch(path, descriptor.value);
    };
}

export function Delete(decoratorPath?: string): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        DecoratorRouter.delete(path, descriptor.value);
    };
}

export default DecoratorRouter;
