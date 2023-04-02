import React, { FC, useState } from 'react';
import { IProduct } from '../models/IProduct';
import YellowButton from './UI/button/YellowButton';


interface currentProductProps {
    product: IProduct;
    remove: (product: IProduct) => void;
    CurOnClick:(product: IProduct)=> void;
    TotalCount:number;
}

const CartProduct: FC<currentProductProps> = ({product, CurOnClick, remove, TotalCount}) => 
{
    const [ Counter,  setCounter] = useState(TotalCount);

    const TotalCountCounter = () => {
        if(Counter <=1 ){
            return;
        }else if(Counter >1){
            setCounter(Counter - TotalCount -1);
            return Counter;
        }
    }
    const TotalCountCounterMore = () => {
        setCounter(Counter+ TotalCount +1);
        return Counter;
    }
    const TotalCountAll = () => {
        return <div>{Counter}</div>
    }

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(product)
    }
    const box = require('../images/box.png');
    const bottle = require('../images/bottle.png');
    const deletePng = require('../images/delete.png');

    const SizeType = () => {
        if(product['type-size']=='мл'){
            return <img className='type-size' src={String(bottle)} alt={product['type-size']}/>
        }else return <img className='type-size' src={String(box)} alt={product['type-size']}/>
    }
    let currentPrice:number = 0;
    let a:number;
    if (product){
        a = Number(product.price);
        currentPrice = a * Counter;
    }
    return (
        <div className='product__card__row' onClick={() => CurOnClick(product)}>
            <center><img src={product['url-img']} alt={product.name} width={100}/><br/></center>
            <div className='product__info__column'>
                <div className='type-size-row'>{SizeType()}<p>{product.size}</p><p>{product['type-size']}</p></div>
                {product.name}<br/>
                {product.description}
            </div>
            <button className='current__page' onClick={TotalCountCounter}>-</button>
            {TotalCountAll()}шт.
            <button className='current__page' onClick={TotalCountCounterMore}>+</button><br/>
            {currentPrice} ₸
            <YellowButton onClick={handleRemove}><img src={String(deletePng)} alt="delete"/></YellowButton>
        </div>
    );
};

export default CartProduct;