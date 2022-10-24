import { Messages, StatusCode } from "../enums";
import BlogModel from "../models/blog.model";
import { CreateBlogDTO, IBlog, UpdateBlogDTO } from "../types";
import {
    createBlogValidation,
    objectIdValidation,
    updateBlogValidation,
} from "../validations/blog.validation";

class BlogService {
    async fetchAllBlogs(): Promise<IBlog[]> {
        const blogs: IBlog[] = await BlogModel.find();
        return blogs;
    }

    async fetchBlogById(id: string): Promise<IBlog> {
        //* validate objectid
        const isValidObjectId: boolean = objectIdValidation(id);
        if (!isValidObjectId)
            throw { status: StatusCode.BAD_REQUEST, message: Messages.BAD_REQUEST };

        //* find blog
        const blog = await BlogModel.findById(id);
        if (!blog) throw { status: StatusCode.NOT_FOUND, message: Messages.NOT_FOUND };

        return blog;
    }

    async createBlog(blogDTO: CreateBlogDTO): Promise<IBlog> {
        //* validation newBlog info
        const validatedData: IBlog = createBlogValidation.validateSync(blogDTO, {
            stripUnknown: true,
        });

        //* create new blog
        const newBlog = await BlogModel.create(validatedData);
        if (!newBlog) throw { status: StatusCode.BAD_REQUEST, message: Messages.CREATE_FAILED };
        return newBlog;
    }

    async updateBlog(id: string, blogDTO: UpdateBlogDTO): Promise<IBlog> {
        //* check for exist blog
        await this.fetchBlogById(id);

        //* validate input data
        const validatedData: Partial<IBlog> = updateBlogValidation.validateSync(blogDTO, {
            stripUnknown: true,
        });

        //* update blog
        const updatedBlog: IBlog = (await BlogModel.findByIdAndUpdate(id, validatedData, {
            new: true,
        })) as IBlog;
        return updatedBlog;
    }

    async deleteBlogById(id: string): Promise<IBlog> {
        //* check for exist blog
        const blog: IBlog = await this.fetchBlogById(id);

        //* delete blog
        await BlogModel.findByIdAndDelete(id);
        return blog;
    }
}

export default new BlogService();
