import express from "express";
import {
  createFarm,
  deleteFarm,
  getFarm,
  updateFarm,
} from "../controllers/farm.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const farmRouter = express.Router();

farmRouter.post("/create", createFarm);
farmRouter.post("/farm", getFarm);
farmRouter.post("/update", updateFarm);
farmRouter.post("/delete", deleteFarm);

export default farmRouter;
