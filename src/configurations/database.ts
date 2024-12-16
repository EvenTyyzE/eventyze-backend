import {Sequelize} from 'sequelize';
import config from './config';


const {
    NEON
} = config

export const database = new Sequelize(`${NEON}`)