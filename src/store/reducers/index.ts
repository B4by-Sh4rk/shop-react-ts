import {combineReducers} from "redux";
import { productAPI } from "../../services/ProductService";
import { productReducer } from "./productReducer";

export const rootReducer = combineReducers({
    product: productReducer,
    [productAPI.reducerPath]: productAPI.reducer,
})

export type RootState = ReturnType<typeof rootReducer>