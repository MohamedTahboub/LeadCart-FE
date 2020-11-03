import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import { FlexBox } from '../boxes';

const CheckCard = ({
  className,
  active,
  image,
  name,
  ...props
}) => {
  const classNames = clx('check-card', className, { active });
  return (
    <FlexBox className={classNames} {...props}>
      <img src={image} alt={name} className='check-card-image'/>
    </FlexBox>
  );
};

CheckCard.propTypes = {};

export default CheckCard;
