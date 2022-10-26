import {IUser} from "../types";

export interface IDecodeToken extends IUser{
    iat: number;
    exp: number;
}