import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';

const MainPage:FC = () => {
    return (
        <div className='container'>
            <Header/>
            <div className='main__container'>
                <div className='main__container'>
                    <div className='page__nav'>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/catalog"><p className='notFirstLink'>Каталог</p></NavLink>
                        <NavLink to="/admin"><p className='notFirstLink'>Админ</p></NavLink>
                    </div>
                </div>
                <h1>AAAAAAAAAAAAAAA</h1>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;