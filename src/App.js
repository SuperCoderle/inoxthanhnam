import './App.css';
import { BrowserRouter, Route, Routes, Router, Switch , NavLink } from 'react-router-dom';
import SignIn from './MainPage/SignIn';
import Home from './MainPage/Home';
import Shop from './MainPage/Shop/Shop';
import Inox from './MainPage/Shop/Inox';
import WoodenFurniture from './MainPage/Shop/WoodenFurniture';
import Houseware from './MainPage/Shop/Houseware';
import Machine from './MainPage/Shop/Machine';
import User from './MainPage/Admin/User';
import Product from './MainPage/Admin/Product';
import ProductForm from './MainPage/Admin/ProductForm';
import EditProductForm from './MainPage/Admin/EditProductForm';
import ProductDetails from './MainPage/Shop/ProductDetails';
import Intro from './MainPage/Intro';
import Order from './MainPage/Admin/Order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/admin' element={<SignIn/>}></Route>
        <Route exact path='/user' element={<User/>}></Route>
        <Route exact path='/product' element={<Product/>}></Route>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/shop' element={<Shop/>}></Route>
        <Route exact path='/intro' element={<Intro/>}></Route>
        <Route exact path='/order' element={<Order/>}></Route>
        <Route exact path='/categories/inox' element={<Inox/>}></Route>
        <Route exact path='/categories/wooden-furniture' element={<WoodenFurniture/>}></Route>
        <Route exact path='/categories/houseware' element={<Houseware/>}></Route>
        <Route exact path='/categories/machine' element={<Machine/>}></Route>
        <Route exact path='/product/productForm' element={<ProductForm/>}></Route>
        <Route exact path='/product/editProductForm/:ProductID' element={<EditProductForm/>}></Route>
        <Route exact path='/product/details/:ProductID' element={<ProductDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
