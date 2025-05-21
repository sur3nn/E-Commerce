import { Service } from "typedi";
import { AppDataSource } from "../typeorm";
import { User } from "../entity/entities/User";


@Service()
export class UserLogic{
    public async userLogin(email : string){
        try {
            const data = await AppDataSource.query(
                `select u.id,u.password from user u where u.email_id = ? ;`,
                [email]
              );
            return data[0];
        } catch (error) {
            throw error;
        }
    }
    public async existingUser(emailId : any){
        try {
            const existingUser = await AppDataSource.manager.findOne(User, {
                where: { emailId : emailId }, 
              });
              return existingUser;
        } catch (error) {
            throw error
        }
    }
    public async createUser(reqbody : any){
        try {
            const user = new User();
            user.firstName = reqbody.firstName
            user.emailId = reqbody.emailId
            user.password = reqbody.password
            user.createdBy = "1";
            await AppDataSource.manager.save(user);
            return user.id;
        } catch (error) {
            throw error;
        }
    }
}

