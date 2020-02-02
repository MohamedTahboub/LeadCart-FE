import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import clx from 'classnames';
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
    'product-work-space': true,
    [className]: className,
    [monitorSize]: monitorSize,

  });
  return (
    <FlexBox flex center='h-center' className={workspaceClasses}>
      Workspace
    </FlexBox>
  );
};

Workspace.propTypes = {

};

export default Workspace;
