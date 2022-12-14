import { NextFunction, Request, Response } from "express";

import {
    Controller,
    Delete,
    Get,
    Post,
    Put,
} from "../decorators/routers.decorator";
import {ClassMiddlewares, Middlewares} from "../decorators/middlewares.decorator";
import { IBlog } from "../types";
import { StatusCode } from "../enums/StatusCode.enum";
import blogService from "../services/blog.service";
import { Messages } from "../enums";
import { authMiddleware } from "../middlewares";

@Controller("/blogs")
@ClassMiddlewares([authMiddleware]) //* this middleware will be apply to all of methods in this controller
class BlogController {
    @Get("/")
    async getAllBlogs(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<IBlog[]> | void> {
        try {
            const blogs: IBlog[] = await blogService.fetchAllBlogs();
            return res
                .status(StatusCode.SUCCESSFULL)
                .json({ status: StatusCode.SUCCESSFULL, data: blogs });
        } catch (error) {
            next(error);
        }
    }

    @Get("/single/:id")
    async getBlogById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<IBlog> | void> {
        try {
            const id: string = req.params.id;
            const blog: IBlog = await blogService.fetchBlogById(id);

            return res
                .status(StatusCode.SUCCESSFULL)
                .json({ status: StatusCode.SUCCESSFULL, data: blog });
        } catch (error) {
            next(error);
        }
    }

    @Post("/")
    @Middlewares([authMiddleware])
    async createBlog(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<string> | void> {
        try {
            const blog = await blogService.createBlog(req.body);

            return res
                .status(StatusCode.SUCCESSFULL)
                .json({ status: StatusCode.SUCCESSFULL, message: Messages.CREATED, data: blog });
        } catch (error) {
            next(error);
        }
    }

    @Put("/:id")
    @Middlewares([authMiddleware])
    async updateBlog(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<IBlog> | void> {
        try {
            const id: string = req.params.id;
            const result: IBlog = await blogService.updateBlog(id, req.body);
            return res
                .status(StatusCode.SUCCESSFULL)
                .json({ status: StatusCode.SUCCESSFULL, message: Messages.UPDATED, data: result });
        } catch (error) {
            next(error);
        }
    }

    @Delete("/:id")
    @Middlewares([authMiddleware])
    async deleteBlog(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<string> | void> {
        try {
            const id: string = req.params.id;
            const result: IBlog = await blogService.deleteBlogById(id);
            return res
                .status(StatusCode.SUCCESSFULL)
                .json({ status: StatusCode.SUCCESSFULL, message: Messages.DELETED, data: result });
        } catch (error) {
            next(error);
        }
    }
}

export default BlogController;
