import React, { lazy, Suspense } from 'react';

const Wizard = lazy(() => import('./main'));


export default (props) => <Suspense fallback={<span>Loading...</span>}><Wizard {...props} /></Suspense>;

