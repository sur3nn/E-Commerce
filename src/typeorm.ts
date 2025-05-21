import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",   
  port:3306,                
  username:"root",                                          
  database:  "e_commerce",            
  password: "root",    
  entities: [__dirname + "/entity/entities/*"],
  synchronize: false,
});