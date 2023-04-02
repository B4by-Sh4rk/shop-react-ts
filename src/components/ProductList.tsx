import React, {useState} from 'react';
import type {} from 'redux-thunk/extend-redux'
import { productAPI } from '../services/ProductService';
import CurrentProductCard from './CurrentProductCard ';
import {useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import YellowButton from './UI/button/YellowButton';
import Header from './Header/Header';
import Footer from './Footer/Footer';


const ProductList: React.FC = () => {
    const [ page, setPage] = useState(1);
    const navigate = useNavigate();

    const {error:err, data: productsTotal, isLoading:isload} = productAPI.useFetchAllProductsQuery(0)
    const {error, data: products, isLoading} = productAPI.useFetchAllProductsByPageQuery(page);
    const {error: errNameAcs, data: productsNameAcs, isLoading: isLoadingNameAcs} = productAPI.useFetchSortAcsNameProductsQuery(0);
    const {error: errPriceAcs, data: productsPriceAcs, isLoading: isLoadingPriceAcs} = productAPI.useFetchSortAcsPriceProductsQuery(0);
    const {error: errNameDesc, data: productsNameDesc, isLoading: isLoadingNameDesc} = productAPI.useFetchSortDescNameProductsQuery(0);
    const {error: errPriceDesc, data: productsPriceDesc, isLoading: isLoadingPriceDesc} = productAPI.useFetchSortDescPriceProductsQuery(0);
    

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
            return <div className='current__page'>1</div>;
        }else return <div className='current__page'>{page}</div>;
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
   const [ CurrentSelectedValue, setCurrentSelectedValue] = useState('products');
   const selectedValue = (e:any) => {
    if(e == 'productsNameAcs'){
    }else if (e == 'productsNameDesc'){
    }else if (e == 'productsPriceAcs'){
    }else if (e == 'productsPriceDesc'){
    }
    setCurrentSelectedValue(e);
    return CurrentSelectedValue;
   }

   const currentProductList =(CurrentSelectedValue:any) => {
    if(CurrentSelectedValue == 'productsNameAcs'){
        return productsNameAcs && productsNameAcs.map(product =>
            <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
        )
    }else if (CurrentSelectedValue == 'productsNameDesc'){
        return productsNameDesc && productsNameDesc.map(product =>
            <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
        )
    }else if (CurrentSelectedValue == 'productsPriceAcs'){
        return productsPriceAcs && productsPriceAcs.map(product =>
            <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
        )
    }else if (CurrentSelectedValue == 'productsPriceDesc'){
        return productsPriceDesc && productsPriceDesc.map(product =>
            <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
        )
    }else if (CurrentSelectedValue == 'products'){
        return products && products.map(product =>
            <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
        )
    }
   }

   const arrowLeft = require('../images/arrowLeft.png');
   const arrowRight = require('../images/arrowRight.png');
   const searchPng = require('../images/search.png');
   const deletePng = require('../images/delete.png');

    return (
        <div>
            <Header/>
            <div className='main__container'>
                <div className='__page'>
                    <div className='page__nav'>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/catalog"><p className='notFirstLink'>Косметика и гигиена</p></NavLink>
                    </div>
                    <div className='page__title'>
                        <h1>Косметика и гигиена</h1>
                        <div className='title__side'>
                            <strong>Сортировка:</strong>
                            <select
                            onChange={(e:any) => selectedValue(e.target.value)}
                            >
                            <option selected value={'products'}>Сортировать по</option>
                            <option value={'productsNameAcs'}>Название А-Я</option>
                            <option value={'productsNameDesc'}>Название Я-А</option>
                            <option value={'productsPriceAcs'}>Цена от большей</option>
                            <option value={'productsPriceDesc'}>Цена от меньшей</option>
                            </select>
                        </div>
                    </div>
                    <div className='__products'>
                        <div className='filterNav'>
                            <div className='filter__card'><p>Уход за телом</p></div>
                            <div className='filter__card'><p>Уход за руками</p></div>
                            <div className='filter__card'><p>Уход за ногами</p></div>
                            <div className='filter__card'><p>Уход за лицом</p></div>
                            <div className='filter__card'><p>Уход за волосами</p></div>
                            <div className='filter__card'><p>Средства для загара</p></div>
                            <div className='filter__card'><p>Средства для бритья</p></div>
                            <div className='filter__card' style={{width: "110px"}}><p>Подарочные наборы</p></div>
                            <div className='filter__card' style={{width: "140px"}}><p>Гигиеническая продукция</p></div>
                            <div className='filter__card' style={{width: "110px"}}><p>Гигиена полости рта</p></div>
                            <div className='filter__card'><p>Бумажная продукция</p></div>
                        </div>
                        <div className='catalog__container'>
                            <div className='side__menu'>
                                <h1>ПОДБОР ПО ПАРАМЕТРАМ</h1>
                                <div className='side__menu__price'><p>Цена</p><strong>₸</strong></div>
                                <div className='search__price'>
                                    <input type="number" placeholder={"0"}/>
                                    <p>-</p>
                                    <input type="number" placeholder={"10000"}/>
                                </div>
                                <h1>Производитель</h1>
                                <div className='side__menu__search'>
                                    <input placeholder='Поиск...'></input>
                                    <YellowButton><img src={String(searchPng)} alt="search" /></YellowButton>
                                </div>
                                <div className='filters__checkbox'>
                                    <div className='chekbox__input'><input type="checkbox"/><label>Выбор 1</label></div>
                                    <div className='chekbox__input'><input type="checkbox"/><label>Выбор 2</label></div>
                                    <div className='chekbox__input'><input type="checkbox"/><label>Выбор 3</label></div>
                                    <div className='chekbox__input'><input type="checkbox"/><label>Выбор 4</label></div>
                                    <button>Показать все ▼</button>
                                </div>
                                <div className='side__menu__buttons'>
                                    <YellowButton onClick={()=> {}}>Показать</YellowButton>
                                    <button><img src={String(deletePng)} alt="delete" /></button>
                                </div>
                                <ul className='side__menu__ul'>
                                    <h1>Уход за телом</h1>
                                    <NavLink to="/">Эпиляция и депиляция</NavLink>
                                    <NavLink to="/">Средства для ванны и душа</NavLink>
                                    <NavLink to="/">Скрабы, пилинги и пр.</NavLink>
                                    <NavLink to="/">Мочалки и губки для тела</NavLink>
                                    <NavLink to="/">Кремы, лосьоны, масла</NavLink>
                                    <NavLink to="/">Интимный уход</NavLink>
                                    <NavLink to="/">Дезодоранты, антиперспиранты</NavLink>
                                    <NavLink to="/">Гели для душа</NavLink>
                                </ul>
                            </div>
                            <div className='main__side'>
                                <div className='product__list'>
                                    {/*products && products.map(product =>
                                        <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
                                    )*/}
                                    {currentProductList(CurrentSelectedValue)}
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
            </div>
            <Footer/>
        </div>
    );
};

export default ProductList;