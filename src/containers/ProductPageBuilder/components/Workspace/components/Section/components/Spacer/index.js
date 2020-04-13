import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import QuillEditor from 'components/QuillEditor';
import common from 'components/common';
import clx from 'classnames';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import ReactDOM from 'react-dom';
import { Rnd as Flexible } from 'react-rnd';
import FlexibleBox from 'components/FlexibleBox';
import { useContext } from '../../../../../../actions';

import './style.css';

const {
  Button,
  EditableField,
  FlexBox
} = common;

// value={pagePreferences.description}
// onEdit={onEdit}

const Spacer = ({
  value,
  onUpdateDragging,
  section = {},
  ...props
}) => {
  const { styles = {} } = section;

  const { actions } = useContext();

  const onFieldChange = (name, value) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name,
        value
      }
    });
  };

  const onResizeStart = () => {
    onUpdateDragging(true);
  };
  const onResizeStop = () => {
    onUpdateDragging(false);
  };


  const onSizeChange = (size) => {
    onFieldChange('styles.height', size.height);
  };


  return (
    <FlexibleBox
      size={{
        height: styles.height
      }}
      onResize={onSizeChange}
      onResizeStart={onResizeStart}
      onResizeStop={onResizeStop}
    />
  );
};

Spacer.propTypes = {

};

export default Spacer;

