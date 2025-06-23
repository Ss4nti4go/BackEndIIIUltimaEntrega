import { authController } from "../../controllers/auth.contoller.js";
import CustomRouter from "../../helpers/CustomRouter.js";

class AuthRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.create("/register", ["PUBLIC"], authController.register);
        this.create("/login", ["PUBLIC"], authController.login);
        this.create("/logout", ["USER", "PREM", "ADMIN"], authController.signout);
        this.read("/online", ["USER", "PREM", "ADMIN"], authController.online);
        this.read("/failure", ["PUBLIC"], authController.failure);
    }
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();
