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
exports.Carts = void 0;
const typeorm_1 = require("typeorm");
let Carts = class Carts {
};
exports.Carts = Carts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Carts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "user_id", nullable: true }),
    __metadata("design:type", Number)
], Carts.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "product_id", nullable: true }),
    __metadata("design:type", Number)
], Carts.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "quantity", nullable: true }),
    __metadata("design:type", Number)
], Carts.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "created_at",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Carts.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "created_by" }),
    __metadata("design:type", String)
], Carts.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "updated_on", nullable: true }),
    __metadata("design:type", Date)
], Carts.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "updated_by", nullable: true }),
    __metadata("design:type", String)
], Carts.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: "deleted_on" }),
    __metadata("design:type", Date)
], Carts.prototype, "deletedOn", void 0);
exports.Carts = Carts = __decorate([
    (0, typeorm_1.Entity)("carts", { schema: "e_commerce" })
], Carts);
//# sourceMappingURL=Carts.js.map