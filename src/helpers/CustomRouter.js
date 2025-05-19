import { Router } from "express";
import setResponses from "../middlewares/setResponses.mid.js";
import setupPolicies from "../middlewares/setPolicies.mid.js";


class CustomRouter {
    constructor() {
        this.router = Router();
         this.router.use(setResponses);
    }

    getRouter= () => {
        return this.router;
    }
    setMiddleware = (middlewares) => {
       return  middlewares.map(each => async (req, res, next) => {
            try {
                await each(req, res, next);
            } catch (error) {
                next(error);
            }
        });
    }
    create = (path, policies,...middlewares) => {
        this.router.post(path, setupPolicies(policies),this.setMiddleware(middlewares));
    }
    read = (path, policies,...middlewares) => {
        this.router.get(path, setupPolicies(policies),this.setMiddleware(middlewares));
    }
    update = (path, policies,...middlewares) => {
        this.router.put(path, setupPolicies(policies),this.setMiddleware(middlewares));
    }
    destroy = (path,policies ,...middlewares) => {
        this.router.delete(path, setupPolicies(policies),this.setMiddleware(middlewares));
    }
    use = (path, policies,...middlewares) => {
        this.router.use(path,setupPolicies(policies), this.setMiddleware(middlewares));
    }

}

export default CustomRouter