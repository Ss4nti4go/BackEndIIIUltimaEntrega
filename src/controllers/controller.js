import { response } from "express";
import { productsService, userService, cartService } from "../services/services.js";
import CustomError from "../helpers/errors/customError.js";
import logger from "../helpers/logger.helper.js";


class Controller {
        constructor(service) {
                this.service = service;
        }
        createOne = async (req, res,) => {

                const response = await this.service.createOne(req.body);
                if (response.length === 0) {
                        res.json404(response)
                }
                res.json200(response)
        }
        readAll = async (req, res) => {
                const filter = req.query
                
                const response = await this.service.readAll(filter);
             
                if (!response) {
                        res.json404()
                }
                res.json200(response)

        }
        readOne = async (req, res) => {


                const response = await this.service.readOne(req.params.id);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)
        }
        readById = async (req, res) => {


                const response = await this.service.readById(req.params.id);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)
        }
        updateById = async (req, res) => {


                const response = await this.service.updateById(req.params.id, req.body);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)

        }
        updateOne = async (req, res) => {

                const response = await this.service.updateOne(req.params.id, req.body);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)

        }
        destroyOne = async (req, res,) => {

                const response = await this.service.destroyOne(req.params.id);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)

        }
        destroyById = async (req, res) => {

                const response = await this.service.destroyById(req.params.id);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)

        }
        addProductToCart = async (req, res) => {
                const response = await this.service.addProductToCart(req.params.id, req.body);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)
        }
        deleteProductFromCart = async (req, res) => {
                const response = await this.service.deleteProductFromCart(req.params.id, req.body);
                if (response.length === 0) {
                        res.json404()
                }
                res.json200(response)
        }
}
const productController = new Controller(productsService);
const userController= new Controller(userService)
const cartController = new Controller(cartService)
export { productController, userController ,cartController};