import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
import './style.css';

const {
  Button,
  FlexBox,
  Title,
  EditableField
} = common;

const Workspace = ({
  className,
  monitorSize = 'disktop',
  ...props
}) => {
  const workspaceClasses = clx({
    'product-workspace': true,
    [className]: className,
    [monitorSize]: monitorSize,

  });
  return (
    <FlexBox flex center='h-center' className='product-workspace-container'>
      <FlexBox className={workspaceClasses}>
        workspace
      </FlexBox>
    </FlexBox>
  );
};

Workspace.propTypes = {

};

export default Workspace;
