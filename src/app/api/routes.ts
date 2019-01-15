import * as apiController from "./controller";
import express from "express";
const router = express.Router();

router.get("/", apiController.getApi);

export default router;