import * as actionTypes from "./shopping-types";
import axios from 'axios';
import { api } from "../../api"

// fetch products
export const fetchProducts = () => async (dispatch) => {
    dispatch({type: actionTypes.FETCH_PRODUCTS_REQUEST});
    try {
        // const res = await axios.get("/products");
        const res = await api.get("/products");
        dispatch({
            type: actionTypes.FETCH_PRODUCTS_SUCCESS,
            payload: res.data,
        });
    } catch(error) {
        dispatch({
            type: actionTypes.FETCH_PRODUCTS_FAIL,
            payload: error.message,
        });
    }
}

// initiate a shopping cart
export const initCart = () => async (dispatch) => {
    // let cartId = sessionStorage.getItem("cartId");
    // console.log("Initial cartId from localStorage:", cartId);
    try {
        let cartId = sessionStorage.getItem("cartId");
        console.log("Initial cartId from localStorage:", cartId);
        // if the cart not exist, create a new one
        if (!cartId) {
            console.log("No cartId found, creating a new cart...");
            // const res = await axios.post("/cart");
            const res = await api.post("/cart");
            cartId = res.data.cartId;
            sessionStorage.setItem("cartId", cartId);
            console.log("New cartId created and saved:", cartId);
        }

        // Fetch exisiting cart
        // const cartResut = await axios.get(`/cart/${cartId}`);
        const cartResut = await api.get(`/cart/${cartId}`);
        dispatch({
            type: actionTypes.INIT_CART_SUCCESS,
            payload: {
                cartId,
                items: cartResut.data.items,
            },
        });
    } catch (error) {
        dispatch({
            type: actionTypes.INIT_CART_FAIL,
            payload: error.message,
        })
    }
}

export const addToCart = (productId, variant = null, qty = 1) => async (dispatch, getState) => {
  try {
    const state = getState(); // Get full Redux state, without this will have cart null bug
    const cartId = state.shop.cartId; // Access cartId from state
    console.log("Using cartId:", cartId);

    if (!cartId) throw new Error("Cart ID is not available. Did you run initCart()?");

    // const res = await axios.post(`/cart/${cartId}/add`, {
    const res = await api.post(`/cart/${cartId}/add`, {
      productId,
      variant,
      qty,
    });

    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: res.data.items,
    });
  } catch (error) {
    console.error("Add to cart failed:", error);
  }
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
  const state = getState();
  const cartId = state.shop.cartId;

  try {
    // const res = await axios.delete(`/cart/${cartId}/remove/${productId}`);
    const res = await api.delete(`/cart/${cartId}/remove/${productId}`);
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: res.data.items,
    });
  } catch (error) {
    console.error("Remove from cart failed:", error);
  }
};

export const adjustQty = (productId, quantity) => async (dispatch, getState) => {
    const state = getState();
    const cartId = state.shop.cartId;

    if (!cartId) {
        console.error("Cart ID not found");
        return;
    }

    try {
        // const res = await axios.put(`/cart/${cartId}/adjust`, {
        const res = await api.put(`/cart/${cartId}/adjust`, {
            productId,
            quantity
        });

        dispatch({
            type: actionTypes.ADJUST_QTY,
            payload: res.data.items,
        });
    } catch (err) {
        console.error("Adjust quantity failed:", err);
    }
};