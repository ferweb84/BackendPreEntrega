import { Server } from "socket.io";
import ProductManager from "./ProductManager.js";

const socket ={};

socket.connect = (server) => {
    const productmanager = new ProductManager()
    socket.io = new Server(server);

    socket.io.on ("connection",async (socket)=>{
        console.log(`Socket Client ${socket.id} connected`);
        const products = await productmanager.getProducts();
        socket.emit("products", products);
    });
};

export default socket; 