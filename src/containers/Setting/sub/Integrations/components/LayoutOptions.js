import React from 'react';
import PropTypes from 'prop-types';
import { FaThList } from 'react-icons/fa';
import { FiGrid } from 'react-icons/fi';
import common from 'components/common';

const {
  MiniButton
} = common;
const LayoutOptions = ({
  onChange,
  active,
  props
}) => (
  <div className='layout-options'>
    <MiniButton
      active={active === 'list'}
      onClick={onChange('list')}
    >
      <FaThList />
    </MiniButton>
    <MiniButton
      active={active === 'grid'}
      onClick={onChange('grid')}
    >
      <FiGrid />
    </MiniButton>
  </div>
);

LayoutOptions.propTypes = {

};

export default LayoutOptions;
