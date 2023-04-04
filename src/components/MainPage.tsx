import React, { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import YellowButton from './UI/button/YellowButton';
import { productAPI } from '../services/ProductService';
import CurrentProductCard from './CurrentProductCard ';

const MainPage:FC = () => {
    const navigate = useNavigate();
    const {error, data: products, isLoading} = productAPI.useFetchAllProductsMainPageQuery(0);
    const brandPng1 = require('../images/1_2.png');
    const brandPng2 = require('../images/2_2.png');
    const brandPng3 = require('../images/3_2.png');
    const brandPng4 = require('../images/4_2.png');
    const brandPng5 = require('../images/5_2.png');
    const brandPng6 = require('../images/6_2.png');
    const brandPng7 = require('../images/7_2.png');
    const brandPng8 = require('../images/8_2.png');
    const brandPng9 = require('../images/9_2.png');
    const brandPng10 = require('../images/10_2.png');
    const map = require('../images/map.png');
    return (
        <div className='container'>
            <Header/>
            <div className='bg__img'>
                    <div className='gradient'>
                        <h1>Бытовая химия, косметика<br/> и хозтовары</h1>
                        <p>оптом по кокчетаву и области</p>
                        <div className='button__catalog'>
                            <YellowButton onClick={() => navigate('/catalog')}>В КАТАЛОГ</YellowButton>
                        </div>
                        <div className='info__blocks'>
                            <div className='info__block'>
                                <div className='info__yellow'>+</div> 
                                <p>Только самые<br/> выгодные предложения</p>
                            </div>
                            <div className='info__block'>
                                <div className='info__yellow'>+</div> 
                                <p>Бесплатная доставка по<strong> Кокчетаву от 10 тыс ₸</strong></p>
                            </div>
                        </div>
                    </div>
            </div>
            <div className='main__container'>
                <div className='main__title'>
                    <h1 className='yellow__title'>Акционные </h1><h1>товары</h1>
                </div>
                <div className='main__product__list'>
                    {products && products.map(product =>
                    <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
                    )}
                </div>

                <div className='main__title'>
                    <h1 className='yellow__title'>категории </h1><h1>товаров</h1>
                </div>
                <p className='under__title'>10 000+ ходовых позиций по спецмальным ценам</p>

                <div className='categories'>
                    <div className='category__block__full'>
                        <div className='category__block first__block'></div>
                        <p>Бытовая химия</p>
                    </div>
                    <div className='category__block__full'>
                        <div className='category__block second__block'></div>
                        <p>Косметика и гигиена</p>
                    </div>
                    <div className='category__block__full'>
                        <div className='category__block third__block'></div>
                        <p>Товары для дома</p>
                    </div>
                    <div className='category__block__full'>
                        <div className='category__block fourth__block'></div>
                        <p>Товары для детей и мам</p>
                    </div>
                    <div className='category__block__full'>
                        <div className='category__block fifth__block'></div>
                        <p>Посуда</p>
                    </div>
                </div>

                <div className='main__title'>
                    <h1 className='yellow__title'>Лучшие </h1><h1>товары</h1>
                </div>
                <p className='under__title'>От ведущих мировых брендов</p>
                <div className='brands'>
                    <img src={String(brandPng1)} alt="brand__img" />
                    <img src={String(brandPng2)} alt="brand__img" />
                    <img src={String(brandPng3)} alt="brand__img" />
                    <img src={String(brandPng4)} alt="brand__img" />
                    <img src={String(brandPng5)} alt="brand__img" />
                    <img src={String(brandPng6)} alt="brand__img" />
                    <img src={String(brandPng7)} alt="brand__img" />
                    <img src={String(brandPng8)} alt="brand__img" />
                    <img src={String(brandPng9)} alt="brand__img" />
                    <img src={String(brandPng10)} alt="brand__img" />
                </div>

                <img src={String(map)} alt="map" style={{marginTop: "100px", width: "100%"}}/>
                <div className='main__container' style={{marginTop: "10px", marginBottom: "-180px"}}>
                    <div className='page__nav'>
                        <NavLink to="/admin"><p>Админ</p></NavLink>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;