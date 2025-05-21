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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const BaseController_1 = require("./BaseController");
const AuthenticationMiddleware_1 = require("../middlerware/AuthenticationMiddleware");
let CartController = class CartController extends BaseController_1.BaseController {
    async viewCart(req, res, userId) {
        try {
            var data = await this.cartLogic.viewCart(userId);
            return res.status(200).json({ data: data });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
    async addItemToCart(req, res, reqbody) {
        try {
            if (!reqbody.productId || !reqbody.quantity || !reqbody.userId) {
                return res.status(400).json({ message: "Request body is missing or malformed." });
            }
            const existingProduct = await this.cartLogic.existingProduct(reqbody.productId);
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found in database." });
            }
            const data = await this.cartLogic.existingCart(reqbody);
            return res.status(200).json({ data: data, message: "Product Added in Cart Successfully" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
    ;
    async reduceCart(req, res, reqbody) {
        try {
            var data = await this.cartLogic.itemReduce(reqbody);
            return res.status(200).json({ message: data });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
};
exports.CartController = CartController;
__decorate([
    (0, routing_controllers_1.Get)('/view-cart'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __param(2, (0, routing_controllers_1.QueryParam)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "viewCart", null);
__decorate([
    (0, routing_controllers_1.Post)('/add-cart'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItemToCart", null);
__decorate([
    (0, routing_controllers_1.Post)('/reduce-cart'),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __param(2, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "reduceCart", null);
exports.CartController = CartController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.UseBefore)(AuthenticationMiddleware_1.AuthMiddleware),
    (0, routing_controllers_1.JsonController)("/api/cart")
], CartController);
//# sourceMappingURL=CartController.js.map