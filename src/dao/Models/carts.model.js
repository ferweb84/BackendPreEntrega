import mongoose from "mongoose";

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: Array
  // products: {
  //   type: [
  //     {
  //       productId: {
  //         type: String,
  //         required: true,
  //       },
  //       quantity: {
  //         type: Number,
  //         required: true,
  //       },
  //     },
  //   ],
  //   required: true,
  // },
  // ! Cómo es mejor declarar este schema?
});

export const cartModel = mongoose.model(cartsCollection, cartSchema);