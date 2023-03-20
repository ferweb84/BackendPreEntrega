import { Router } from "express";

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
    name: "emilse",
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

export default router;