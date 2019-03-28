import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as modalsActions from 'actions/modals';
import * as productsActions from 'actions/products';
import * as productActions from 'actions/product';
import { Modal } from 'components/Modals';
import common from 'components/common';
import ProductModal from '../Product/ProductModal'


import productSample from 'data/product.json';

import './style.css';

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
  products
}) => {


  const [showDelete, setShowDelete] = useState('')
  const [showProductForm, setShowProductForm] = useState({})


  const onProductPreview = (url) => {
    window.open(`https://${this.props.subdomain}.leadcart.io/products/${url}`, '_blank');
  }

  const onProductEdit = (product) => {
    setShowProductForm({
      show: true,
      isNewForm: false,
      product
    })
  }
  const onCreateNewProduct = () => {
    setShowProductForm({
      show: true,
      isNewForm: true,
      product: productSample
    })
  }

  const onCloseProductForm = () => {
    setShowProductForm({
      show: false,
      isNewForm: true,
      product: {}
    })
  }

  const onShowDeleteDialogue = (id) => setShowDelete(id)
  const onHideDeleteDialogue = () => setShowDelete('')

  const onProductDelete = () => {
    deleteProduct(showDelete);
    onHideDeleteDialogue()
  }

  return (
    <Page>
      <PageHeader>
        <MainTitle>Products</MainTitle>
        <Button onClick={onCreateNewProduct} className='primary-color'>
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
            onEdit={() => onProductEdit(product)}
            onPreview={() => onProductPreview(product.url)}
          />
        ))
          : loadingProducts ? ([0]).map((i) => <ProductShadowLoading key={i} />) : null
        }
      </PageContent>

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
      {showProductForm.show && (
        <ProductModal
          isNew={showProductForm.isNewForm}
          product={showProductForm.product}
          onClose={onCloseProductForm}
          isVisible
        />
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
