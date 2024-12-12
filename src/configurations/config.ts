import merge from 'lodash.merge'
import dotenv from 'dotenv'

dotenv.config()

const stage: any = process.env.NODE_ENV;
let config

if(stage === "development"){
    config = require("./development").default
}else if(stage === "production"){
    config = require("./production").default
}

export default merge({
    stage
}, config)