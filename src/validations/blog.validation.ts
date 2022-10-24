import { isValidObjectId } from "mongoose";
import * as yup from "yup";

export const createBlogValidation = yup.object().shape({
    title: yup.string().required(),
    body: yup.string().required(),
    author: yup.string().required(),
    image: yup.string().required(),
});

export const updateBlogValidation = yup.object().shape({
    title: yup.string(),
    body: yup.string(),
    author: yup.string(),
    image: yup.string(),
});

export const objectIdValidation = (id: string): boolean => {
    return isValidObjectId(id);
}
