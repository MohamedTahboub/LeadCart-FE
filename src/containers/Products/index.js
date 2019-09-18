import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as modalsActions from 'actions/modals';
import * as productsActions from 'actions/products';
import * as productActions from 'actions/product';
import { Modal } from 'components/Modals';
import common from 'components/common';
// import ProductModal from '../Product/ProductModal'
import config from 'config';
import ids from 'shortid';
import PrecreateProductModals from 'components/PrecreateProductModals';


// import productSample from 'data/product.json';

import './style.css';

const { USER_SUB_DOMAIN_URL } = config;
const {
  ProductCard,
  Page,
  PageHeader,
  PageContent,
  NewThingCard,
  MainTitle,
  Button
} = common;


const ProductShadowLoading = () => <div className='empty-product-shadowbox animated-background' />;

const Products = ({
  isFetching: loadingProducts,
  deleteProduct,
  products,
  subdomain,
  ...props
}) => {
  const [showDelete, setShowDelete] = useState('');
  // const [showProductForm, setShowProductForm] = useState({});
  const [showCreateModal, setShowProductModal] = useState(false);

  const onProductPreview = (url) => {
    const productUrl = `${USER_SUB_DOMAIN_URL.replace('subDomain', subdomain)}${url}`;
    window.open(productUrl, '_blank');
  };

  const onProductEdit = (url) => {
    props.history.push(`/products/${url}`);
  };

  const onProductDuplicate = ({
    __v,
    id,
    _id,
    name,
    isActive,
    owner,
    coupons: { list, enabled } = {},
    url,
    ...product
  }) => {
    product.name = `${name}- copy`;
    product.url = 'autoGenerateUrl';
    product.coupons = { enabled: !!enabled };

    delete product.token;

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

  return (
    <Page>
      <PageHeader>
        <MainTitle>Products</MainTitle>
        <Button onClick={() => setShowProductModal(true)} className='primary-color'>
          <i className='fas fa-plus' />
          new product
        </Button>
      </PageHeader>
      <PageContent dflex>
        {products.length ? products.map((product, id) => (
          <ProductCard
            key={`${product._id}-${id}`}
            orderInlist={id}
            {...product}
            onDelete={() => onShowDeleteDialogue(product._id)}
            onDuplicate={() => onProductDuplicate(product)}
            onEdit={() => onProductEdit(product.url)}
            onPreview={() => onProductPreview(product.url)}
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
  products: state.products.products
});

export default connect(mapStateToProps, { ...productsActions, ...productActions, ...modalsActions })(Products);
