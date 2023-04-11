import express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import productsRouter from './routes/productsrouter.js';
import cartrouter from './routes/cartrouter.js';
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
//import chatRouter from "./routes/chat.router.js"
import socket from "./socket.js";
import messagesRouter from "./routes/messages.router.js";
import usersRouter from "./routes/users.router.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",express.static(`${__dirname}/public`)); //verificar "/", 

//config Handlebars------------------------------
app.engine("handlebars", handlebars.engine());
app.set("views",`${__dirname}/views`);
app.set("view engine","handlebars");

const httpServer = app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
        
    } catch (error) {
        console.log(error);
    }
});

//estas variables las utilizo para reemplazar en mongoos.connect el usuario y la contraseña para que no aparezcan y no exponemos nuestra base de datos
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

//MONGOOSE colocar el password de la base de datos y el nombre y con las variables anteriores en . env ; tenemos nuestras credenciales protegidas 
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@codercluster.ljckttz.mongodb.net/${dbName}?retryWrites=true&w=majority`)

//creamos las rutas aqui y le decimos que utilice el usersRouter
app.use("/api/users", usersRouter);
//creamos las rutas aqui y le decimos que utilice el messagesRouter
app.use("/api/messages", messagesRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts",cartrouter);
app.use("/",viewsRouter);

//app.use("/chat",chatRouter);

socket.connect (httpServer);
