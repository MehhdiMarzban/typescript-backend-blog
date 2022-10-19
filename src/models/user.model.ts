import { Schema, model } from "mongoose";
import { sign } from "jsonwebtoken";

import { IPayload, IUser } from "../types";
import {ServerConfig} from "../enums";
import { createToken } from '../utils/auth';

const schema = new Schema<IUser>({
    fullname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    accessToken: { type: String, default: "" },
    mobile: { type: String, default: "" },
    email: { type: String, default: "" },
});

schema.methods.getAuthToken = function(): string{
    
    //* build payload and token
    const payload: IPayload = {
        _id: this._id,
        fullname: this.fullname,
        username: this.username,
        mobile: this.mobile,
        email: this.email,
    }
    const accessToken = createToken(payload);

    //* save access token to db
    this.accessToken = accessToken;
    this.save();

    return accessToken;
}

const UserModel = model("user", schema);

export default UserModel;
