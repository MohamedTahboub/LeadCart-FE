import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

import './style.css';

const BackgroundSection = ({
  backgroundType,
  backgroundImage,
  backgroundColor,
  className,
  size = 50
}) => {
  const classNames = clx('screen-background-slice', className);

  const percentage = `${Math.floor(size * 100) / 100}%`;

  const styles = { width: percentage };
  if (backgroundType === 'image')
    styles.backgroundImage = `url(${backgroundImage})`;
  else
    styles.backgroundColor = backgroundColor;

  return (
    <div style={styles} className={classNames} />
  );
};

const ScreenBackgroundSetup = ({ backgrounds = {} }) => {
  const { pageBackgroundSettings = {} } = backgrounds;
  const { firstSectionBackground = {}, secondSectionBackground = {}, splits } = pageBackgroundSettings;


  const isTwoSplits = `${splits}` === `${2}`;

  return (
    <div className='product-screen-background-container'>
      {isTwoSplits ? (
        <Fragment>
          <BackgroundSection {...firstSectionBackground} />
          <BackgroundSection {...secondSectionBackground} />
        </Fragment>
      ) : (
        <BackgroundSection {...firstSectionBackground} size={100} />
      )}
    </div>
  );
};

ScreenBackgroundSetup.propTypes = {};

export default ScreenBackgroundSetup;
