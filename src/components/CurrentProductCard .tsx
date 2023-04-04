import React, { FC } from 'react';
import { IProduct } from '../models/IProduct';
import YellowButton from './UI/button/YellowButton';


interface currentProductProps {
    product: IProduct;
    CurOnClick:(product: IProduct)=> void;
}

const CurrentProductCard: FC<currentProductProps> = ({product, CurOnClick}) => {

    const box = require('../images/box.png');
    const bottle = require('../images/bottle.png');
    const whiteCart = require('../images/white-cart.png');
    const SizeType = () => {
        if(product['type-size']=='мл'){
            return <img className='type-size' src={String(bottle)} alt={product['type-size']}/>
        }else return <img className='type-size' src={String(box)} alt={product['type-size']}/>
    }

    return (
        <div className='product__card' onClick={() => CurOnClick(product)} >
                        <center><img src={product['url-img']} alt={product.name}/><br/></center>
            <div className='type-size-row'>{SizeType()}<p>{product.size}</p><p>{product['type-size']}</p></div>
            <strong className='product__name'>{product.name}</strong>
            <div className='product__info'>
                <p className='product__info__row'>Штрихкод: <strong>{product.barcode}</strong></p>
                <p className='product__info__row'>Производитель: <strong>{product.manufacturer}</strong></p>
                <p className='product__info__row'>Бренд: <strong>{product.brand}</strong></p>
            </div>
            <div className='price__buy'><p className='price'>{product.price} ₸</p><YellowButton>Купить <img src={String(whiteCart)} alt={"white_cart"}/></YellowButton></div>
        </div>
    );
};

export default CurrentProductCard;