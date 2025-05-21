"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartLogic = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("../typeorm");
const Products_1 = require("../entity/entities/Products");
const Carts_1 = require("../entity/entities/Carts");
let CartLogic = class CartLogic {
    async viewCart(userId) {
        try {
            const data = await typeorm_1.AppDataSource.query(`  select c.id, p.name, (p.price * c.quantity) AS total_price , c.quantity 
                 from carts c
                 join products p on c.product_id = p.id and p.deleted_on is null
                 where c.user_id = ? and c.deleted_on is null
                 order by c.id desc;`, [userId]);
            console.log(data);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async existingCart(reqbody) {
        var _a;
        try {
            const { userId, productId, quantity } = reqbody;
            const existingItem = await typeorm_1.AppDataSource.manager.findOne(Carts_1.Carts, {
                where: {
                    userId: userId,
                    productId: productId,
                    deletedOn: null
                },
            });
            if (existingItem) {
                existingItem.quantity = ((_a = existingItem.quantity) !== null && _a !== void 0 ? _a : 0) + quantity;
                existingItem.updatedOn = new Date();
                existingItem.updatedBy = String(userId);
                await typeorm_1.AppDataSource.manager.save(existingItem);
            }
            else {
                const cartData = new Carts_1.Carts();
                cartData.userId = userId;
                cartData.productId = productId;
                cartData.quantity = quantity;
                cartData.createdAt = new Date();
                cartData.createdBy = String(userId);
                await typeorm_1.AppDataSource.manager.save(Carts_1.Carts, cartData);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async existingProduct(productId) {
        try {
            const existingProduct = await typeorm_1.AppDataSource.manager.findOne(Products_1.Products, {
                where: {
                    id: productId,
                    deletedOn: null
                }
            });
            return existingProduct;
        }
        catch (error) {
            throw error;
        }
    }
    async itemReduce(reqbody) {
        try {
            const { userId, productId } = reqbody;
            const cartItem = await typeorm_1.AppDataSource.manager.findOne(Carts_1.Carts, {
                where: {
                    userId,
                    productId,
                    deletedOn: null,
                },
            });
            if (!cartItem) {
                return "item not found in cart";
            }
            if (cartItem.quantity <= 1) {
                cartItem.deletedOn = new Date();
            }
            else {
                cartItem.quantity -= 1;
                cartItem.updatedOn = new Date();
            }
            await typeorm_1.AppDataSource.manager.save(cartItem);
            return "quantity reduce successfully";
        }
        catch (error) {
            throw error;
        }
    }
};
exports.CartLogic = CartLogic;
exports.CartLogic = CartLogic = __decorate([
    (0, typedi_1.Service)()
], CartLogic);
//# sourceMappingURL=CartLogic.js.map