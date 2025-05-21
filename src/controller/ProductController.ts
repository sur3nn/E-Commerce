import { Body, Get, JsonController, Post, QueryParam, Res,Req, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./BaseController";
import { AuthMiddleware } from "../middlerware/AuthenticationMiddleware";
@Service()
@UseBefore(AuthMiddleware) 
@JsonController("/api/product")
export class ProductController extends BaseController{

    @Get('/')
    public async searchProducts(@Req() req: any, @Res() res: any,@QueryParam('searchKeyword') searchKeyword : string,) {
        try {
            
            if (!searchKeyword) {
                return res.status(400).json({ message: "Search keyword is required." });
            }
             const data = await this.productLogic.productSearch(searchKeyword);
            return res.status(200).json({ data : data});
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error", error });
        }
    }
    
    
    
}