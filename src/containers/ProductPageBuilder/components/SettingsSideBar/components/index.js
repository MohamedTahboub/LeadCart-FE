import React from 'react';

import Text from './Text';
import Image from './Image';
import Video from './Video';
import Layout from './Layout';

export default ({ type, ...props }) => {
  switch (type) {
  case 'text': return <Text {...props} />;
  case 'image': return <Image {...props} />;
  case 'video': return <Video {...props} />;
  case 'layout': return <Layout {...props} />;
  default: return null;
  }
};
