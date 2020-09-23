import React, { Suspense, lazy } from 'react';
import { LoadingPage } from 'components/Loaders';
const Dashboard = lazy(() => import('./main'));


export default (props) => (
  <Suspense fallback={<LoadingPage />}>
    <Dashboard {...props} />
  </Suspense>
);

