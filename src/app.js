import express from "express";
import handlebars from "express-handlebars";
import {Server} from "socket.io";
import productsRouter from './routes/productsrouter.js';
import cartrouter from './routes/cartrouter.js';
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import socket from "./socket.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/",express.static(`${__dirname}/public`)); //verificar "/", 

//config Handlebars------------------------------
app.engine("handlebars", handlebars.engine());
app.set("views",`${__dirname}/views`);
app.set("view engine","handlebars");

app.use("/api/products", productsRouter);
app.use("/api/carts",cartrouter);
app.use("/",viewsRouter);

const httpServer = app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});

socket.connect (httpServer);
