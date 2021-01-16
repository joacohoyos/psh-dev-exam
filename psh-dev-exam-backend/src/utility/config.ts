import { ConnectionOptions } from 'mysql2'

export const PORT = process.env.PORT

export const DB_CONFIG: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_DATABASE,
    port: parseFloat(process.env.DB_PORT!)   
}

export const PLAYERS_API_URL = process.env.PLAYERS_API_URL


