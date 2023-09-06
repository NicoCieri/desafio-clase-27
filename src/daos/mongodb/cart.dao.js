import { CartModel } from "./models/cart.model.js";
import { ProductModel } from "./models/product.model.js";
import MongoDao from "./mongo.dao.js";

export default class CartDao extends MongoDao {
  constructor() {
    super(CartModel);
  }

  async getById(id) {
    try {
      const cart = await CartModel.findById(id).populate("items.product");
      return cart || false;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(id, productId) {
    try {
      const product = await ProductModel.findById(productId);
      const cart = await CartModel.findById(id);
      const productInCart = cart.items.find(
        (item) => item.product._id.toString() === product._id.toString()
      );

      if (productInCart) productInCart.quantity++;
      else
        cart.items.push({
          product,
          quantity: 1,
        });

      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProductFromCart(id, productId) {
    try {
      const cart = await CartModel.findById(id);
      cart.items = cart.items.filter(
        (item) => item.product._id.toString() !== productId
      );
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCartItems(id, items) {
    try {
      const cart = await CartModel.findById(id);
      cart.items = items;
      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductQuantity(id, productId, quantity) {
    try {
      const cart = await CartModel.findById(id);
      const productInCart = cart.items.find(
        (item) => item.product._id.toString() === productId
      );

      if (productInCart) productInCart.quantity = quantity;
      else throw new Error("Product not found in cart");

      await cart.save();
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProducts(id) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        id,
        { items: [] },
        { new: true }
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}
