import React from 'react';
import defaultLogo from 'assets/images/new-product-icon.png';
import Image from 'components/common/Image';
import common from 'components/common';

import './style.css';

const { EditableField } = common;


const AboutProduct = ({
  image,
  name,
  descriptionInnerClassName = '',
  containerClassName = '',
  textAreaClassName = '',
  subContainerClassName = '',
  description,
  onChange
}) => (
  <section className={`about-product-section underlined ${containerClassName}`}>
    {image && (
      <Image
        image={image || defaultLogo}
        onChange={(target) => onChange({ target })}
        name='image'
        className='product-template-image'
      />
    )
    }
    <div className={`product-template-description-container ${subContainerClassName}`}>
      <EditableField
        name='name'
        defaultValue='Product Name'
        onChange={onChange}
        className='product-template-name'
        value={name}
      />
      <EditableField
        name='description'
        defaultValue='Product Description, you can edit it by clicking'
        onChange={onChange}
        textarea
        value={description}
        className={`product-template-description ${descriptionInnerClassName}`}
      />
    </div>

  </section>
);


export default AboutProduct;
