import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as modalsActions from 'actions/modals';
import * as productsActions from 'actions/products';
import * as productActions from 'actions/product';
import Modal from 'components/Modal';
import common from 'components/common';
// products sample data
import productsList from 'data/products.json';

import './style.css';

const {
  ProductCard, NewThingCard, MainTitle, Button
} = common;


const ProductShadowLodaing = () => <div className='empty-product-shadowbox animated-background' />;

class Products extends Component {
  state = {
    showDeleteModal: false,
    currentProduct: ''
  }

  onProductPreview = (url) => {
    window.open(`https://${this.props.subdomain}.leadcart.io/products/${url}`, '_blank');
  }

  onProductEdit = (url) => {
    this.props.history.push(`/product/${url}/details`);
  }

  onShowDeleteDialogue = (id) => this.setState({ showDeleteModal: true, currentProduct: { id } });

  onHideDeleteDialogue = (id) => this.setState({ showDeleteModal: false });

  onProductDelete = () => {
    this.props.deleteProduct(this.state.currentProduct.id);
    this.setState({ showDeleteModal: false });
  }

  componentDidMount = () => {
    // this.props.getUserProducts();
  }

  render () {
    const { products, toggleCreateProductModal, isFetching } = this.props;
    return (
      <div>
        <MainTitle>Products</MainTitle>
        <div className='product-cards-container'>
          {products.length ? products.map((product, id) => (
            <ProductCard
              key={product._id}
              orderInlist={id}
              {...product}
              onDelete={() => this.onShowDeleteDialogue(product._id)}
              onEdit={() => this.onProductEdit(product.url)}
              onPreview={() => this.onProductPreview(product.url)}
            />
          ))
            : isFetching ? ([1, 2]).map((i) => <ProductShadowLodaing key={i} />) : null
          }
          <NewThingCard thing='Product' onClick={toggleCreateProductModal} />
        </div>
        <Modal onClose={() => this.setState({ showDeleteModal: false })} isVisible={this.state.showDeleteModal}>
          <MainTitle>Are you sure,you want delete this product ?</MainTitle>
          <Button onClick={this.onHideDeleteDialogue} classes='primary-color margin-with-float-left'>
            {' '}
            Cancel
          </Button>
          <Button onClick={this.onProductDelete} classes='warning-color margin-with-float-right'>
            <i className='fas fa-trash-alt' />
            {' '}
            Delete
          </Button>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isFetching: state.loading,
  subdomain: state.user.user.subDomain,
  products: state.products.products
});

export default connect(mapStateToProps, { ...productsActions, ...productActions, ...modalsActions })(Products);
