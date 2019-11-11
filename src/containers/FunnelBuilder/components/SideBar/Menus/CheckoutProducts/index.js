import React from 'react';
import PropTypes from 'prop-types';
// import common from 'components/common';
import { connect } from 'react-redux';


import tempImage1 from 'assets/images/checkout_templates/temp_1.png';
import tempImage2 from 'assets/images/checkout_templates/temp_2.png';
import tempImage3 from 'assets/images/checkout_templates/temp_3.png';
import tempImage4 from 'assets/images/checkout_templates/temp_4.png';
import tempImage5 from 'assets/images/checkout_templates/temp_5.png';
import tempImage6 from 'assets/images/checkout_templates/temp_6.png';

import './style.css';
import {
  MenuItem,
  MenuTitle,
  MenuContent,
  MenuFlexContent
} from '../MenuElements';

// const { Collapse, TwitterPicker } = common;
// const { Panel } = Collapse;

const templates = [
  tempImage1,
  tempImage2,
  tempImage3,
  tempImage4,
  tempImage5,
  tempImage6
];

const TemplateThumbnail = ({
  image,
  order,
  onClick,
  activeTemplate,
  ...props
}) => {
  const templateName = `temp${order}`;
  const isActive = activeTemplate === templateName;

  return (
    <div
      className={`template-thumbnail-element box-shadow small ${isActive ? 'active' : ''}`}
      role='button'
    >
      <img src={image} alt='template thumbnail' className='template-thumbnail-image' />
    </div>
  );
};


const Appearance = ({ products, ...props }) => {
  let productsWithImages = [];
  try {
    productsWithImages = products.map((product) => {
      const { pagePreferences: { template = '1' } = {} } = product;
      const [imageIndex = 1] = template.split('').reverse();

      product.image = templates[+imageIndex - 1];
      return product;
    });
  } catch (err) {
    productsWithImages = [];
  }

  return (
    <MenuItem>
      <MenuTitle>Checkout Products</MenuTitle>
      <MenuContent>
        <MenuFlexContent>
          {productsWithImages.map(({ _id, image }, id) => (
            <TemplateThumbnail
              key={_id}
              image={image}
              // activeTemplate={template}
              order={id + 1}
            // onSelect={onTemplateChange}
            />
          ))}
        </MenuFlexContent>
      </MenuContent>
    </MenuItem>
  );
};


Appearance.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired,
};

Appearance.defaultProps = {
  product: {}
};

const mapStateToProps = ({ products: { products = [] } = {} }) => ({
  products: products.filter(({ category }) => (category === 'Checkout' || !category))
});

export default connect(mapStateToProps)(Appearance);
