import { ProductAction, ProductActionTypes, ProductState } from "../../types/product"

const inittialState: ProductState = {
    products: [],
    loading: false,
    error: null,
    page: 1,
    limit: 4,
}

export const productReducer = (state = inittialState, action: ProductAction): ProductState => {
    switch (action.type){
        case ProductActionTypes.FETCH_PRODUCTS:
            return{...state, loading: true, error:null, products: []}
        case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
            return{...state, loading: false, error:null, products: action.payload}
        case ProductActionTypes.FETCH_PRODUCTS_ERROR:
            return{...state, loading: false, error:action.payload, products: []}
        case ProductActionTypes.SET_PRODUCTS_PAGE:
            return{...state, page:action.payload}
        default:
            return state;
    }
}