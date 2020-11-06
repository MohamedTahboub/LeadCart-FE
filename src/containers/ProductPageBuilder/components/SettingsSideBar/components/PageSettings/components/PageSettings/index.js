import React from 'react';
import common from 'components/common';
import { SettingBox } from '../../../common';

const {
  InputRow,
  FlexBox,
  Button
} = common;


const {
  Label,
  SelectOption
} = InputRow;

const PageSettings = ({
  pageStyles,
  onToggleProductBackgroundModal,
  onChange
}) => {

  const openPageBackgroundModal = () => {
    onToggleProductBackgroundModal();
  };

  return (
    <FlexBox column>
      <SettingBox
        title='Background'
      >
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
                        Background Setup:
          </Label>
          <Button
            className='light-btn'
            onClick={openPageBackgroundModal}
          >
                        Change
          </Button>
        </InputRow>

      </SettingBox>
    </FlexBox>
  );
};
PageSettings.propTypes = {};


export default PageSettings;
