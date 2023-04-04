import React from 'react';
import LOGO from "../../images/logo.svg";
import LOCATESVG from "../../images/locate.svg";
import EMAILSVG from "../../images/email.svg";
import CATALOGBTNSVG from "../../images/catalog-btn.svg";
import SEARCHBTNSVG from "../../images/search-btn.svg";
import DWBTNSVG from "../../images/dw-btn.svg";
import CARTSVG from "../../images/cart.svg";
import AGENT from "../../images/agent.png";
import {useNavigate} from 'react-router-dom';
import { productAPI } from '../../services/ProductService';

const Header = () => {
    const navigate = useNavigate();
    const {error, data: products, isLoading} = productAPI.useFetchCartQuery(0);

    const productsLength = products?.length;
    let totalPrice = 0;
    if(products){
        products.map(product =>
            totalPrice = Number(totalPrice + product.price)
        )
    }

    function isCartFull(){
        if(productsLength > 0){
            return <div className='cart__count'>{productsLength}</div>
        }else return;
    }

    return (
        <div className='header'>
            <div className='header__up'>
                <div className='header__info'>
                <div className='header__adres'>
                    <img src={LOCATESVG} alt="locate" />
                    <p><strong>г. Кокчетав, ул. Ж. Ташенова 129Б</strong> (Рынок Восточный)</p>
                </div>
                <div className='header__email'>
                    <img src={EMAILSVG} alt="email-svg" />
                    <p><strong>opt.sultan@mail.ru</strong><br></br>На связи в любое время</p>
                </div>
                </div>
                <nav className='header__nav'>
                    <ul>
                        <li className='header__nav__li'>О компании</li>
                        <li className='header__nav__li header__nav__li__border'>Доставка и оплата</li>
                        <li className='header__nav__li header__nav__li__border'>Возврат</li>
                        <li className='header__nav__li header__nav__li__border'>Контакты</li>
                    </ul>
                </nav>
            </div>
            <div className='header__under'>
                <div className='header__logo' onClick={() => navigate('/')}>
                        <img src={LOGO} alt='СУЛТАН'></img>
                </div>
                <div className='header__button__input'>
                    <button className='catalog-btn' onClick={() => navigate('/catalog')}><p>Каталог</p><img src={CATALOGBTNSVG} alt="catalogBtn" /></button>
                    <div className='header__search'>
                        <input placeholder='Поиск...'></input>
                        <button><img src={SEARCHBTNSVG} alt="search-svg" /></button>
                    </div>
                </div>
                <div className='header__agent__container'>
                <div className='header__agent'>
                    <p><strong>+7 (777) 490-00-91</strong><br/>время работы: 9:00-20:00</p>
                    <a>Заказать звонок</a>
                </div>
                <img className='header__agent__img' src={AGENT} alt="agent-photo" />
                </div>
                <button className='pricelist-btn'><p>Прайс-лист</p><img src={DWBTNSVG} alt="dwbtn-svg" /></button>
                <div className='header__cart' onClick={() => navigate('/cart')}>
                    <img src={CARTSVG} alt="cart-svg" />
                    <div className='header__cart__text'>
                        {isCartFull()}
                        <p>Корзина</p>
                        <p>{totalPrice} ₸</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;