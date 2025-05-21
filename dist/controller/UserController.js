"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const BaseController_1 = require("./BaseController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserController = class UserController extends BaseController_1.BaseController {
    async login(req, res, reqbody) {
        try {
            const secretKey = "3fa85f6457174562b3fc2c963f66afa6";
            if (!reqbody.email || !reqbody.password) {
                return res.status(400).json({ message: "Email or password is missing" });
            }
            const userData = await this.userLogic.userLogin(reqbody.email);
            console.log(userData);
            if (!userData) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const isPasswordMatch = await bcrypt_1.default.compare(reqbody.password, userData.password);
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const token = jsonwebtoken_1.default.sign({ id: userData.id, email: userData.email }, secretKey, { expiresIn: '1h' });
            return res.status(200).json({ token });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error: error });
        }
    }
    async createUser(reqbody, res) {
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
            const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
            reqbody.password = hashedPassword;
            const user = await this.userLogic.createUser(reqbody);
            return res.status(201).json({
                message: "User created successfully",
                userUniqueKey: user
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "Internal Server Error",
                error: error.message || error
            });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, routing_controllers_1.Post)('/login'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Post)('/sign-up'),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
exports.UserController = UserController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/api/user")
], UserController);
//# sourceMappingURL=UserController.js.map