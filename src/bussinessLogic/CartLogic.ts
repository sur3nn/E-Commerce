import { Service } from "typedi";
import { AppDataSource } from "../typeorm";
import { Products } from "../entity/entities/Products";
import { Carts } from "../entity/entities/Carts";

@Service()
export class CartLogic{

    public async viewCart(userId : number){
        try {
            const data = await AppDataSource.query(
                `  select c.id, p.name, (p.price * c.quantity) AS total_price , c.quantity 
                 from carts c
                 join products p on c.product_id = p.id and p.deleted_on is null
                 where c.user_id = ? and c.deleted_on is null
                 order by c.id desc;`,
                [userId]
              ); 
              console.log(data)
              return data;
        } catch (error) {
            throw error;
        }
    }
    public async existingCart(reqbody: any) {
        try {
            const { userId, productId, quantity } = reqbody;
            const existingItem = await AppDataSource.manager.findOne(Carts, {
                where: {
                    userId: userId,
                    productId: productId,
                    deletedOn : null
                },
            });

            if (existingItem) {
                existingItem.quantity = (existingItem.quantity ?? 0) + quantity;
                existingItem.updatedOn = new Date();
                existingItem.updatedBy = String(userId); 

                await AppDataSource.manager.save(existingItem);
            } else {
                const cartData = new Carts();
                cartData.userId = userId;
                cartData.productId = productId;
                cartData.quantity = quantity;
                cartData.createdAt = new Date();
                cartData.createdBy = String(userId);

                await AppDataSource.manager.save(Carts, cartData);
            }
        } catch (error) {
            throw error
        }

    }
    public async existingProduct(productId: number) {
        try {

            const existingProduct = await AppDataSource.manager.findOne(Products, {
                where: {
                    id: productId,
                    deletedOn : null
                }
            });
            return existingProduct

        } catch (error) {
            throw error;
        }
    }

    public async itemReduce(reqbody : any){
        try {
            const { userId, productId} = reqbody;
            const cartItem = await AppDataSource.manager.findOne(Carts, {
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
              } else {
                cartItem.quantity -= 1;
                cartItem.updatedOn = new Date();
              }
              
              await AppDataSource.manager.save(cartItem);

              return "quantity reduce successfully"
        } catch (error) {
            throw error
        }
    }
}