import express from "express";
const router= express.Router();

import userlogin from "../Uservarify_middleware.js";
import { signup,signin,googl ,updateprofile,deleteaccount,updatepic,checklogin,getuser} from "../controlers/auth-controler.js";


router.post("/signup",signup)
router.post("/updateprofile",updateprofile)
router.post("/signin",signin)
router.post("/deleteaccount",userlogin,deleteaccount),
router.post("/updatepic",userlogin,updatepic),
router.get("/check-login",userlogin,checklogin),
router.get("/get/:id",getuser),

router.post("/signout",(req,res)=>{
    try{
           res.cookie("token","")
           res.json({signout:true});
    }
catch(err)
{
    res.json(err)
}
})

router.post("/google",googl)

export default router