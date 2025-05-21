"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductLogic = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("../typeorm");
let ProductLogic = class ProductLogic {
    async productSearch(searchKeyword) {
        try {
            const query = `select * from products where name like ? or description like ?`;
            const term = `%${searchKeyword}%`;
            const data = await typeorm_1.AppDataSource.query(query, [term, term]);
            console.log(data);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ProductLogic = ProductLogic;
exports.ProductLogic = ProductLogic = __decorate([
    (0, typedi_1.Service)()
], ProductLogic);
//# sourceMappingURL=ProductLogic.js.map