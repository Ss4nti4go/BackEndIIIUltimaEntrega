import { productsManager, userManager, petsManager } from "../dao/managers/mongo.manager.js";

class Service {
    constructor(manager) {
        this.manager = manager;
    }
     createOne = async (data) => {
        return await this.manager.createOne(data);
    }
    readAll = async (filter) => {
        return await this.manager.readAll(filter);
    }
    readOne = async (obj) => {
        return await this.manager.readOne(obj);
    }
    readById = async (id) => {
        return await this.manager.readById(id);
    }
    updateOne = async (obj, data) => {
        return await this.manager.updateOne(obj, data);
    }
    updateById = async (id, data) => {
        return await this.manager.updateById(id, data);
    }
    destroyOne = async (obj) => {
        return await this.manager.destroyOne(obj);
    }
    destroyById = async (id) => {
        return await this.manager.destroyById(id);
    }
}

const productsService = new Service(productsManager);
const userService = new Service(userManager);
const petsService = new Service(petsManager);

export { productsService, userService , petsService};