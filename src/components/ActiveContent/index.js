import React from 'react';
// import Dashboard from '../Dashboard'
import NewProductDetailes from '../ProductDetails'

import './style.css'
export default ({ children, ...props }) => (
    <div className='active-content' >
       <NewProductDetailes/>
    </div>
);