import React from 'react';
import PropTypes from 'prop-types';

import {
  TextContent,
  ImageContent,
  VideoContent,
  LayoutContent,
} from '.';

const SectionContent = ({ type, ...props }) => {
  switch (type) {
  case 'text': return <TextContent {...props} />;
  case 'image': return <ImageContent {...props} />;
  case 'video': return <VideoContent {...props} />;
  case 'layout': return <LayoutContent {...props} />;
  default: return null;
  }
};

SectionContent.propTypes = {

};

export default SectionContent;
