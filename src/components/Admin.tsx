import React, { useState } from 'react';
import NewProductForm from './NewProductForm';
import { productAPI } from '../services/ProductService';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../models/IProduct';
import { NavLink } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Admin = () => {
    const [ page, setPage] = useState(1);
    const {error:err, data: productsTotal, isLoading:isload} = productAPI.useFetchAllProductsQuery(0);
    const {error, data: products, isLoading} = productAPI.useFetchAllProductsByPageQuery(page);
    const navigate = useNavigate();
    const [deleteProduct, {}] = productAPI.useDeleteProductMutation();
    const [updateProduct, {}] = productAPI.useUpdateProductMutation();

    const handleRemove = (product: IProduct) => {
        deleteProduct(product)
    }

    const handleUpdate = (product: IProduct) => {
        updateProduct(product)
    }
    const a: any = productsTotal?.length;
    const totalPages = Math.floor(a / 8)+1;


    /* ----------------------------------- */
    const pageCounter = () => {
        if(page <=1 ){
            return;
        }else if(page >1){
            const a = page -1;
            return a;
        }
    }
    const pageCounterMore = () => {
        if (page >= totalPages){
        return;
        }
        const b = page +1;
        return b;
    }
    const currentPage = () => {
        if(page <= 1){
            return <p className='current__page'>1</p>;
        }else return <p className='current__page'>{page}</p>;
    }
    const isPage = () => {  
         if(page <= 1){
            setPage(1);
        }else{
            setPage(page - 1);
        }
    }
    const isPageNext = () => {  
        if (page >= totalPages){
           setPage(totalPages);
       }
       else{
           setPage(page + 1);
       }
   }

   const arrowLeft = require('../images/arrowLeft.png');
   const arrowRight = require('../images/arrowRight.png');

    return (
        <div className='container'>
        <Header/>
        <div className='main__container'>
            <div className='page__nav'>
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/admin"><p className='notFirstLink'>Админ</p></NavLink>
            </div>
            <div className='admin__page'>
                <div className='side__menu'><NewProductForm products={products}/></div>
                <div className='main__side'>
                    <div className='admin__products'>
                        <div className='admin__products__list'>
                            {products && products.map(product =>
                            <ProductCard CurOnClick={(product) => navigate('/catalog')} addToCart={()=> {}} remove={handleRemove} update={handleUpdate} key={product.barcode} product={product}/>
                            )}
                        </div>
                        <div className='products__pages'>
                            <button onClick={isPage}>
                            <img src={String(arrowLeft)} alt="Left"/>
                            </button>
                            <p>{pageCounter()}</p>
                            {currentPage()}
                            <p>{pageCounterMore()}</p>
                            <button
                            onClick={isPageNext}>
                                <img src={String(arrowRight)} alt="Right"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default Admin;