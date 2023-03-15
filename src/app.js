import express from "express";
import productsRouter from './routes/productsrouter.js';
import cartrouter from './routes/cartrouter.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(`${__dirname}/public`));

app.use("/api/products", productsRouter);
app.use("/api/carts",cartrouter);

app.listen(8080, () => {
    try {
        console.log("Servidor arriba en el puerto 8080");
    } catch (error) {
        console.log(error);
    }
});

