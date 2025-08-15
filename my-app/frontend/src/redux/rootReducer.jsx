import { combineReducers } from "redux";
import shopReducer from "./Shopping/shopping-reducer";

//source: https://www.youtube.com/watch?v=MNs_7avLIJ4
const rootReducer = combineReducers({
    shop: shopReducer,
});

export default rootReducer;