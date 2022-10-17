import { StatusCode } from "../enums";

export type ResponseMessage = {
    status: StatusCode;
    data?: object;
    message?: string;
};