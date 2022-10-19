import { ObjectId } from "mongoose";

export interface IPayload{
    _id: ObjectId;
    fullname: string;
    username: string;
    email?: string;
    mobile?: string;
}