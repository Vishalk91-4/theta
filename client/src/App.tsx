import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Items from './pages/Items';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout/Checkout';
import About from './pages/About';
import Registration from './pages/Registration';
import './App.css';
import PaypalProvider from "./providers/PaypalProvider";
import { useUserContext } from "./context/UserContext";
import Account from './pages/Account/Account';
import FAQ from './pages/FAQ/FAQ';
import BrowseMeals from './pages/BrowseMeals/BrowseMeals';

function App() {
    const { loading } = useUserContext();

    if (loading) {
        return <>Loading...</>
    }

    return (
            <PaypalProvider>
                <div className="App">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/account" element={<Account />} />
                        <Route path='/faq' element={<FAQ />} />
                        <Route path='/menu' element={<BrowseMeals />} />
                    </Routes>
                    <Footer />
                </div>
            </PaypalProvider>
    );
}

export default App;
