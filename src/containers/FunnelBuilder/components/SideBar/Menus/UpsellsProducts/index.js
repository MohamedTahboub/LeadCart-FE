import React from 'react';
import PropTypes from 'prop-types';
// import common from 'components/common';
import { connect } from 'react-redux';

import upsellTempImage1 from 'assets/images/upsells/v_upsell_template_1.jpg';
import upsellTempImage2 from 'assets/images/upsells/h_upsell_template.jpg';
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
  upsellTempImage1,
  upsellTempImage2
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
      <MenuTitle>Upsells/DownSells Products</MenuTitle>
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
  products: products.filter(({ category }) => category === 'UpSell')
});

export default connect(mapStateToProps)(Appearance);
