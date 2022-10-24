import { Schema, model } from "mongoose";

import { IPayload, IUser } from "../types";
import { createToken } from '../utils/auth';

const schema = new Schema<IUser>({
    fullname: { type: String, required: true, trim: true, min: 4, max: 64 },
    username: { type: String, required: true, trim: true, min: 6, max: 16 },
    password: { type: String, required: true, min: 6, max: 32 },
    accessToken: { type: String, default: "" },
    mobile: { type: String, default: "", length: 11 },
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

const UserModel = model<IUser>("user", schema);

export default UserModel;
