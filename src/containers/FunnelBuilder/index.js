import React, { Suspense, lazy } from 'react';
import { LoadingPage } from 'components/Loaders';
const Wizard = lazy(() => import('./main'));


export default (props) => (
  <Suspense fallback={<LoadingPage />}>
    <Wizard {...props} />
  </Suspense>
);

