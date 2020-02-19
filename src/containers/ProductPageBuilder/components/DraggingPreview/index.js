import React from 'react';
import {
  TextPreview
} from './components';

export default ({ type, ...props }) => {
  switch (type) {
  case 'text': return <TextPreview {...props} />;
  default: return null;
  }
};
