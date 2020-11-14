import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as modalsActions from 'actions/modals';
import * as productsActions from 'actions/products';
import * as productActions from 'actions/product';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PreCreateProductModals from 'components/PrecreateProductModals';
import { ProductSchema } from 'libs/validation';
import { notification } from 'libs';
import { ProductCard, ProductShadowLoading } from './components';

import './style.css';

const {
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  InputRow,
  Currency,
  Button,
  FlexBox
} = common;


const { SearchInput, TextField } = InputRow;
const Products = ({
  isFetching: loadingProducts,
  deleteProduct,
  products,
  defaultBrandCurrency,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState('');
  const [showCreateModal, setShowProductModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterKeys, setFilterKeys] = useState({ categories: ['checkout', 'upsell'] });

  const onProductEdit = ({ id, _id: productId = id }) => {
    props.history.push(`/products/${productId}`);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);


  const onProductDuplicate = async (product = {}) => {
    const newReplica = {
      ...product,
      name: `${product.name}- copy`
    };

    const {
      isValid,
      value: newProduct
    } = await ProductSchema(newReplica);

    if (!isValid)
      return notification.failed('Couldn\'t duplicate this product');


    props.createNewProduct(newProduct, {
      onSuccess: (msg) => {
        notification.success('Product duplicated successfully');
      },
      onFailed: notification.failed
    });
  };
  const onShowDeleteDialogue = (id) => setShowDelete(id);
  const onHideDeleteDialogue = () => setShowDelete('');

  const onProductDelete = () => {
    deleteProduct(showDelete);
    onHideDeleteDialogue();
  };

  const onFilterProducts = (searchKey, category) => {
    let filtered = products;
    if (searchKey) filtered = filtered.filter(({ name = '' }) => name.toLowerCase().includes(searchKey.toLowerCase()));
    if (category && category !== 'all') filtered = filtered.filter((p) => category === p.category);

    setFilterKeys({ searchKey, category });
    setFilteredProducts(filtered);
  };

  const onSearch = ({ target: { value: searchKey } }) => {
    onFilterProducts(searchKey);
  };

  const onCategorySearch = ({ target: { value: category } }) => {
    onFilterProducts(filterKeys.searchKey, category);
  };

  return (
    <Page>
      <PageHeader>
        <div className='margin-h-20 flex-container fb-aligned-center'>
          <TextField
            onChange={onSearch}
            prefix={<Currency value={<i className='fas fa-search' />} />}
            value={filterKeys.searchKey}
            name='product'
          />
          <SearchInput
            className='chart-select-filter product-categories mx-2'
            options={[
              { label: 'All Products Categories', value: 'all' },
              { label: 'Checkout Products', value: 'checkout' },
              { label: 'Upsell/Downsell Products', value: 'upsell' },
              { label: 'Opt-in Products', value: 'opt-in' },
              { label: 'Thank you Pages', value: 'thankyoupage' }
            ]}
            value={filterKeys.category}
            defaultValue={'all'}
            name='category'
            onChange={onCategorySearch}
          />
        </div>
        <Button onClick={() => setShowProductModal(true)} className='primary-color'>
          <i className='fas fa-plus' />
          new product
        </Button>
      </PageHeader>
      <PageContent dflex>
        {filteredProducts.length ? filteredProducts.map((product, id) => (
          <ProductCard
            key={`${product._id}-${id}`}
            orderInList={id}
            {...product}
            currency={defaultBrandCurrency}
            onDelete={() => onShowDeleteDialogue(product._id)}
            onDuplicate={() => onProductDuplicate(product)}
            onEdit={() => onProductEdit(product)}
            productId={product._id}
          />
        ))
          : (loadingProducts) ? ([0]).map((i) => <ProductShadowLoading key={i} />) : null
        }
        {!!showCreateModal && (
          <PreCreateProductModals
            show={showCreateModal}
            onClose={() => setShowProductModal(false)}
            {...props}
          />
        )}
      </PageContent>

      {
        !!showDelete && (
          <Modal onClose={onHideDeleteDialogue} isVisible={showDelete}>
            <MainTitle>Are you sure,you want delete this product ?</MainTitle>
            <Button onClick={onHideDeleteDialogue} className='primary-color margin-with-float-left'>
              Cancel
            </Button>
            <Button onClick={onProductDelete} className='warning-bg margin-with-float-right'>
              <i className='fas fa-trash-alt' />
            Delete
            </Button>
          </Modal>
        )
      }
    </Page>
  );
};

const mapStateToProps = ({
  loading: isFetching,
  user: { user: { subdomain } = {} } = {},
  products: { products = [] } = {},
  settings: { generalModel: { currency: defaultBrandCurrency = 'USD' } = {} } = {}
}) => ({
  isFetching,
  subdomain,
  products: products.map((p) => ({ ...p, category: p.category || 'Checkout' })),
  defaultBrandCurrency,
  filtersLabels: [
    { label: 'All Products', value: 'all' },
    ...products.map((p) => ({ label: p.name, value: p._id || p.id }))
  ]
});

export default connect(mapStateToProps, { ...productsActions, ...productActions, ...modalsActions })(Products);
