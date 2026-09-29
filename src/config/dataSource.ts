import { DataSource } from "typeorm";
import PetEntity from "../entities/PetEntity";


export const AppDataSource = new DataSource({
    type:"better-sqlite3",
    database: "./src/config/database.sqlite",
    entities:[PetEntity],
    synchronize: true

})