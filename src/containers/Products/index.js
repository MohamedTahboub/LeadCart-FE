import React, { Component } from 'react';

import common from 'components/common'

// products sample data
import productsList from 'data/products.json'

import './style.css'

const { ProductCard, NewThingCard, MainTitle } = common


class Products extends Component {
    render() {
        return (
            <div>
                <MainTitle>Products</MainTitle>
                <div className='product-cards-container'>
                    {productsList.map(product => <ProductCard {...product} />)}
                    <NewThingCard thing="Product" />
                </div>
            </div>
        );
    }
}

export default Products;