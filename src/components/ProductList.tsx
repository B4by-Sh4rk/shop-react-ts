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
    const [ Price, setPrice] = useState(0);
    const [ Manufacturer, setManufacturer] = useState('');
    const [ CareType, setCareType] = useState('уход за лицом');
    const [ filter, setFilter] = useState(false);

    const {error:err, data: productsTotal, isLoading:isload} = productAPI.useFetchAllProductsQuery(0)
    const {error, data: products, isLoading} = productAPI.useFetchAllProductsByPageQuery(page);
    const {error: errNameAcs, data: productsNameAcs, isLoading: isLoadingNameAcs} = productAPI.useFetchSortAcsNameProductsQuery(0);
    const {error: errPriceAcs, data: productsPriceAcs, isLoading: isLoadingPriceAcs} = productAPI.useFetchSortAcsPriceProductsQuery(0);
    const {error: errNameDesc, data: productsNameDesc, isLoading: isLoadingNameDesc} = productAPI.useFetchSortDescNameProductsQuery(0);
    const {error: errPriceDesc, data: productsPriceDesc, isLoading: isLoadingPriceDesc} = productAPI.useFetchSortDescPriceProductsQuery(0);
    const {error: errPrice, data: productsPrice, isLoading: isLoadingPrice} = productAPI.useFetchAllProductsWherePriceQuery(Price);
    const {error: errManufacturer, data: productsManufacturer, isLoading: isLoadingManufacturer} = productAPI.useFetchAllProductsWhereManufacturerQuery(Manufacturer);
    const {error: errCareType, data: productsCareType, isLoading: isLoadingCareType} = productAPI.useFetchAllProductsWhereCareTypeQuery(CareType);
    

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
   let price: number;

   const selectedPrice = (e:any) => {
    if(e < 0){
        e = 1;
    }else{
        setPrice(e);
    }
    return Price;
   }

   const selectedManufacturer = (e:any) => {
    if(e == ''){
        e = '';
    }else{
        setManufacturer(e);
        console.log(Manufacturer);
    }
    return Manufacturer;
   }

   const selectCareType = (e:any) => {
    if(e != ''){
        let a = e.replace(/\ /g, '%20')
        setCareType(a);
        console.log(a);
        return CareType;
    }else{
        return CareType;
    }
   }


   const selectedFilter = () => {
        setFilter(true);
        return filter;
   }


   const allManufacturer = () => {
    if (Manufacturer){
        return productsManufacturer && productsManufacturer.map(product =>
            <div key={product.id} className='chekbox__input'><input type="checkbox"/><label>{product.manufacturer}</label></div>
        )
    }else{
        return productsTotal && productsTotal.map(product =>
            <div key={product.id} className='chekbox__input'><input type="checkbox"/><label>{product.manufacturer}</label></div>
        )
    }
   }

   const currentProductList =(CurrentSelectedValue:any) => {
    if (filter == true) {
        if (Price > 0){
            return productsPrice && productsPrice.map(product =>
            <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
            )}
        else if (Manufacturer != ''){
            return productsManufacturer && productsManufacturer.map(product =>
                <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
            )}
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
        if (CareType == ''){
            return products && products.map(product =>
                <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
            )
        }else{
            return productsCareType && productsCareType.map(product =>
                <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
            )
        }
    }else if(CurrentSelectedValue == 'productsNameAcs'){
        return productsNameAcs && productsNameAcs.map(product =>
            <CurrentProductCard CurOnClick={(product) => navigate('/catalog/'+product.id)}  key={product.barcode} product={product}/>
        )
    }else if (CareType != ''){
        return productsCareType && productsCareType.map(product =>
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
                            <div className='filter__card'><p onClick={(e:any) => selectCareType(e.target.innerText)}>уход за телом</p></div>
                            <div className='filter__card'><p onClick={(e:any) => selectCareType(e.target.innerText)}>уход за руками</p></div>
                            <div className='filter__card'><p onClick={(e:any) => selectCareType(e.target.innerText)}>уход за ногами</p></div>
                            <div className='filter__card'><p onClick={(e:any) => selectCareType(e.target.innerText)}>уход за лицом</p></div>
                            <div className='filter__card'><p onClick={(e:any) => selectCareType(e.target.innerText)}>уход за волосами</p></div>
                            <div className='filter__card'><p onClick={(e:any) => selectCareType(e.target.innerText)}>средства для загара</p></div>
                            <div className='filter__card'><p onClick={(e:any) => selectCareType(e.target.innerText)}>средства для бритья</p></div>
                            <div className='filter__card' style={{width: "110px"}}><p onClick={(e:any) => selectCareType(e.target.innerText)}>подарочные наборы</p></div>
                            <div className='filter__card' style={{width: "140px"}}><p onClick={(e:any) => selectCareType(e.target.innerText)}>гигиеническая продукция</p></div>
                            <div className='filter__card' style={{width: "110px"}}><p onClick={(e:any) => selectCareType(e.target.innerText)}>шигиена полости рта</p></div>
                            <div className='filter__card' ><p onClick={(e:any) => selectCareType(e.target.innerText)}>бумажная продукция</p></div>
                        </div>
                        <div className='catalog__container'>
                            <div className='side__menu'>
                                <h1>ПОДБОР ПО ПАРАМЕТРАМ</h1>
                                <div className='side__menu__price'><p>Цена</p><strong>₸</strong></div>
                                <div className='search__price'>
                                    <input disabled type="number" min="0" placeholder={"0"}/>
                                    <p>-</p>
                                    <input type="number" min="0" placeholder={"10000"} onChange={(e:any) => selectedPrice(e.target.value)}/>
                                </div>
                                <h1>Производитель</h1>
                                <div className='side__menu__search'>
                                    <input
                                     placeholder='Поиск...'
                                     onChange={(e:any) => selectedManufacturer(e.target.value)}
                                    ></input>
                                    <YellowButton><img src={String(searchPng)} alt="search" /></YellowButton>
                                </div>
                                <div className='filters__checkbox'>
                                    {allManufacturer()}
                                    <button>Показать все ▼</button>
                                </div>
                                <div className='side__menu__buttons'>
                                    <YellowButton onClick={() => selectedFilter()}>Показать</YellowButton>
                                    <button><img src={String(deletePng)} alt="delete" /></button>
                                </div>
                                <ul className='side__menu__ul'>
                                    <h1>Уход за телом</h1>
                                    <NavLink to="/catalog" onClick={(e:any) => selectCareType(e.target.innerText)}>эпиляция и депиляция</NavLink>
                                    <NavLink to="/catalog"  onClick={(e:any) => selectCareType(e.target.innerText)}>средства для ванны и душа</NavLink>
                                    <NavLink to="/catalog"  onClick={(e:any) => selectCareType(e.target.innerText)}>скрабы, пилинги и пр.</NavLink>
                                    <NavLink to="/catalog"  onClick={(e:any) => selectCareType(e.target.innerText)}>мочалки и губки для тела</NavLink>
                                    <NavLink to="/catalog"  onClick={(e:any) => selectCareType(e.target.innerText)}>кремы, лосьоны, масла</NavLink>
                                    <NavLink to="/catalog"  onClick={(e:any) => selectCareType(e.target.innerText)}>интимный уход</NavLink>
                                    <NavLink to="/catalog"  onClick={(e:any) => selectCareType(e.target.innerText)}>дезодоранты, антиперспиранты</NavLink>
                                    <NavLink to="/catalog"  onClick={(e:any) => selectCareType(e.target.innerText)}>гели для душа</NavLink>
                                </ul>
                            </div>
                            <div className='main__side'>
                                <div className='product__list'>
                                    {err? <h1>данные не найдены</h1> :
                                    isload? <h1>Загрузка...</h1> :
                                    currentProductList(CurrentSelectedValue)
                                    }
                                </div>
                                <div className='products__pages'>
                                    <button onClick={isPage}>
                                    <img src={String(arrowLeft)} alt="Left"/>
                                    </button>
                                    {err? <h1>данные не найдены</h1> :
                                    isload? <h1></h1> :
                                    <p>{pageCounter()}</p>
                                    }
                                    {err? <h1>данные не найдены</h1> :
                                    isload? <h1></h1> :
                                    currentPage()
                                    }
                                    {err? <h1>данные не найдены</h1> :
                                    isload? <h1></h1> :
                                    <p>{pageCounterMore()}</p>
                                    }
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