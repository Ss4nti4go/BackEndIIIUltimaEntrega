
import {userController} from "../../controllers/controller.js";
import CustomRouter from "../../helpers/CustomRouter.js";
//const productRouter = Router();
class UsersRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    
    init = () => {
        this.read("/", ["admin"] ,userController.readAll);
        this.read("/:id", ["user",'admin'],userController.readById);
        this.create("/",["PUBLIC"] ,userController.createOne);
        this.update("/:id", ["user", "admin"],userController.updateById);
        this.destroy("/:id", ["user","admin"],userController.destroyById);
    }
}
const userRouter = new UsersRouter();
export default userRouter.getRouter();
