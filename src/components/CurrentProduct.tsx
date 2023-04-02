import React, { FC } from 'react';
import { productAPI } from '../services/ProductService';
import { useParams, useNavigate} from 'react-router-dom';
import ProductCardFull from './ProductCardFull';
import { IProduct } from '../models/IProduct';
import path from 'path';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { NavLink } from 'react-router-dom';

interface currentProductParams{
    id: number;
}

const CurrentProduct: FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const idProduct: number = Number(params.id);
    const {error, data: products, isLoading} = productAPI.useFetchCurrentProductQuery(idProduct)
    const [deleteProduct, {}] = productAPI.useDeleteProductMutation();
    const [updateProduct, {}] = productAPI.useUpdateProductMutation();
    const [addCart, {}] = productAPI.useCreateCartMutation();

    const handleRemove = (product: IProduct) => {
        deleteProduct(product)
    }

    const handleUpdate = (product: IProduct) => {
        updateProduct(product)
    }

    
    const handleCart = (product: IProduct) => {
        addCart(product)
    }

    let productName:any ='';
    if(products){
        productName = products[0].name;
    }
    let productId:any ='';
    if(products){
        productId = products[0].id;
    }

    return (
        <div className='container'>
            <Header/>
            <div className='main__container'>
                <div className='page__nav'>
                    <NavLink to="/">Главная</NavLink>
                    <NavLink to="/catalog"><p className='notFirstLink'>Каталог</p></NavLink>
                    <NavLink to={`/catalog/${productId}`}><p className='notFirstLink'>{productName}</p></NavLink>
                </div>
                {isLoading && <h1>Загрузка...</h1>}
                {error && <h1>Ошибка загрузки товара</h1>}
                {products && products.map(product =>
                        <ProductCardFull TotalCount={0} CurOnClick={(product) => navigate('/catalog')} addToCart={handleCart} remove={handleRemove} update={handleUpdate} key={product.barcode} product={product}/>
                    )}
            </div>
            <Footer/>
        </div>
    );
};

export default CurrentProduct;