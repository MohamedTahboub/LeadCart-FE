import React from 'react';
import PropTypes from 'prop-types';

import {
  TextContent,
  ImageContent,
  VideoContent,
  LayoutContent,
} from '.';

const SectionContent = ({ type, content }) => {
  switch (type) {
  case 'text': return <TextContent {...content} />;
  case 'image': return <ImageContent {...content} />;
  case 'video': return <VideoContent {...content} />;
  case 'layout': return <LayoutContent {...content} />;
  default: return null;
  }
};

SectionContent.propTypes = {

};

export default SectionContent;
