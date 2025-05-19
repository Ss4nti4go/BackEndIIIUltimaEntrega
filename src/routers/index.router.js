 import { Router } from "express";
import apiRouter from "./api.router.js";
 
const indexRouter = Router();

indexRouter.use("/api", apiRouter);
//indexRouter.use("/", viewRouter);
export default indexRouter;