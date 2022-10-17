import {genSaltSync, hashSync, compareSync} from "bcrypt";

export const hashPassword = (password: string): string => {
    const salt: string = genSaltSync(10);
    return hashSync(password, salt);
}

export const comparePassword = (password: string, hashPassword:string): boolean => {
    return compareSync(password, hashPassword);
}