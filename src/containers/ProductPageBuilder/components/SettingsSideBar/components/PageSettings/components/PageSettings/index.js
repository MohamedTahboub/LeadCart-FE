import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import common from 'components/common';
import { SettingBox } from '../../../common';
import { Fonts } from './components/';
import { useContext } from '../../../../../../actions';
import { Title } from 'components/common/Titles';


const { InputRow, FlexBox, Button } = common;
const { Label } = InputRow;


const PageFontTitle = () => {
  const { actions: { onToggleProductFontsModal } = {} } = useContext();

  return (
    <FlexBox spaceBetween>
      <p className='large-text m-0' >Page Font Family</p>
      <AiOutlinePlusCircle className='item-clickable' onClick={onToggleProductFontsModal} size={20} />
    </FlexBox>
  );
};


const PageSettings = ({ pageStyles, onToggleProductBackgroundModal, onChange }) => {
  const openPageBackgroundModal = () => onToggleProductBackgroundModal();
  const { productPage } = pageStyles;


  return (
    <FlexBox column>
      <SettingBox title='Background' >
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Background Setup:
          </Label>
          <Button className='light-btn' onClick={openPageBackgroundModal}>
            Change
          </Button>
        </InputRow>
      </SettingBox>


      <SettingBox title={<PageFontTitle />} className='mt-2' >
        <Fonts onChange={onChange} productPage={productPage} />
      </SettingBox>
    </FlexBox>
  );
};
PageSettings.propTypes = {};


export default PageSettings;
