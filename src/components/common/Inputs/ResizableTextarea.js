import React from 'react';
import PropTypes from 'prop-types';
import TextArea from 'react-textarea-autosize';
import clx from 'classnames';

const ResizableTextarea = ({
  style,
  className,
  ...props
}) => {
  const styles = {
    border: 'none',
    resize: 'none',
    background: 'transparent',
    ...style
  };
  const classNames = clx({
    [className]: className,
    'auto-resize-textarea-input': true
  });
  return (
    <TextArea
      className={classNames}
      // autoFocus
      style={styles}
      {...props}
    />
  );
};

ResizableTextarea.propTypes = { style: PropTypes.objectOf(PropTypes.object) };
ResizableTextarea.defaultProps = { style: {} };


export default ResizableTextarea;
