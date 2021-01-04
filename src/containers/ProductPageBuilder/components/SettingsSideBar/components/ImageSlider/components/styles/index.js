import React from 'react';
import clx from 'classnames';

import { useContext } from '../../../../../../actions';
import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';
import ArrowsSelector from './Select';

import './style.css';

const { InputRow, FlexBox, MiniColorPicker, Title, Tooltip, CustomSlider } = common;
const { Label, Toggle } = InputRow;


const ImageSliderStyles = () => {
  const {
    state:
     { modals: { sectionSetting = {} } = {} }
     = {},
    actions = {}
  } = useContext();

  const { styles = {} } = sectionSetting;

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: target
    });
  };


  const {
    hasArrows = true,
    backgroundColor,
    borderColor,
    borderStyle = 'solid',
    borderWidth = 0,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomLeftRadius = 0,
    borderBottomRightRadius = 0,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    hasBlurBackgroundImage = false
  } = styles;


  const borderStyleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
    { label: 'None', value: 'hidden' }
  ];


  return (
    <FlexBox className='image-slider-styles' column>

      <FlexBox spaceBetween center='v-center mb-2'>
        <Tooltip placement='left' overlay='filling the image left space with its shadow'>
          <FlexBox className='mr-2' flex>
              Fill image background:
          </FlexBox>
        </Tooltip>

        <FlexBox>
          <Toggle
            value={hasBlurBackgroundImage}
            name='styles.hasBlurBackgroundImage'
            onToggle={(target) => onChange({ target })}
          />
        </FlexBox>
      </FlexBox>


      <FlexBox className='v-center mb-2' spaceBetween>
        <Label>Background Color</Label>
        <MiniColorPicker
          value={backgroundColor}
          name='styles.backgroundColor'
          onChange={(target) => onChange(target)}
        />
      </FlexBox>


      <InlinePopup
        title='Arrows'
        popUpContent={(
          <FlexBox column>
            <FlexBox className='mb-2 v-center'>
              <Title className='flex-1'>Has Arrows</Title>
              <Toggle
                value={hasArrows}
                onToggle={(target) => onChange({ target })}
                name='styles.hasArrows'
              />
            </FlexBox>

            <ArrowsSelector disabled={!hasArrows} className='mb-2' onChange={onChange} sectionSetting={sectionSetting} />
          </FlexBox>
        )}
      />


      <InlinePopup
        title='Border'
        popUpContent={(
          <FlexBox column>
            <FlexBox className='v-center mb-2' spaceBetween>
              <Label>Border Color</Label>
              <MiniColorPicker
                value={borderColor}
                name='styles.borderColor'
                onChange={(target) => onChange(target)}
              />
            </FlexBox>

            <CustomSlider
              max={10}
              min={0}
              defaultValue={0}
              value={borderWidth}
              onChange={(value) => onChange({ target: { value, name: 'styles.borderWidth' } })}
              label='Border Width'
              unit='px'
              className='mb-2'
            />

            <FlexBox center='mb-2 p-0' column>
              <Title>Border Style:</Title>
              <FlexBox className='v-center' spaceBetween>
                {borderStyleOptions.map(({ label, value }) => {
                  return (
                    <FlexBox
                      className={clx('v-center h-center p-1 item-clickable mr-1 image-slider-border-styles-options', { activeOption: value === borderStyle })}
                      onClick={() => onChange({ target: { value, name: 'styles.borderStyle' } })}
                      flex
                    >
                      {label}
                    </FlexBox>
                  );
                })}
              </FlexBox>
            </FlexBox>

            <InlinePopup
              title='Border Radius'
              popUpContent={(
                <FlexBox column>
                  <CustomSlider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderTopLeftRadius}
                    onChange={(value) => onChange({ target: { value, name: 'styles.borderTopLeftRadius' } })}
                    label='Top Left Border'
                    unit='px'
                    className='mb-2'
                  />

                  <CustomSlider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderTopRightRadius}
                    onChange={(value) => onChange({ target: { value, name: 'styles.borderTopRightRadius' } })}
                    label='Top Right Border'
                    unit='px'
                    className='mb-2'
                  />

                  <CustomSlider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderBottomLeftRadius}
                    onChange={(value) => onChange({ target: { value, name: 'styles.borderBottomLeftRadius' } })}
                    label='Bottom Left Border'
                    className='mb-2'
                  />

                  <CustomSlider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderBottomRightRadius}
                    onChange={(value) => onChange({ target: { value, name: 'styles.borderBottomRightRadius' } })}
                    label='Bottom Right Border'
                    unit='px'
                    className='mb-2'
                  />
                </FlexBox>
              )}
            />
          </FlexBox>
        )}
      />


      <InlinePopup
        title='Padding'
        popUpContent={(
          <FlexBox column>
            <CustomSlider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingTop}
              onChange={(value) => onChange({ target: { value, name: 'styles.paddingTop' } })}
              label='Padding Top'
              unit='px'
              className='mb-2'
            />

            <CustomSlider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingRight}
              onChange={(value) => onChange({ target: { value, name: 'styles.paddingRight' } })}
              label='Padding Right'
              unit='px'
              className='mb-2'
            />

            <CustomSlider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingBottom}
              onChange={(value) => onChange({ target: { value, name: 'styles.paddingBottom' } })}
              label='Padding Bottom'
              unit='px'
              className='mb-2'
            />

            <CustomSlider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingLeft}
              onChange={(value) => onChange({ target: { value, name: 'styles.paddingLeft' } })}
              label='Padding Left'
              unit='px'
              className='mb-2'
            />
          </FlexBox>
        )}
      />

    </FlexBox>
  );
};

export default ImageSliderStyles;
