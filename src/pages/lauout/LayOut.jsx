import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../home/navbar/Navbar';
import Footer from '../home/footer/Footer';

const LayOut = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login') ||  location.pathname.includes('register');
    return (
        <div className='max-w-screen-xl mx-auto'>
           {
                isLogin ||  <Navbar></Navbar>
           }
            <Outlet></Outlet>
            {
                isLogin || <Footer></Footer>
            }
        </div>
    );
};

export default LayOut;