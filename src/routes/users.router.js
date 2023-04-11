import { Router } from "express";
import { userModel } from "../dao/Models/user.model.js";
import UserManager from "../dao/filesManagers/usersManager.js";

const userManager= new UserManager();

//llamamos a Router y lo vamos a colocar en una variable router con minuscula 
const router = Router();

// creamos una ruta que nos permita trater todos los usuarios
router.get("/",async(req,res)=>{
    const users= await  userManager.findAll();
    return res.send({status:"success", payload: users});
});

router.post("/",async(req,res)=>{
    const user= req.body;
    const createdUser= await userManager.create(user);
    if (!createdUser){
        return res.status(400).send({status:"error", error:"Duplicated email"});
    }
    return res.send({status:"success", payload: createdUser});
});

//----------------------------------------------------

router.get("/", async (req,res)=>{
try{
    const users=await userModel.find();
    res.send({status:"Success", payload:users});

  }catch (error){
    console.log (error); 
  }
});

router.post("/",async (req,res)=>{
    try{
        const {first_name, last_name, email}=req.body;
        if (!first_name || !last_name || !email){
            return res
            .status(400)
            .send ({status: "error", error: "missing properties"});
        }

        const user= {
            first_name, 
            last_name, 
            email
        }

        const userCreated = await userModel.create(user)

        return res.send({ status: "success", payload: userCreated});

      }catch (error){
        console.log (error); 
      }
    });

router.put("/:uid",async (req,res)=> {
    try{
        const{uid}=req.params;
        const updatedUser=req.body;
        if(!updatedUser){
            return res
            .status(400)
            .send ({status:"error", error: "missing information"});
        }
        const user= await userModel.updateOne({_id:uid},updatedUser);
        return res.send ({status: "success", payload:user});
    }catch(error){
        console.log (error);
    }
});

router.delete("/:uid", async(req,res)=> {
    const{uid}=req.params;

    const user= await userModel.deleteOne({
        _id: uid});
        return res.send ({status: "success", payload: user});
    
});

export default router;