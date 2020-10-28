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
      <SettingBox title='Border Style'>
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
                        Border Radius:
          </Label>
          <SelectOption
            value={pageStyles.borderRadius}
            name='pageStyles.borderRadius'
            onChange={onChange}
            options={[
              { label: '0 px', value: '0' },
              { label: '1 px', value: '1' },
              { label: '2 px', value: '2' },
              { label: '3 px', value: '3' },
              { label: '4 px', value: '4' },
              { label: '5 px', value: '5' },
              { label: '6 px', value: '6' },
              { label: '7 px', value: '7' },
              { label: '8 px', value: '8' },
              { label: '9 px', value: '9' },
              { label: '10 px', value: '10' }
            ]}
          />
        </InputRow>
      </SettingBox>
    </FlexBox>
  );
};
PageSettings.propTypes = {};


export default PageSettings;
