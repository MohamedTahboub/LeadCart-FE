import React, { useEffect, useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';
import { useContext } from '../../actions';
import * as immutable from 'object-path-immutable';
import { BackgroundDemo } from './components';

const {
  MainTitle,
  Button,
  FlexBox,
  InputRow,
  MiniTwitterPicker
} = common;

const { Label, AddImage, SelectOption } = InputRow;

const ProductsScripts = ({ onChange: onProductChange }) => {
  const { state: { productBackground: openModal, product: { pageStyles: { pageBackgroundSettings = {} } = {} } = {} }, actions } = useContext();
  const [fields, setFields] = useState(pageBackgroundSettings);

  const onClose = () => {
    actions.onToggleProductBackgroundModal();
  };

  const updateTheProductWithBackground = () => {
    actions.onProductFieldChange({
      name: 'pageStyles.pageBackgroundSettings',
      value: fields
    });
  };

  // useEffect(() => {
  //   setFields(pageBackgroundSettings);
  // }, [pageBackgroundSettings]);

  const onBackgroundChange = ([firstSectionSize, secondSectionSize] = [], activeSection) => {
    const updateFields = (fields) => ({
      ...fields,
      firstSectionBackground: {
        ...(fields.firstSectionBackground || {}),
        size: firstSectionSize
      },
      secondSectionBackground: {
        ...(fields.secondSectionBackground || {}),
        size: secondSectionSize
      },
      activeSection
    });

    setFields(updateFields);
  };

  const activeSectionName = (fields.activeSection || 1) === 1 ? 'firstSectionBackground' : 'secondSectionBackground';

  const onImageChange = (image) => {
    const name = `${activeSectionName}.backgroundImage`;
    onChange(name, image);
  };


  const onNativeElementChange = (event) => {
    const { target: { name, value } } = event;

    setFields((fields) => immutable.set(fields, name, value));
  };

  const onChange = (name, value) => {
    onNativeElementChange({ target: { name, value } });
  };

  const onActiveSectionChange = (activeSection) => {
    onChange('activeSection', activeSection);
  };

  const isImageType = fields[activeSectionName]?.backgroundType === 'image';


  return (
    <Modal
      onClose={onClose}
      isVisible={openModal}
      className='trackers-modal'
      closeBtnClassName='scripts-modal-close-btn'
    >
      <MainTitle
        bottomLine
        className='scripts-modal-title'
      >
        Product Page Background Settings
      </MainTitle>
      <FlexBox className='m-5'>
        <FlexBox column center='v-center' className='p-2'>
          <span className='title-text mb-3'>Select your Page Section to Set its Background</span>
          <BackgroundDemo onChange={onBackgroundChange} onActiveChange={onActiveSectionChange} details={fields} />
        </FlexBox>
        <FlexBox column className='p-2'>
          <span className='title-text mb-3'><bold>|</bold> Background Setup</span>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Background Splits:
            </Label>
            <SelectOption
              value={fields.splits}
              name='splits'
              onChange={onNativeElementChange}
              options={[
                { label: 'One Split', value: 1 },
                { label: 'Two Splits', value: 2 }
              ]}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              background Type:
            </Label>
            <SelectOption
              value={fields[activeSectionName]?.backgroundType || 'color'}
              name={`${activeSectionName}.backgroundType`}
              onChange={onNativeElementChange}
              options={[
                { label: 'Color', value: 'color' },
                { label: 'Image', value: 'image' }
              ]}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Background {isImageType ? 'image' : 'color'}:
            </Label>
            {isImageType ? (
              <AddImage
                value={fields[activeSectionName]?.backgroundImage}
                onUploaded={onImageChange}
              />
            ) : (
              <MiniTwitterPicker
                name={`${activeSectionName}.backgroundColor`}
                value={fields[activeSectionName]?.backgroundColor}
                onChange={onNativeElementChange}
              />
            )}
          </InputRow>
        </FlexBox>
      </FlexBox>


      <FlexBox flex spaceBetween className='mt-3'>
        <Button
          onClick={onClose}
          className='script-save-btn'
        >
          Cancel
        </Button>
        <Button
          onClick={updateTheProductWithBackground}
          className='primary-color script-save-btn'
        >
          Save
        </Button>
      </FlexBox>
    </Modal>
  );
};

ProductsScripts.propTypes = {
  scripts: PropTypes.object,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

ProductsScripts.defaultProps = { scripts: {} };

export default ProductsScripts;
