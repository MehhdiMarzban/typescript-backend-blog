import { StatusCode } from "../enums/index.enums";

export type ResponseMessage = {
    status: StatusCode;
    data?: object;
    message?: string;
};
