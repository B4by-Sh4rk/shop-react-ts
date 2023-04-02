import React, { FC, useState } from 'react';
import { IProduct } from '../models/IProduct';
import YellowButton from './UI/button/YellowButton';
import { productAPI } from '../services/ProductService';

interface ProductItemProps {
    product: IProduct;
    remove: (product: IProduct) => void;
    update: (product: IProduct) => void;
    CurOnClick:(product: IProduct)=> void;
    addToCart:(product: IProduct)=> void;
    TotalCount:number;
}


const ProductCardFull: FC<ProductItemProps> = ({product, CurOnClick, remove, update, addToCart, TotalCount}) => {

    const [createProduct, {error: err, isLoading: isload}] = productAPI.useCreateCartMutation();
    const {error, data: products, isLoading} = productAPI.useFetchCartQuery(0);

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
    const whiteCart = require('../images/white-cart.png');
    const share = require('../images/share.png');
    const dwblack = require('../images/dwblack.png');

    const SizeType = () => {
        if(product['type-size']=='мл'){
            return <img className='type-size' src={String(bottle)} alt={product['type-size']}/>
        }else return <img className='type-size' src={String(box)} alt={product['type-size']}/>
    }
        /* ----------------------------------- */
    const addNewCart = async (event:any) => {
        event.preventDefault();
        const a: string = '' + products?.length;
        await createProduct({
            "id": Number(a+1),
            "url-img" : product['url-img'],
            "name": product.name,
            "type-size": product['type-size'],
            "size": product.size,
            "barcode": a,
            "manufacturer": product.manufacturer,
            "brand": product.brand,
            "description": product.description,
            "price": product.price,
            "careType": product.careType,
        } as IProduct)
    }

    const [ Counter,  setCounter] = useState(TotalCount);

    const TotalCountCounter = () => {
        if(Counter <=0 ){
            return;
        }else if(Counter >0){
            setCounter(Counter+ TotalCount -1);
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

    return (
        <div className='product__card__full'>
            <div className='left__side'><img src={product['url-img']} alt={product.name}/></div>

            <div className='right__side'>
                <p className='inStock'>в наличии</p>
                <strong className='product__name'>{product.name}</strong>
                <div className='type-size-row'>{SizeType()}<p>{product.size}</p><p>{product['type-size']}</p></div>
                <div className='price__row'>
                    <p className='price'>{product.price} ₸</p>
                    <button className='current__page' onClick={TotalCountCounter}>-</button>
                    {TotalCountAll()}
                    <button className='current__page' onClick={TotalCountCounterMore}>+</button><br/>
                    <YellowButton onClick={addNewCart}>В корзину <img src={whiteCart} alt={'whiteCart'}/></YellowButton>
                </div>
                <div className='share__row'>
                    <button className='share__block'><img src={share} alt={'share'}/></button>
                    <div className='share__block middle__block'><p>При покупке от 10 000 ₸ бесплатная доставка по Кокчетаву и области</p></div>
                    <button className='share__block last__block'>Прайс-лист<img src={dwblack} alt={'dwblack'}/></button>
                </div>
                <div className='product__info'>
                    <p className='product__info__row'>Штрихкод: <strong>{product.barcode}</strong></p>
                    <p className='product__info__row'>Производитель: <strong>{product.manufacturer}</strong></p>
                    <p className='product__info__row'>Бренд: <strong>{product.brand}</strong></p>
                </div>
                <div className='product__desc'>
                   <strong>Описание:</strong> <p>{product.description}</p> 
                </div>
                <div className='product__info border__dotted'>
                    <strong>Характеристики:</strong>
                    <p className='product__info__row'>Объём: <strong>{product.size} {product['type-size']}</strong></p>
                    <p className='product__info__row'>Штрихкод: <strong>{product.barcode}</strong></p>
                    <p className='product__info__row'>Бренд: <strong>{product.brand}</strong></p>
                    <p className='product__info__row'>Производитель: <strong>{product.manufacturer}</strong></p>
                    <p className='product__info__row'>Тип ухода: <strong>{product.careType}</strong></p>
                    <p className='product__info__row'>Наименование: <strong>{product.name}</strong></p>
                </div>
            </div>
        </div>
    );
};

export default ProductCardFull;