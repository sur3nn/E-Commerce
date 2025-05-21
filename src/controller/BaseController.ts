import { Inject, Service } from "typedi";
import { ProductLogic } from "../bussinessLogic/ProductLogic";
import { UserLogic } from "../bussinessLogic/UserLogic";
import { CartLogic } from "../bussinessLogic/CartLogic";


@Service()
export class BaseController{

    @Inject()
    protected productLogic : ProductLogic

    @Inject()
    protected userLogic : UserLogic

    @Inject()
    protected cartLogic : CartLogic
}