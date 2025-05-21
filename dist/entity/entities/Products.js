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
exports.Products = void 0;
const typeorm_1 = require("typeorm");
let Products = class Products {
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "id" }),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "name", nullable: true, length: 255 }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "description", nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { name: "price", nullable: true, precision: 10, scale: 2 }),
    __metadata("design:type", String)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "stock", nullable: true }),
    __metadata("design:type", Number)
], Products.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", {
        name: "created_at",
        nullable: true,
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "created_by" }),
    __metadata("design:type", String)
], Products.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "updated_on", nullable: true }),
    __metadata("design:type", Date)
], Products.prototype, "updatedOn", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "updated_by", nullable: true }),
    __metadata("design:type", String)
], Products.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp", { name: "deleted_on", nullable: true }),
    __metadata("design:type", Date)
], Products.prototype, "deletedOn", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)("products", { schema: "e_commerce" })
], Products);
//# sourceMappingURL=Products.js.map