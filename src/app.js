import express from "express";
import handlebars from "express-handlebars";
import productsRouter from './routes/productsrouter.js';
import cartrouter from './routes/cartrouter.js';
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`)); //verificar "/", 

//config Handlebars------------------------------
app.engine("handlebars", handlebars.engine());
app.set("views",`${__dirname}/views`);
app.set("view engine","handlebars");

// let testUsers=[
// {
//     name: "Hilda",
//     lastName: "pochocla",
//     Age: 3,
//     email: "hilda@sieras.com",
//     phone: 31525156
// },
// {
//     name: "shaki",
//     lastName: "sieras",
//     Age: 3,
//     email: "shaki@sieras.com",
//     phone: 31525156
// },
// {
//     name: "bolas ",
//     lastName: "tristes",
//     Age: 8,
//     email: "bolas@sieras.com",
//     phone: 315251656
// }
// ];

//Te cambie de usuario con numero aleatorio 

// app.get("/", (req, res) => {
//     const min = 0;
//     const max = users.length - 1;
//     const randomUser = Math.floor(Math.random() * (max - min + 1) + min);
//     res.render("users", users[randomUser]);
//   });
// let foodArray =[
//     {name:"hamburguesa",price:"456"},
//     {name:"lomito",price:"533"},
//     {name:"pizza",price:"543"},
    
// ]
// app.get("/",(req,res)=>{
//     let testUser={
//         name: "Shaki",
//         lastName: "Sieras",
//         role: "admin"
//     }

//     res.render("index",{
//         user:testUser,
//         isAdmin: testUser.role === "admin",
//         food: foodArray,
//     });
// });

//------------------------------------------------

app.use("/api/products", productsRouter);
app.use("/api/carts",cartrouter);
app.use("/",viewsRouter);

app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});

