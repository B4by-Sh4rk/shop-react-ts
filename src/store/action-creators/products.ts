import { Dispatch } from 'redux';
import { ProductAction, ProductActionTypes } from '../../types/product';
import axios from 'axios';

export const fetchProducts = (page: number = 1, limit: number = 4) => {
    return async (dispatch: Dispatch<ProductAction>) => {
        try{
            dispatch({type: ProductActionTypes.FETCH_PRODUCTS})
            const response = await axios.get(`http://localhost:3000/products`, {
                params:{_page: page, _limit: limit}
            })
            dispatch({type:ProductActionTypes.FETCH_PRODUCTS_SUCCESS, payload: response.data})
        }catch(e){
            dispatch({
                type: ProductActionTypes.FETCH_PRODUCTS_ERROR, 
                payload: "Error"
            })
        }
    }
}

export function setProductPage(page:number): ProductAction {
    return {type: ProductActionTypes.SET_PRODUCTS_PAGE, payload: page}
}
