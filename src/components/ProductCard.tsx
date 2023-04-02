import React, { FC } from 'react';
import { IProduct } from '../models/IProduct';
import YellowButton from './UI/button/YellowButton';

interface ProductItemProps {
    product: IProduct;
    remove: (product: IProduct) => void;
    update: (product: IProduct) => void;
    CurOnClick:(product: IProduct)=> void;
    addToCart:(product: IProduct)=> void;
}

const ProductCard: FC<ProductItemProps> = ({product, CurOnClick, remove, update, addToCart}) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation()
        remove(product)
    }
    const handleUpdate = (event: React.MouseEvent) => {
        const Name = prompt() || ""
        update({...product, "name" : Name})
    }
    const box = require('../images/box.png');
    const bottle = require('../images/bottle.png');

    const SizeType = () => {
        if(product['type-size']=='мл'){
            return <img className='type-size' src={String(bottle)} alt={product['type-size']}/>
        }else return <img className='type-size' src={String(box)} alt={product['type-size']}/>
    }

    return (
        <div className='product__card'>
            <center><img src={product['url-img']} alt={product.name}/><br/></center>
            <div className='type-size-row'>{SizeType()}<p>{product.size}</p><p>{product['type-size']}</p></div>
            <strong className='product__name'>{product.name}</strong>
            <div className='product__info'>
                <p className='product__info__row'>Штрихкод: <strong>{product.barcode}</strong></p>
                <p className='product__info__row'>Производитель: <strong>{product.manufacturer}</strong></p>
                <p className='product__info__row'>Бренд: <strong>{product.brand}</strong></p>
            </div>
            <p className='price'>{product.price} ₸</p>
            <YellowButton onClick={handleRemove}>DELETE</YellowButton>
            <YellowButton onClick={handleUpdate}>ЗАМЕНИТЬ</YellowButton>
        </div>
    );
};

export default ProductCard;