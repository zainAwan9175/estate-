import express from "express";
const router= express.Router();
import userlogin from "../Uservarify_middleware.js";

import { create ,getlisiting,deletelisting,getsinglelisting,update,search} from "../controlers/Lisitining-controler.js";


router.post("/create",userlogin,create);

router.post("/update/:id",userlogin,update);

router.post("/delete/:id",deletelisting);
router.get("/getlisiting/:id",userlogin,getlisiting);    //it is the route  to get all listigs
router.get("/search",search);  

router.get("/get/:id",getsinglelisting);       // it is the route to get single listig 
export {router as listiningRoute}