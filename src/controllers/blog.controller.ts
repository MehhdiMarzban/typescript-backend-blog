import { Controller, Delete, Get, Post, Put } from "../decorators/routers.decorators";
import { IBlog } from "../types";

@Controller("/blogs")
class BlogController {
    @Get("/")
    async getAllBlogs(): Promise<IBlog[]> {
        return [];
    }

    @Get("/:id")
    async getBlogById(): Promise<IBlog | void> {}

    @Post("/")
    async createBlog(): Promise<string> {
        return "";
    }

    @Put("/:id")
    async updateBlog(): Promise<string | void> {}

    @Delete("/:id")
    async deleteBlog(): Promise<string | void> {}
}

export default BlogController;
