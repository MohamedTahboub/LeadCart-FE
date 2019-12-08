import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import * as modalsActions from 'actions/modals';
import * as funnelsActions from 'actions/funnels';
import * as productsActions from 'actions/products';
import * as flashMessages from 'actions/flashMessage';



import config from 'config';


import { Modal } from 'components/Modals';
import common from 'components/common';

import {
  PreCreateModal
} from './components';

import './style.css';

const { USER_SUB_DOMAIN_URL } = config;
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
  deleteFunnel,
  subdomain,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState('');
  const [creatingFunnel, setCreateFunnel] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  // const [showProductForm, setShowProductForm] = useState({});
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
    deleteFunnel(
      { funnelId: showDelete },
      {
        onSuccess: () => {
          props.showFlashMessage({
            type: 'success',
            message: `Funnel Deleted Successfully`
          });
          onHideDeleteDialogue()
        },
        onFailed: (msg) => {
          props.showFlashMessage({
            type: 'failed',
            message: msg
          });
        }
      }

    );
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

  const onCreate = () => {
    setShowCreateModal(true);
  };

  const onCreateCancel = () => {
    setShowCreateModal(false);
  };



  const onPreview = (url) => () => {
    const funnelUrl = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${url}`;
    window.open(funnelUrl, '_blank');
  }


  return (
    <Fragment>
      <Page>
        <PageHeader>
          <div className='margin-h-20 flex-container fb-aligned-center'>
            <MainTitle>Funnels</MainTitle>
          </div>
          <Button onClick={onCreate} className='primary-color'>
            <i className='fas fa-plus' />
            new funnel
          </Button>
        </PageHeader>
        <PageContent dflex>
          {!!funnels.length && funnels.map((funnel, id) => (
            <FunnelCard
              {...funnel}
              key={`${funnel._id}`}
              orderInlist={id}
              onDelete={() => onShowDeleteDialogue(funnel._id)}
              onEdit={() => onFunnelEdit(funnel.url)}
              // onDuplicate={() => onProductDuplicate(product)}
              onPreview={onPreview(funnel.url)}
            />
          ))
          }
        </PageContent>


        <PreCreateModal
          show={showCreateModal}
          history={props.history}
          onClose={onCreateCancel}
        />


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
  funnels: state.funnels,
  products: state.products.products.map((p) => ({ ...p, category: p.category || 'Checkout' })),
  filtersLabels: [
    { label: 'All Products', value: 'all' },
    ...state.products.products.map((p) => ({ label: p.name, value: p._id || p.id }))
  ]
});

Funnels.defaultProps = {
  funnels: []
};

export default connect(mapStateToProps, { ...productsActions, ...funnelsActions, ...flashMessages })(Funnels);
