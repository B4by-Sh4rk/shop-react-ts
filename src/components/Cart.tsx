import React, { FC, useState} from 'react';
import { productAPI } from '../services/ProductService';
import CartProducts from './CartProducts';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../models/IProduct';
import { NavLink } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import YellowButton from './UI/button/YellowButton';

interface currentProductParams{
    id: number;
}

const Cart:FC = (product) => {
    const {error, data: products, isLoading} = productAPI.useFetchCartQuery(0)
    const navigate = useNavigate();
    const [deleteProduct, {}] = productAPI.useDeleteProductfromCartMutation();
    const [buttonCart, setButtonCart] = useState(false);

    const handleRemove = (product: IProduct) => {
        deleteProduct(product)
    }

    let totalPrice: number = 0;
    if(products){
        products.map(product =>
            totalPrice = Number(totalPrice + product.price)
        )
    }

    const CartClick = (e:any) => {
        if(buttonCart === true){
            setButtonCart(false);
            return buttonCart
        }else if (buttonCart === false){
            products && products.map(product =>
                handleRemove(product)
            )
            navigate('/order_complite');
        }else return buttonCart;
    }

    console.log(buttonCart)
    return (
        <div className='container'>
            <Header/>
            <div className='main__container'>
                <div className='page__nav'>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/cart"><p className='notFirstLink'>Корзина</p></NavLink>
                </div>
                <div className='product__list__cart'>
                {products && products.map(product =>
                    <CartProducts remove={handleRemove} CurOnClick={() => {}} TotalCount={1}  key={product.barcode} product={product}/>
                )}
                    <div className='cart__bottom'>
                        <YellowButton onClick={(e:any) => CartClick(e.target)}>Оформить заказ</YellowButton>
                        <h1>{totalPrice} ₸</h1>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Cart;