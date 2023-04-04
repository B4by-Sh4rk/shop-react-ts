import React from 'react';
import LOGO from "../../images/logo-white.svg";
import WA from "../../images/wa.svg";
import TG from "../../images/tg.png";
import SEARCHBTNSVG from "../../images/search-btn.svg";
import DWBTNSVG from "../../images/dw-btn.svg";
import VISA from "../../images/Visa.png";
import MASTERCARD from "../../images/mastercard.png";

const Footer = () => {
    return (
        <div className='footer'>
                <div className='footer__column first__column'>
                        <img src={LOGO} alt='СУЛТАН'></img>
                    <p>Компания «Султан» — снабжаем розничные магазины товарами 
                    "под ключ" в Кокчетаве и Акмолинской области</p>
                    <p>Подпишись на скидки и акции</p>
                    <div className='footer__search'>
                    <input placeholder='Поиск...'></input>
                    <button><img src={SEARCHBTNSVG} alt="search" /></button>
                </div>
                </div>
                <div className='footer__column'>
                    <h2>Меню сайта:</h2>
                    <ul>
                            <li>О компании</li>
                            <li>Доставка и оплата</li>
                            <li>Возврат</li>
                            <li>Контакты</li>
                    </ul>
                </div>
                <div className='footer__column'>
                    <h2>Категории:</h2>
                    <ul>
                            <li>Бытовая химия</li>
                            <li>Косметика и гигиена</li>
                            <li>Товары для дома</li>
                            <li>Товары для детей и мам</li>
                            <li>Посуда</li>
                    </ul>
                </div>
                <div className='footer__column'>
                    <h2>Скачать прайс-лист:</h2>
                    <button className='pricelist-btn'><p>Прайс-лист</p><img src={DWBTNSVG} alt="dwbtn" /></button>
                    <p>Связь в мессенджерах:</p>
                    <div className='footer__socials__container'>
                    <button className='footer__socials wa-btn'><img src={WA} alt="wa" /></button>
                    <button className='footer__socials tg-btn'><img src={TG} alt="tg" /></button>
                    </div>
                </div>
                <div className='footer__column'>
                    <h2>Контакты:</h2>
                    <div className='footer__agent'>
                    <p><strong>+7 (777) 490-00-91</strong><br/>время работы: 9:00-20:00</p>
                    <a>Заказать звонок</a>
                    <p><strong>opt.sultan@mail.ru </strong><br/>На связи в любое время</p>
                    </div>
                    <div className='footer__cards'>
                        <img src={VISA} alt="VISA" />
                        <img src={MASTERCARD} alt="MASTERCARD" />
                    </div>
                </div>
        </div>
    );
};

export default Footer;