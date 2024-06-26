import React from 'react';
import common from 'components/common';
import { FaSave, FaUndoAlt } from 'react-icons/fa';

import './style.css';
const { FlexBox, Button } = common;
const TemplateResetWidget = ({
  show,
  onSave,
  saving,
  secondsToSaveTemplate,
  onReset
}) => {

  if (!show) return null;

  return (
    <FlexBox center='v-center' className='template-reset-widget p-4'>
      <FlexBox flex spaceBetween center='v-center'>
        <span className='large-text bold-text'>
          Template change will be saved permanently in
          <span className='larger-text mx-2'>
            {secondsToSaveTemplate}
          </span>
           seconds
        </span>
        <FlexBox>
          <Button
            onClick={onSave}
            className='light-btn mx-3'
            onprogress={saving}
          >
            <FlexBox center='v-center'>
              <FaSave className='gray-text mr-1' />
              <span>
                Save
              </span>
            </FlexBox>
          </Button>
          <Button
            onClick={onReset}
            className='light-btn mr-2 ml-3'
          >
            <FlexBox center='v-center'>
              <FaUndoAlt className='gray-text mr-1' />
              <span>
                Reset
              </span>
            </FlexBox>
          </Button>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

TemplateResetWidget.propTypes = {};

export default TemplateResetWidget;
