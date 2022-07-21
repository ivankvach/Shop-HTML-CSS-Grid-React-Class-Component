import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header, Products, SingleProduct, Cart, MiniCart, CurrencyOptions } from './components';

function App() {
  return (
    <div>
        <Header/>
        <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="women" element={<Products/>}/>
        <Route path="men" element={<Products/>} />
        <Route path="kids" element={<Products/>} />
        <Route path="single-product/:id" element={<SingleProduct/>}/>
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
