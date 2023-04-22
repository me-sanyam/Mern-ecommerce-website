import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoadUser } from "./actions/UserAction"
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login'
import Register from './Pages/Register'
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Navbar from "./Pages/Navbar";
import Footer from "./Pages/Footer";
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import DetailedProduct from "./Pages/DetailedProduct";
import MyAccount from "./Pages/MyAccount";
import Cart from './Pages/Cart'
import Contact from './Pages/Contact'
import NoRoute from "./Pages/NotFound";
import ProtectedRoute from "./Pages/ProtectedRoute";
import UpdateUserProfile from "./Pages/UpdateUserProfile"
import UserPasswordUpdate from "./Pages/UpdateUserPassword";
import Checkout from './Pages/Checkout';
import MyOrders from './Pages/MyOrders';
import Orderdetails from './Pages/OrderDetails';
import Dashboard from "./Pages/Dashboard";
import axios from "axios";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AllProductsList from "./Pages/AllProductsList";
import NewProduct from "./Pages/NewProduct";
import AllOrdersList from "./Pages/AllOrderslist";
import ProcessOrder from "./Pages/UpdateOrder";
import AllUsersList from "./Pages/AllUsersList";
import EditUser from "./Pages/EditUser";
import EditProduct from "./Pages/EditProduct";

function App() {
  const [stripeapikey, setstripeapikey] = useState('');

  useEffect(() => {
    store.dispatch(LoadUser())

    async function getstripeapikey() {
      const { data } = await axios.get('/api/stripeapi');
      setstripeapikey(data.stripeApiKey)
    }

    getstripeapikey();
  }, [])

  return (
    <>
      <BrowserRouter>
        <>
          <Navbar />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} exact />
              <Route path='/shop' element={<Shop />} />
              <Route path='/cart' element={<Cart />} />
              <Route path="/shop/:id" element={<DetailedProduct />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/cart' element={<Cart />} />
              {stripeapikey &&
                <Route path="/checkout" element={
                  <Elements stripe={loadStripe(stripeapikey)}>
                    <Checkout />
                  </Elements>
                } />
              }
              <Route path='/myprofile' element={<MyAccount />} />
              <Route path="/myprofile/update" element={<UpdateUserProfile />} />
              <Route path="/myprofile/password/update" element={<UserPasswordUpdate />} />
              <Route path='/myorders' element={<MyOrders />} />
              <Route path='/myorders/:id' element={<Orderdetails />} />
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/products' element={<AllProductsList />} />
              <Route path='/admin/product/new' element={<NewProduct />} />
              <Route path='/admin/product/:id' element={<EditProduct />} />
              <Route path='/admin/orders' element={<AllOrdersList />} />
              <Route path='/admin/process/:id' element={<ProcessOrder />} />
              <Route path='/admin/users' element={<AllUsersList />} />
              <Route path='/admin/user/:id' element={<EditUser />} />
            </Route>
            <Route path='/account/login' element={<Login />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path='/account/register' element={<Register />} />
            <Route path='*' element={<NoRoute />} />
          </Routes>
          <Footer />
        </>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
