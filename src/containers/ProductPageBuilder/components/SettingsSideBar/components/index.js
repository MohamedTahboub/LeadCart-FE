import React from 'react';

import Text from './Text';

export default ({ type, ...props }) => {
  switch (type) {
  case 'text': return <Text {...props} />;
  default: return null;
  }
};
