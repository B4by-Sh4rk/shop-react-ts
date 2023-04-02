import React, { useState } from 'react';
import YellowButton from './UI/button/YellowButton';
import NewInput from './UI/input/NewInput';
import { IProduct } from '../models/IProduct';
import { productAPI } from '../services/ProductService';

const NewProductForm = (products: any) => {
    const [createProduct, {error: createError, isLoading: isCreateLoading}] = productAPI.useCreateProductMutation()
        /* ----------------------------------- */

        const [Name, setName] = useState('');
        const [Description, setDescription] = useState('');
        const [brand, setBrand] = useState('');
        const [typeSize, setTypeSize] = useState('');
        const [urlImg, setUrlImg]= useState('');
        const [size, setSize]= useState('');
        const [manufacturer, setManufacturer] = useState('');
        const [price, setPrice] = useState('');
        const [careType, setCareType] = useState('');
        /* ----------------------------------- */

    const addNewProduct = async (event:any) => {
        event.preventDefault();
        const a: string = '' + products?.length;
        await createProduct({
            "id": Number(a+1),
            "url-img" : urlImg,
            "name": Name,
            "type-size": typeSize,
            "size": size,
            "barcode": a,
            "manufacturer": manufacturer,
            "brand": brand,
            "description": Description,
            "price": price,
            "careType": careType,
        } as IProduct)
    }

    return (
            <form className='NewProductForm'>
                <NewInput 
                type="text" 
                onChange={(e:any) => setName(e.target.value)}
                placeholder='Название'
                value={Name}
                />
                <NewInput
                    type="text" 
                    onChange={(e:any) => setDescription(e.target.value)}
                    value={Description}
                    placeholder='Описание'
                />
                <NewInput
                type="text" 
                onChange={(e:any) => setBrand(e.target.value)}
                value={brand}
                placeholder='Бренд'
                />
                <NewInput
                type="text" 
                onChange={(e:any) => setUrlImg(e.target.value)}
                value={urlImg}
                placeholder='URL картинки'
                />
                <NewInput
                type="text" 
                onChange={(e:any) => setTypeSize(e.target.value)}
                value={typeSize}
                placeholder='Тип размера'
                />
                <NewInput
                type="text" 
                onChange={(e:any) => setSize(e.target.value)}
                value={size}
                placeholder='Размер'
                />
                <NewInput
                type="text" 
                onChange={(e:any) => setManufacturer(e.target.value)}
                value={manufacturer}
                placeholder='Производитель'
                />
                <NewInput
                type="text" 
                onChange={(e:any) => setPrice(e.target.value)}
                value={price}
                placeholder='Цена'
                />
                <NewInput
                type="text" 
                onChange={(e:any) => setCareType(e.target.value)}
                value={careType}
                placeholder='Тип ухода'
                />
                <YellowButton onClick={addNewProduct}>Create</YellowButton>
            </form>
    );
};

export default NewProductForm;