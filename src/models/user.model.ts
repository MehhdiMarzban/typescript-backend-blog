import { Schema, model } from "mongoose";

import { IUser } from "../types";

const schema = new Schema<IUser>({
    fullname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    accessToken: { type: String },
    mobile: { type: String },
    email: { type: String },
});

const UserModel = model("user", schema);

export default UserModel;
