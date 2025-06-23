
import program from "../utils/process.js"
import dotenv from "dotenv"

const { mode } = program.opts()
console.log(mode)
dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development'
}) 

const configObject = {
    port: process.env.PORT || 8080,
    sessionSecret: process.env.PRIVATE_KEY ,
    mongoDB: process.env.MONGO_URL ,
    persistence: process.env.PERSISTENCE,
    email: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD
}
export default configObject