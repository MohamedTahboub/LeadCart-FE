import React from 'react';
import { FaThList } from 'react-icons/fa';
import { FiGrid } from 'react-icons/fi';
import clx from 'classnames';

import common from 'components/common';

const { MiniButton } = common;

const LayoutOptions = ({
  onChange,
  active,
  flex,
  props
}) =>
  (<div className={`layout-options ${clx({ 'flex-space-center': flex })}`}>
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

export default LayoutOptions;
