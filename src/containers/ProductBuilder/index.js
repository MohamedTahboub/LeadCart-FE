import React, { lazy, Suspense } from 'react';
import { ProductBuilderSkelton } from 'components/Loaders';

const ProductBuilder = lazy(() => import('./main'));


export default (props) => (
  <Suspense
    fallback={<ProductBuilderSkelton />}
  >
    <ProductBuilder {...props} />
  </Suspense>
);

