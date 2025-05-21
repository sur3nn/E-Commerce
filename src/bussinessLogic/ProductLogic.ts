import { Service } from "typedi";
import { AppDataSource } from "../typeorm";

@Service()
export class ProductLogic {

    public async productSearch(searchKeyword: string) {
        try {

            const query = `select * from products where name like ? or description like ?`;
            const term = `%${searchKeyword}%`;
            const data = await AppDataSource.query(query, [term, term])
            console.log(data);

            return data


        } catch (error) {
            throw error
        }
    }
  
}
