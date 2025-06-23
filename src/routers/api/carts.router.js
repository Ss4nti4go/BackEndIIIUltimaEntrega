import { cartController } from "../../controllers/controller.js";
import CustomRouter from "../../helpers/CustomRouter.js";

class CartsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.read("/", ["ADMIN"], cartController.readAll);
        this.read("/:id", ["USER", "PREM", "ADMIN"], cartController.readById);
        this.create("/", ["USER", "PREM"], cartController.createOne);
        this.update("/:id", ["USER", "PREM"], cartController.updateById)
        this.destroy("/:id", ["USER", "PREM", "ADMIN"], cartController.destroyById); 
        this.create("/:id/products/:pid", ["USER", "PREM"], cartController.addProduct);
    }
}

const cartsRouter = new CartsRouter();
export default cartsRouter.getRouter();