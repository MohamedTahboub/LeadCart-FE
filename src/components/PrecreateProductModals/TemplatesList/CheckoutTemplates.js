import React from 'react';
import PropTypes from 'prop-types';

import './style.css';


// importing list ot checkout templates
import tempImage1 from 'assets/images/checkout_templates/temp_1.png';
import tempImage2 from 'assets/images/checkout_templates/temp_2.png';
import tempImage3 from 'assets/images/checkout_templates/temp_3.png';
import tempImage4 from 'assets/images/checkout_templates/temp_4.png';
import tempImage5 from 'assets/images/checkout_templates/temp_5.png';
import tempImage6 from 'assets/images/checkout_templates/temp_6.png';
import { TemplateThumbnail } from './common';


const templates = [
  tempImage1,
  tempImage2,
  tempImage3,
  tempImage4,
  tempImage5,
  tempImage6
];


const TemplatesList = (props) => (
  <div className='templates-thumbnail-list-container'>
    {templates.map((image, id) => (
      <TemplateThumbnail
        key={id}
        image={image}
        order={id + 1}
        onSelect={props.onSubmit}
      />
    ))}
  </div>
);

TemplatesList.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TemplatesList;
