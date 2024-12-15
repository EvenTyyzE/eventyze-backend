import {database} from './database';

const {DEV_DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_HOST,
    DB_PASSWORD,
DEV_PORT} = process.env

    console.log('Running in development mode')


    export default {
        DB_PORT: Number(DEV_DB_PORT),
        DB_NAME,
        DB_USERNAME,
        DB_HOST,
        DB_PASSWORD,
        PORT: DEV_PORT
    }
