import React from 'react';
import PropTypes from 'prop-types';


import {
  Template1,
  Template2
} from './Templates';

const UpsellTemplates = ({ template = 'temp1', ...props }) => {
  switch (template) {
  case 'temp1': return <Template1 {...props} />;
  case 'temp2': return <Template2 {...props} />;
  default: return <Template2 {...props} />;
  }
};
UpsellTemplates.propTypes = {

};

export default UpsellTemplates;
