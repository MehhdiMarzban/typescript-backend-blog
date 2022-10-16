import { Router } from "express";

import {routerPathMaker} from "../utils/path";

const DecoratorRouter: Router = Router();

export function Controller(decoratorPath?: string) {
    return function (target: any){
        const path : string = routerPathMaker(decoratorPath, "/");
        DecoratorRouter.use(path, DecoratorRouter);
    }
} 

export function Get(decoratorPath?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor){
        const path: string = routerPathMaker(decoratorPath, propertyKey);
        DecoratorRouter.get(path, descriptor.value); //* can use target[propertyKey] instead of descriptor.value
    }
}

export default DecoratorRouter;
