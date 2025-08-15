import * as actionTypes from "./shopping-types";

// source: https://www.youtube.com/watch?v=MNs_7avLIJ4
const INITIAL_STATE = {
    products: [],
    cart: [], 
    // cartId: null,
    cartId: sessionStorage.getItem("cartId") || null,
    currentItem: null,
    loading: false,
    error: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // cart initilization
        case actionTypes.INIT_CART_SUCCESS:
            return {
                ...state,
                cartId: action.payload.cartId,
                cart: action.payload.items,
                loading: false,
                error: null,
            };
        case actionTypes.INIT_CART_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // fetch products
        case actionTypes.FETCH_PRODUCTS_REQUEST:
            return { ...state, loading: true};
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case actionTypes.FETCH_PRODUCTS_FAIL:
            return { ...state, loading: false, error: action.payload };
        // shopping cart
        case actionTypes.ADD_TO_CART:
            return { ...state,  loading: false, cart: action.payload };
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: [...action.payload], // Ensure a new array is returned
                loading: false,
            };
        case "CLEAR_CART":
            return {
                ...state,
                cart:[],
            };
        case actionTypes.ADJUST_QTY:
            return { ...state,  loading: false, cart: action.payload };
        default:
            return state;
    }
};

export default shopReducer;