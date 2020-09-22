import React, { Suspense, lazy } from 'react';

const ProductBuilder = lazy(() => import('./main'));


export default (props) => <Suspense fallback={<span>Loading...</span>}><ProductBuilder {...props} /></Suspense>;

