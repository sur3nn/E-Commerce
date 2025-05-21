import { Body, Get, JsonController, Post, QueryParam, Res, Req } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./BaseController";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

@Service()
@JsonController("/api/user")
export class UserController extends BaseController {

    @Post('/login')
    public async login(@Req() req: any, @Res() res: any, @Body() reqbody: any,) {
        try {
            const secretKey = "3fa85f6457174562b3fc2c963f66afa6";

            if (!reqbody.email || !reqbody.password) {
                return res.status(400).json({ message: "Email or password is missing" });
            }

            const userData = await this.userLogic.userLogin(reqbody.email);
            console.log(userData)
            if (!userData) {
                return res.status(401).json({ message: "Invalid email or password" });
            }


            const isPasswordMatch = await bcrypt.compare(reqbody.password, userData.password);

            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const token = jwt.sign({ id: userData.id, email: userData.email }, secretKey, { expiresIn: '1h' });

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error })
        }
    }
    @Post('/sign-up')
    public async createUser(@Body() reqbody: any, @Res() res: any) {
        try {
            const { firstName, password, emailId } = reqbody;

            if (!firstName || !password || !emailId) {
                return res.status(400).json({ message: "Request body is missing or malformed." });
            }

            const existingUser = await this.userLogic.existingUser(emailId);
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            reqbody.password = hashedPassword;

            const user = await this.userLogic.createUser(reqbody);

            return res.status(201).json({
                message: "User created successfully",
                userUniqueKey: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message || error
            });
        }
    }
}