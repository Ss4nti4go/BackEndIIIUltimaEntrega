import { Router } from "express";
import productRouter  from "./api/products.router.js";
import mocksRouter from "./api/mocks.router.js";
import usersRouter from "./api/users.router.js";
//import authRouter from "./api/auth.router.js";
const apiRouter = Router();
//apiRouter.use("auth", authRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/mocks", mocksRouter);
apiRouter.use("/users", usersRouter);

apiRouter.get("/sumar/pocos", (req, res) => {
    let total = 0;
    for (let i = 0; i < 100; i++) {
        total = total+i*i;
    }
    res.send({ total });
});
apiRouter.get("/sumar/muchos", (req, res) => {
    let total = 0;
    for (let i = 0; i < 1000000000; i++) {
        total = total+i*i;
    }
    res.send({ total });
})
export default apiRouter;