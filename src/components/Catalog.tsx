import React, { FC } from 'react';
import ProductList from '../components/ProductList';

const Catalog:FC = () => {
    return (
        <div className='container'>
            <ProductList/>
        </div>
    );
};

export default Catalog;