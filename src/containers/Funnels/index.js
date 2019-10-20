import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as modalsActions from 'actions/modals';
import * as productsActions from 'actions/products';
import * as productActions from 'actions/product';
import sampleFunnels from 'data/funnels.json';

import { Modal } from 'components/Modals';
import common from 'components/common';


import './style.css';

const {
  FunnelCard,
  Page,
  PageHeader,
  PageContent,
  MainTitle,
  Button
} = common;

// const { SearchInput, Checkbox } = InputRow;

const ProductShadowLoading = () => <div className='empty-product-shadowbox animated-background' />;

const Funnels = ({
  funnels,
  filtersLabels,
  subdomain,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState('');
  const [creatingFunnel, setCreateFunnel] = useState(false);

  // const [showProductForm, setShowProductForm] = useState({});
  const [showCreateModal, setShowLoadingModal] = useState(false);
  // const [filteredProducts, setFilteredProducts] = useState(products);
  const [filterKeys, setFilterKeys] = useState({ categories: ['Checkout', 'UpSell'] });
  // const onProductPreview = ({category , _id }) => {
  //   const productUrl = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${url}`;
  //   window.open(productUrl, '_blank');
  // };

  const onFunnelEdit = (url) => {
    props.history.push(`/funnels/${url}`);
  };


  // useEffect(() => {
  //   setFilteredProducts(funnels);
  // }, [funnels]);


  // const onProductDuplicate = ({
  //   __v,
  //   id,
  //   _id,
  //   name,
  //   isActive,
  //   owner,
  //   coupons: { list, enabled } = {},
  //   url,
  //   ...product
  // }) => {
  //   product.name = `${name}- copy`;
  //   product.url = 'autoGenerateUrl';
  //   product.coupons = { enabled: !!enabled };

  //   delete product.token;

  //   props.createNewProduct(product, {
  //     onSuccess: (msg) => {
  //     },
  //     onFailed: (message) => { }
  //   });
  // };


  const onShowDeleteDialogue = (id) => setShowDelete(id);
  const onHideDeleteDialogue = () => setShowDelete('');

  const onFunnelDelete = () => {
    // deleteProduct(showDelete);
    // onHideDeleteDialogue();
  };

  // const onFilterProducts = (searchKey, categories) => {
  //   let filtered = products;
  //   if (searchKey) filtered = filtered.filter((p) => p._id === searchKey);

  //   if (categories) filtered = filtered.filter((p) => categories.includes(p.category));

  //   setFilterKeys({ searchKey, categories });
  //   setFilteredProducts(filtered);
  // };

  // const onSearch = ({ target: { name, value: searchKey } }) => {
  //   const { categories } = filterKeys;
  //   if (searchKey === 'all') return onFilterProducts(undefined, categories);
  //   onFilterProducts(searchKey, categories);
  // };


  // const onToggleCategory = (name) => () => {
  //   let { searchKey, categories } = filterKeys;

  //   categories = categories.includes(name) ? categories.filter((c) => c !== name) : [...categories, name];
  //   onFilterProducts(searchKey, categories);
  // };


  return (
    <Fragment>
      <Page>
        <PageHeader>
          <div className='margin-v-20 flex-container fb-aligned-center'>
            <MainTitle>Funnels</MainTitle>
          </div>
          <Button onClick={() => setShowLoadingModal(true)} className='primary-color'>
            <i className='fas fa-plus' />
          new funnel
          </Button>
        </PageHeader>
        <PageContent dflex>
          {funnels.length && funnels.map((funnel, id) => (
            <FunnelCard
              {...funnel}
              key={`${funnel._id}`}
              orderInlist={id}
              onDelete={() => onShowDeleteDialogue(funnel._id)}
              onEdit={() => onFunnelEdit(funnel.url)}
              // onDuplicate={() => onProductDuplicate(product)}
              // onPreview={() => onProductPreview(product.url)}
            />
          ))
          }
        </PageContent>

        {!!showDelete && (
          <Modal onClose={onHideDeleteDialogue} isVisible={showDelete}>
            <MainTitle>Are you sure,you want delete this funnel?</MainTitle>
            <Button onClick={onHideDeleteDialogue} className='primary-color margin-with-float-left'>
              {' '}
            Cancel
            </Button>
            <Button onClick={onFunnelDelete} className='warning-color margin-with-float-right'>
              <i className='fas fa-trash-alt' />
              {' '}
            Delete
            </Button>
          </Modal>
        )}

      </Page>
      {creatingFunnel && (
        <div className='loading-layer'>
          <div className='loading-message'>Setting Up Funnel Builder...</div>
        </div>
      )}
    </Fragment>
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

Funnels.defaultProps = {
  funnels: sampleFunnels
};

export default connect(mapStateToProps, { ...productsActions, ...productActions, ...modalsActions })(Funnels);
