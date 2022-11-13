import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Common/Footer';
import NavMenu from '../Pages/Common/NavMenu';

const Main = () => {
    return (
        <div>
            <NavMenu></NavMenu>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;