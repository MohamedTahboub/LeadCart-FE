import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

const ImageContent = ({
  className,
  section = { styles: {} },
  value: imageSrc
}) => {
  const classNames = clx({
    'image-section': true,
    [className]: className,
  });

  if (!section.styles) section.styles = {};
  const sectionStyle = {
    ...section.styles,
    paddingTop: `${section.styles.paddingTop}px`,
    paddingBottom: `${section.styles.paddingBottom}px`,
    height: `${section.styles.height}px`,
    width: `${section.styles.width}px`
  };

  const style = {
    backgroundImage: `url(${imageSrc})`,
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div
      className={classNames}
      style={{ ...style, ...sectionStyle }}
    />
  );
};

ImageContent.propTypes = {

};

export default ImageContent;
