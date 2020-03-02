import React from 'react';
import common from 'components/common';
import clx from 'classnames';
import bookMarkImage1 from 'assets/images/icons/bookmark.svg';
import bookMarkImage2 from 'assets/images/icons/bookmark-2.svg';

import './style.css';
// import ProgressBar from 'components/ProgressBar';

const {
  CycleStepTitle,
  CheckoutInput,
  FloatButton
} = common;

const shapesClasses = {};
const shapesImages = {
  shapeOne: bookMarkImage1,
  shapeTwo: bookMarkImage2,
};

const PageBadge = ({
  value = bookMarkImage1,
  styles = {},
  position,
  ...props
}) => {
  const className = clx({
    'page-badge-section': true,
    [position]: position
  });
  const { height, width, ...containerStyles } = styles;
  // const shapeClass = shapesClasses[shape];
  // const shapeImage = shapesImages[shape];
  const imageStyles = {
    marginTop: `${height}px`,
    marginBottom: `${width}px`,
  };
  return (
    <div className={className} style={containerStyles}>
      <img
        src={value}
        style={imageStyles}
        alt='shape'
        className='product-badge-image'
      />
    </div>
  );
};

export default ({
  section = {},
  ...props
}) => {
  const { styles = {}, content = {} } = section;


  const style = {
    // ...styles,
    marginTop: `${styles.marginTop}px`,
    marginBottom: `${styles.marginBottom}px`,
    marginLeft: `${styles.marginLeft}px`,
    marginRight: `${styles.marginRight}px`,
    paddingTop: `${styles.paddingTop}px`,
    paddingBottom: `${styles.paddingBottom}px`,
    paddingLeft: `${styles.paddingLeft}px`,
    paddingRight: `${styles.paddingRight}px`,
  };

  // const progressBarStyles = {
  //   barBackground: styles.barBackground,
  //   barColor: styles.barBackGround
  // };
  return (
    <PageBadge
      value={content.value}
      // position={content.position}
      color={styles.badgeColor}
      styles={style}
    />
  );
};
