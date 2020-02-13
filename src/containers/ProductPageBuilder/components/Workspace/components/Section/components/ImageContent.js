import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';


const ImageContent = ({
  className,
  value: imageSrc
}) => {
  const classNames = clx({
    'image-section': true,
    [className]: className,
  });

  const style = {
    backgroundImage: `url(${imageSrc})`,
    backgroundPosition: 'center',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  };

  return (
    <div className={classNames} style={style} />
  );
};

ImageContent.propTypes = {

};

export default ImageContent;
