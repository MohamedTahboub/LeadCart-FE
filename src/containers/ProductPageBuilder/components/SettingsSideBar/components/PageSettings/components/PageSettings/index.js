import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import common from 'components/common';
import { SettingBox } from '../../../common';
import { Fonts } from './components/';
import { useContext } from '../../../../../../actions';
import { ResizableTextarea } from 'components/common/Inputs';
import { Note } from 'components/common/Notes';


const { InputRow, FlexBox, Button } = common;
const { Label } = InputRow;

const PageFontTitle = () => {
  const { actions: { onToggleProductFontsModal } = {} } = useContext();
  return (
    <FlexBox spaceBetween className='mb-3'>
      <p className='large-text m-0' >Page Font Families</p>
      <AiOutlinePlusCircle className='item-clickable' onClick={onToggleProductFontsModal} size={20} />
    </FlexBox>
  );
};

const PageSettings = ({ pageStyles, onToggleProductBackgroundModal, onChange }) => {
  const openPageBackgroundModal = () => onToggleProductBackgroundModal();
  const { customCss, productPage } = pageStyles;

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
      <SettingBox title='Custom Css' className='my-3' >
        <ResizableTextarea
          name='pageStyles.customCss'
          value={customCss}
          onChange={onChange}pageStyles
          style={{
            width: '90%',
            borderRadius: 4,
            border: '1px solid #ddd',
            minHeight: 200,
            maxHeight: 400,
            outlineStyle: 'gray',
            overFlow: 'auto'
          }}
        />
        <Note showOnce style={{ minWidth: '90%', maxWidth: '90%', whiteSpace: 'pre-line' }}>
          { `inspect this page at the preview
mode, and choose the selectors
you want to modify.

Example:
.product-page-content{
    background:green ;
}`}
        </Note>
      </SettingBox>
    </FlexBox>
  );
};


PageSettings.propTypes = {};
export default PageSettings;
