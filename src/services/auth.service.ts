import { Messages, StatusCode } from "../enums";
import UserModel from "../models/user.model";
import { IUser, LoginDTO, RegisterDTO } from "../types";
import { comparePassword, hashPassword } from "../utils/auth";

class AuthService {
    async register(registerDTO: RegisterDTO): Promise<IUser> {
        //* check for exist user
        const foundUser: IUser | null = await UserModel.findOne({ username: registerDTO.username });
        if (foundUser) {
            throw { status: StatusCode.BAD_REQUEST, message: Messages.REGISTER_FAILED };
        }

        //* create new user
        const hashedPassword: string = hashPassword(registerDTO.password);
        const user: IUser = await UserModel.create({
            fullname: registerDTO.fullname,
            username: registerDTO.username,
            password: hashedPassword,
            email: registerDTO.email,
            mobile: registerDTO.mobile,
        });
        return user;
    }

    async login(loginDTO: LoginDTO): Promise<void | string>{
            const foundUser: IUser | null = await UserModel.findOne({ username: loginDTO.username });

            //* checking user
            if (!foundUser) {
                throw { status: StatusCode.UNAUTHORZIED, message: Messages.LOGIN_FAILED };
            }

            //* checking password
            const isPasswordCorrect: boolean = comparePassword(loginDTO.password, foundUser.password);
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
