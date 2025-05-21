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
exports.BaseController = void 0;
const typedi_1 = require("typedi");
const ProductLogic_1 = require("../bussinessLogic/ProductLogic");
const UserLogic_1 = require("../bussinessLogic/UserLogic");
const CartLogic_1 = require("../bussinessLogic/CartLogic");
let BaseController = class BaseController {
};
exports.BaseController = BaseController;
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", ProductLogic_1.ProductLogic)
], BaseController.prototype, "productLogic", void 0);
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", UserLogic_1.UserLogic)
], BaseController.prototype, "userLogic", void 0);
__decorate([
    (0, typedi_1.Inject)(),
    __metadata("design:type", CartLogic_1.CartLogic)
], BaseController.prototype, "cartLogic", void 0);
exports.BaseController = BaseController = __decorate([
    (0, typedi_1.Service)()
], BaseController);
//# sourceMappingURL=BaseController.js.map