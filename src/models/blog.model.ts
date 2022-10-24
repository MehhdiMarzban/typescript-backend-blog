import { Schema, model } from "mongoose";

import { IBlog } from "../types";

const schema = new Schema<IBlog>({
    title: {type: String, required: true, trim: true},
    body: {type: String, required: true},
    author: {type: String, required: true, trim: true},
    image: {type: String, required: true, trim: true, default: ""}
});

const BlogModel = model<IBlog>("blog", schema);

export default BlogModel;