import * as dotenv from 'dotenv';
import * as process from 'process';
import { DataSource } from 'typeorm';
import * as Entities from './entities';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: Entities,
    migrations: ['./db/migrations/*.ts'],
    synchronize: false,
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch(err => {
        console.error('Error during Data Source initialization', err);
    });
