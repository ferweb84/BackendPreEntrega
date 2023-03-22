import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const foodArray = [
{   
    name:"fideos",
    price: 264,
},
{   
    name:"arroz",
    price: 284.5,
},
{   
    name:"polenta",
    price: 164,
},
{   
    name:"yerba",
    price: 664.3,
},
];

const testUser = {
    name: "Emilse",
    lastName: "Quiroga",
    age: 20,
    email: "emi@gmail.com",
    phone: "35123648",
    role: "admin",
    
};

//preguntar si es "index" solo o index.handlebars para diferenciar del index.html
router.get ("/",(req,res)=>{
    res.render("index", {
        user: testUser,
        isAdmin: testUser.role === "admin",
        food: foodArray,
        style: "index.css",
    });
});

router.get ("/", async (req,res)=>{
    const products =await ProductManager.getProducts()
    res.render ("home", {products});
});

router.get("/realTimeProducts", (req,res)=>{
    res.render ("realTimeProducts", {});
})

export default router;