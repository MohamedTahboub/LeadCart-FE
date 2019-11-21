import React from 'react';
import PropTypes from 'prop-types';
import upsellTempImage1 from 'assets/images/upsells/v_upsell_template_1.jpg';
import upsellTempImage2 from 'assets/images/upsells/h_upsell_template.jpg';
import { TemplateThumbnail } from './common';

import './style.css';

const templates = [
  upsellTempImage1,
  upsellTempImage2
];


const TemplatesList = (props) => (
  <div className='templates-thumbnail-list-container'>
    {templates.map((image, id) => (
      <TemplateThumbnail
        key={`${image}`}
        image={image}
        order={id + 1}
        className={id === 1 ? 'vertical-oriented' : ''}
        onSelect={props.onSubmit}
      />
    ))}
  </div>
);

TemplatesList.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TemplatesList;
