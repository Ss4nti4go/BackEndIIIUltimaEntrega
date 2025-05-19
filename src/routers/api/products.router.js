
import {productController} from "../../controllers/controller.js";
import CustomRouter from "../../helpers/CustomRouter.js";
//const productRouter = Router();
class ProductsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    
    init = () => {
        this.read("/", ["PUBLIC"] ,productController.readAll);
        this.read("/:id", ["PUBLIC"],productController.readById);
        this.create("/",["ADMIN"] ,productController.createOne);
        this.update("/:id", ["ADMIN"],productController.updateById);
        this.destroy("/:id", ["ADMIN"],productController.destroyById);
    }
}
const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();
