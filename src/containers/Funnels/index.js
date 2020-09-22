import React, { Suspense, lazy } from 'react';

const Funnels = lazy(() => import('./main'));


export default (props) => <Suspense fallback={<span>Loading...</span>}><Funnels {...props} /></Suspense>;

