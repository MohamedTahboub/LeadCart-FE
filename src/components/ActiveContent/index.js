import React from 'react';

import './style.css'
export default ({ children, ...props }) => (
    <div className='active-content' >
       {children}
    </div>
);