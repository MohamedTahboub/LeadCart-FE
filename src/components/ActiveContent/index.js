import React from 'react';
// import Dashboard from '../Dashboard'
import ProductDetails from '../ProductDetails'

import './style.css'
export default ({ children, ...props }) => (
    <div className='active-content' >
       <ProductDetails/>
    </div>
);