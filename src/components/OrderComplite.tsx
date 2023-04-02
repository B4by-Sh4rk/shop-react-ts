import React from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import { productAPI } from '../services/ProductService';
import { IProduct } from '../models/IProduct';
import YellowButton from './UI/button/YellowButton';

const OrderComplite = () => {
    const {error, data: products, isLoading} = productAPI.useFetchCartQuery(0);
    const [deleteProduct, {}] = productAPI.useDeleteProductfromCartMutation();

    const handleRemove = async(product: IProduct) => {
        let a = await isLoading == false;
        if(a){
            {products && products.map(product =>
                deleteProduct(product)
            )}
        }
    }

    return (
        <div className='container'>
            <Header/>
            <div className='main__container'>
                <h1 style={{marginTop:"10%"}}>Спасибо за заказ</h1>
            </div>
            <Footer/>
        </div>
    );
};

export default OrderComplite;