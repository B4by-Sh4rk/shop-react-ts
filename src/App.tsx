import React from 'react';
import '../src/css/index.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Catalog from './components/Catalog';
import MainPage from './components/MainPage';
import CurrentProduct from './components/CurrentProduct';
import Cart from './components/Cart';
import Admin from './components/Admin';
import OrderComplite from './components/OrderComplite';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
              <Route path="/catalog" element={<Catalog/>}/>
              <Route path="/catalog/:id" element={<CurrentProduct/>}/>
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/admin" element={<Admin/>}/>
              <Route path="/order_complite" element={<OrderComplite/>}/>
              <Route path="/" element={<MainPage/>}/>
              <Route path="*" element={<div>NotFound</div>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
