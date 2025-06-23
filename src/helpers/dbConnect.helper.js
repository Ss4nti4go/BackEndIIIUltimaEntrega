import { connect } from "mongoose";
import logger from "./logger.helper.js";

const dbConnect = async (url) => {
    try {
        await connect(url);
         logger.INFO("Database connected");
    } catch (error) {
         logger.ERROR(error);
    }
}
export const isValidId = (id) => {
    return Types.ObjectId.isValid(id);
} 
export default dbConnect