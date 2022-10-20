import { Messages, StatusCode } from "../enums";
import UserModel from "../models/user.model";
import { IUser, LoginDTO, RegisterDTO } from "../types";
import { comparePassword, hashPassword } from "../utils/auth";
import { loginValidation, registerValidation } from "../validations/auth.validation";

class AuthService {
    async register(registerDTO: RegisterDTO): Promise<IUser> {
        //* validate registerDTO
        const validatedData: RegisterDTO = registerValidation.validateSync(registerDTO, {
            stripUnknown: true,
        });

        //* check for exist user
        const foundUser: IUser | null = await UserModel.findOne({
            username: validatedData.username,
        });
        if (foundUser) {
            throw { status: StatusCode.BAD_REQUEST, message: Messages.REGISTER_FAILED };
        }

        //* create new user
        const hashedPassword: string = hashPassword(validatedData.password);
        const user: IUser = await UserModel.create({
            ...validatedData,
            password: hashedPassword,
        });
        return user;
    }

    async login(loginDTO: LoginDTO): Promise<string> {
        //* validation login dto
        const validatedData: LoginDTO = loginValidation.validateSync(loginDTO, {
            stripUnknown: true,
        });

        //* search for user
        const foundUser: IUser | null = await UserModel.findOne({
            username: validatedData.username,
        });

        //* checking user
        if (!foundUser) {
            throw { status: StatusCode.UNAUTHORZIED, message: Messages.LOGIN_FAILED };
        }

        //* checking password
        const isPasswordCorrect: boolean = comparePassword(
            validatedData.password,
            foundUser.password
        );

        if (isPasswordCorrect) {
            //* build access token
            const accessToken = foundUser.getAuthToken();
            return accessToken;
        } else {
            throw { status: StatusCode.UNAUTHORZIED, message: Messages.LOGIN_FAILED };
        }
    }
}

export default new AuthService();
