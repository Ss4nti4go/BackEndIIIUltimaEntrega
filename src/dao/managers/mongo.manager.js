import PetModel from "../models/petsModel.js";
import productModel from "../models/product.models.js";
import userModel from "../models/users.models.js";

class MongoManager {
    constructor(model) {
        this.model = model;
    }
    createOne = async (data) => {
        return await this.model.create(data);
    }
    readAll = async (filter) => {
        return await this.model.find(filter);
    }   
    readOne = async (obj) => {
        return await this.model.findOne(obj);
    }
    readById = async (id) => {
        return await this.model.findById(id);
    }
    updateOne = async (obj, data) => {
        return await this.model.findByIdAndUpdate(obj, data);
    }
    updateById = async (id, data) => {
        return await this.model.findByIdAndUpdate(id, data);
    }
    destroyOne = async (obj) => {
        return await this.model.findByIdAndDelete(obj);
    }
    destroyById = async (id) => {
        return await this.model.findOneAndDelete(id);
    }
}
const productsManager = new MongoManager(productModel);
const userManager = new MongoManager(userModel);
const petsManager = new MongoManager(PetModel);
export { productsManager, userManager, petsManager };