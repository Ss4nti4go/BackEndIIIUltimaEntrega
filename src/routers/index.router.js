 import { Router } from "express";
import apiRouter from "./api.router.js";
import viewrouter from "./api/view.router.js";
 
const indexRouter = Router();

indexRouter.use("/api", apiRouter);
indexRouter.use("", viewrouter)
//indexRouter.use("/", viewRouter);
export default indexRouter;