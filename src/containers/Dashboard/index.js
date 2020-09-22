import React, { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./main'));


export default (props) => <Suspense fallback={<span>Loading...</span>}><Dashboard {...props} /></Suspense>;

