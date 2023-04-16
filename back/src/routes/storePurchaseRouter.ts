import express from "express";
import { storePurchaseController } from "../controllers/storePurchaseController";

const router = express.Router();

router.post("/", storePurchaseController.store);

export default router;
