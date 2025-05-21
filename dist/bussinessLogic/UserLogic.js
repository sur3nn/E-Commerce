"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogic = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("../typeorm");
const User_1 = require("../entity/entities/User");
let UserLogic = class UserLogic {
    async userLogin(email) {
        try {
            const data = await typeorm_1.AppDataSource.query(`select u.id,u.password from user u where u.email_id = ? ;`, [email]);
            return data[0];
        }
        catch (error) {
            throw error;
        }
    }
    async existingUser(emailId) {
        try {
            const existingUser = await typeorm_1.AppDataSource.manager.findOne(User_1.User, {
                where: { emailId: emailId },
            });
            return existingUser;
        }
        catch (error) {
            throw error;
        }
    }
    async createUser(reqbody) {
        try {
            const user = new User_1.User();
            user.firstName = reqbody.firstName;
            user.emailId = reqbody.emailId;
            user.password = reqbody.password;
            user.createdBy = "1";
            await typeorm_1.AppDataSource.manager.save(user);
            return user.id;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserLogic = UserLogic;
exports.UserLogic = UserLogic = __decorate([
    (0, typedi_1.Service)()
], UserLogic);
//# sourceMappingURL=UserLogic.js.map