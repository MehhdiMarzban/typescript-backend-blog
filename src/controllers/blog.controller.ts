import { Controller, Delete, Get, Post, Put } from "../decorators/routers.decorators";
import { IBlog } from "../types";
import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../enums/StatusCode.enum";
import blogService from "../services/blog.service";
import { Messages } from "../enums";

@Controller("/blogs")
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
