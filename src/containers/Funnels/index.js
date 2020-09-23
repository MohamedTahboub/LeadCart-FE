import React, { Suspense, lazy } from 'react';
import { LoadingPage } from 'components/Loaders';
const Funnels = lazy(() => import('./main'));


export default (props) => (
  <Suspense fallback={<LoadingPage />}>
    <Funnels {...props} />
  </Suspense>
);

