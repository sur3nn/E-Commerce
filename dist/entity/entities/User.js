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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("char", {
        name: "uniqueKey",
        unique: true,
        length: 36,
        default: () => "'uuid()'",
    }),
    __metadata("design:type", String)
], User.prototype, "uniqueKey", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "first_name", length: 255 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "email_id", length: 255 }),
    __metadata("design:type", String)
], User.prototype, "emailId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "password", nullable: true, length: 255 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "created_on",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], User.prototype, "createdOn", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "created_by" }),
    __metadata("design:type", String)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "updated_on", nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "updated_by", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "deleted_on", nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "deletedOn", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Index)("uniqueKey", ["uniqueKey"], { unique: true }),
    (0, typeorm_1.Entity)("user", { schema: "e_commerce" })
], User);
//# sourceMappingURL=User.js.map