import React from 'react';
import PropTypes from 'prop-types';
import { FaThList } from 'react-icons/fa';
import { FiGrid } from 'react-icons/fi';
import common from 'components/common';
import clx from 'classnames';

const {
  MiniButton
} = common;
const LayoutOptions = ({
  onChange,
  active,
  flex,
  props
}) => (
  <div className={`layout-options ${clx({ 'flex-space-center': flex })}`}>
    <MiniButton
      active={active === 'list'}
      onClick={onChange('list')}
      flex
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
