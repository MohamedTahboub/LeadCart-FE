import React from 'react';
import Dashboard from '../Dashboard'

import './style.css'
export default ({ children, ...props }) => (
    <div className='active-content' >
        {children}
    </div>
);