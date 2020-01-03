import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as modalsActions from 'actions/modals';
import * as productsActions from 'actions/products';
import * as productActions from 'actions/product';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PrecreateProductModals from 'components/PrecreateProductModals';


import './style.css';
import {
  ProductCard 
} from './components'

const {
  // ProductCard,
  Page,
  PageHeader,
  PageContent,
  // NewThingCard,
  MainTitle,
  InputRow,
  Currency,
  Button
} = common;;

const ProductShadowLoading = () => <div className='empty-product-shadowbox animated-background' />;

const Products = ({
  isFetching: loadingProducts,
  deleteProduct,
  products,
  filtersLabels,
  subdomain,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState('');
  const [showCreateModal, setShowProductModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterKeys, setFilterKeys] = useState({ categories: ['checkout', 'upsell'] });

  const onProductEdit = ({ category = '', _id }) => {
    props.history.push(`/${category.toLowerCase()}/${_id}`);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);


  const onProductDuplicate = ({
    __v,
    id,
    _id,
    name,
    isActive,
    owner,
    coupons: { list, enabled } = {},
    payment,
    createdAt,
    updatedAt,
    downSell,
    upSell,
    url,
    ...product
  }) => {
    product.name = `${name}- copy`;
    product.coupons = { enabled: !!enabled };
    delete product.token;


    if (payment.type === 'Onetime' && payment.recurringPeriod) delete payment.recurringPeriod;
    // else if (!payment.recurringPeriod) payment.recurringPeriod = 'MONTH';

    if (product.category === 'upsell') product.payment = { type: payment.type };
    else product.payment = payment;


    props.createNewProduct(product, {
      onSuccess: (msg) => {
      },
      onFailed: (message) => { }
    });
  };
  const onShowDeleteDialogue = (id) => setShowDelete(id);
  const onHideDeleteDialogue = () => setShowDelete('');

  const onProductDelete = () => {
    deleteProduct(showDelete);
    onHideDeleteDialogue();
  };

  const onFilterProducts = (searchKey, categories) => {
    let filtered = products;
    if (searchKey) filtered = filtered.filter(({ name = '' }) => name.toLowerCase().includes(searchKey.toLowerCase()));

    if (categories) filtered = filtered.filter((p) => categories.includes(p.category));

    setFilterKeys({ searchKey, categories });
    setFilteredProducts(filtered);
  };

  const onSearch = ({ target: { value: searchKey } }) => {
    const { categories } = filterKeys;
    if (searchKey === 'all') return onFilterProducts(undefined, categories);
    onFilterProducts(searchKey, categories);
  };


  const onToggleCategory = (name) => () => {
    let { searchKey, categories } = filterKeys;

    categories = categories.includes(name) ? categories.filter((c) => c !== name) : [...categories, name];
    onFilterProducts(searchKey, categories);
  };
  return (
    <Page>
      <PageHeader>
        <div className='margin-h-20 flex-container fb-aligned-center'>
          <InputRow.TextField
            // className='products-search-field'
            onChange={onSearch}
            prefix={<Currency value={<i className='fas fa-search' />} />}
            value={filterKeys.searchKey}
            name='product'
          />


          <InputRow.Checkbox
            className='margin-left-10'
            onClick={onToggleCategory('checkout')}
            checked={filterKeys.categories.includes('checkout')}
          >
            Checkout
          </InputRow.Checkbox>
          <InputRow.Checkbox
            className='margin-left-10'
            onClick={onToggleCategory('upsell')}
            checked={filterKeys.categories.includes('upsell')}
          >
            Upsell
          </InputRow.Checkbox>
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
            orderInlist={id}
            {...product}
            onDelete={() => onShowDeleteDialogue(product._id)}
            onDuplicate={() => onProductDuplicate(product)}
            onEdit={() => onProductEdit(product)}
          // onPreview={() => onProductPreview(product.url)}
          />
        ))
          : loadingProducts ? ([0]).map((i) => <ProductShadowLoading key={i} />) : null
        }
        {!!showCreateModal && (
          <PrecreateProductModals
            show={showCreateModal}
            onClose={() => setShowProductModal(false)}
            {...props}
          />
        )}

      </PageContent>

      {!!showDelete && (
        <Modal onClose={onHideDeleteDialogue} isVisible={showDelete}>
          <MainTitle>Are you sure,you want delete this product ?</MainTitle>
          <Button onClick={onHideDeleteDialogue} className='primary-color margin-with-float-left'>
            {' '}
            Cancel
          </Button>
          <Button onClick={onProductDelete} className='warning-color margin-with-float-right'>
            <i className='fas fa-trash-alt' />
            {' '}
            Delete
          </Button>
        </Modal>
      )}
    </Page>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.loading,
  subdomain: state.user.user.subDomain,
  products: state.products.products.map((p) => ({ ...p, category: p.category || 'Checkout' })),
  filtersLabels: [
    { label: 'All Products', value: 'all' },
    ...state.products.products.map((p) => ({ label: p.name, value: p._id || p.id }))
  ]
});

export default connect(mapStateToProps, { ...productsActions, ...productActions, ...modalsActions })(Products);
