export enum ServerConfig{
    PORT = 5600,
    DEV_URL = `http://localhost`,
    PROD_URL = ""
}

export enum StatusCode {
    NOT_FOUND = 404,
    BAD_REQUEST = 400,
    ACCESS_FORBIDDEN = 403,
    UNAUTHORZIED = 401,
    SUCCESSFULL = 200,
    CREATE_SUCCESSFULL = 201,
}

export enum Messages {
    NOT_FOUND = "404 not found.",
    CREATED = "successfully created."
}