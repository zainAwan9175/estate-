import express from "express";
const router=express.Router();
import { func2,func1 } from "../controlers/user-controler.js";
router.get("/signin",func2)

export default router;