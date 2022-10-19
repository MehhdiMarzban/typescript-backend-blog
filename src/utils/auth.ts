import {genSaltSync, hashSync, compareSync} from "bcrypt";
import {sign, Algorithm, Secret } from "jsonwebtoken";

import {ServerConfig} from "../enums";
import { IPayload } from "../types";

export const hashPassword = (password: string): string => {
    const salt: string = genSaltSync(10);
    return hashSync(password, salt);
}

export const comparePassword = (password: string, hashPassword:string): boolean => {
    return compareSync(password, hashPassword);
}

export const createToken = (payload: IPayload): string => {
    const secretKey: Secret = ServerConfig.SECRET_KEY;
    const algorithm: Algorithm = "HS512";
    const expiresIn = "1d"; 
    return sign(payload, secretKey, {algorithm, expiresIn});
}