import React, { Suspense, lazy } from 'react';
import { LoadingPage } from 'components/Loaders';
const ProductBuilder = lazy(() => import('./main'));


export default (props) => (
  <Suspense fallback={<LoadingPage />}>
    <ProductBuilder {...props} />
  </Suspense>
);

