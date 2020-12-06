import React from 'react';
import clx from 'classnames';
import Slider from 'rc-slider';

import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';

import './style.css';
import { Title } from 'components/common/Titles';

const { FlexBox, InputRow, MiniColorPicker } = common;
const { Toggle } = InputRow;

const SectionStyles = ({ completeOrderButton, onSectionSettingChange, sectionSetting }) => {
  const {
    position = 'justified',
    background = '#4da1ff',
    textColor = '#fff',
    borderSymmetry,
    borderStyle = 'hidden',
    borderColor = '#4da1ff',
    shadowColor = '#fff',
    hasShadow,
    boxShadowOffsetX,
    boxShadowOffsetY,
    boxShadowBlur,
    borderWidth = 2
  } = completeOrderButton;


  const onSectionFieldChange = ({ target: { name, value } } = {}) => {
    onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: name,
        value: value
      }
    });
  };


  const onButtonSettingsChange = ({ target: { name, value } } = {}) => {
    onSectionFieldChange({
      target: {
        name: `styles.completeOrderButton.${name}`,
        value: value
      }
    });
  };


  const onSliderButtonChange = (radius, name) => {
    if (borderCornerNames.includes(name) && borderSymmetry) {
      onSectionSettingChange({
        section: sectionSetting,
        fields: borderCornerNames.map((corner) => ({
          name: `styles.completeOrderButton.${corner}`,
          value: radius
        }))
      });
    } else {
      onButtonSettingsChange({ target: { name, value: radius } });
    }
  };

  const borderCornerNames = [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius'
  ];

  const getCornerTitle = (corner) => {
    switch (corner) {
    case 'borderTopLeftRadius': return 'Top Left';
    case 'borderTopRightRadius': return 'Top Right';
    case 'borderBottomLeftRadius': return 'Bottom Left';
    case 'borderBottomRightRadius': return 'Bottom Right';
    default: return '';
    }
  };


  const positionOptions = [
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
    { label: 'Center', value: 'center' },
    { label: 'Justified', value: 'justified' }
  ];

  const borderStyleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
    { label: 'None', value: 'hidden' }
  ];


  return (
    <InlinePopup
      title='Checkout Button'
      popUpContent={(
        <FlexBox column>
          <FlexBox spaceBetween>
            <span className='gray-text'>Background Color</span>
            <MiniColorPicker
              name='background'
              value={background}
              onChange={onButtonSettingsChange}
            />
          </FlexBox>

          <FlexBox center='v-center margin-v-5' spaceBetween>
            <span className='gray-text'>Button Text</span>
            <MiniColorPicker
              name='textColor'
              value={textColor}
              onChange={onButtonSettingsChange}
            />
          </FlexBox>

          <FlexBox center='mb-3 p-0' column>
            <Title>Position:</Title>
            <FlexBox center='v-center'>
              {positionOptions.map(({ label, value }) => {
                return (
                  <FlexBox
                    className={clx('v-center h-center p-1 item-clickable mr-1 inline-popup-button-option ', { activeInlinePopupButtonOption: value === position })}
                    onClick={() => onButtonSettingsChange({ target: { value, name: 'position' } })}
                    flex
                  >
                    {label}
                  </FlexBox>
                );
              })}
            </FlexBox>
          </FlexBox>

          <InlinePopup
            title='Borders'
            popUpContent={(
              <FlexBox column>
                <FlexBox center='mb-3 p-0' column>
                  <Title>Border Style:</Title>
                  <FlexBox className='v-center' spaceBetween>
                    {borderStyleOptions.map(({ label, value }) => {
                      return (
                        <FlexBox
                          className={clx('v-center h-center p-1 item-clickable mr-1 inline-popup-button-option ', { activeInlinePopupButtonOption: value === borderStyle })}
                          onClick={() => onButtonSettingsChange({ target: { value, name: 'borderStyle' } })}
                          flex
                        >
                          {label}
                        </FlexBox>
                      );
                    })}
                  </FlexBox>
                </FlexBox>

                <FlexBox center='v-center mb-3' spaceBetween>
                  <span className='gray-text'>Border Color</span>
                  <MiniColorPicker
                    name='borderColor'
                    value={borderColor}
                    onChange={onButtonSettingsChange}
                  />
                </FlexBox>

                <FlexBox className='mb-3' column>
                  <span>Border Width {`${borderWidth || 0}px`}</span>
                  <Slider
                    max={10}
                    min={0}
                    defaultValue={borderWidth}
                    onChange={(value) => onButtonSettingsChange({ target: { value, name: 'borderWidth' } })}
                    value={borderWidth || 0}
                  />
                </FlexBox>

                <InlinePopup
                  title='Border Radius'
                  popUpContent={(
                    <FlexBox column>
                      <span className='gray-text'>Symmetric</span>
                      <Toggle value={borderSymmetry} onToggle={(target) => onButtonSettingsChange({ target })} name='borderSymmetry' />
                      {
                        borderCornerNames.map((corner) => (
                          <>
                            <div className='mb-2'>{getCornerTitle(corner)}</div>
                            <Slider
                              max={50}
                              min={0}
                              defaultValue={5}
                              onChange={(radius) => onSliderButtonChange(radius, corner)}
                              value={completeOrderButton[corner] || 0}
                            />
                          </>
                        ))
                      }
                    </FlexBox>
                  )}
                />
              </FlexBox>
            )}
          />

          <InlinePopup
            title='Shadow Style'
            popUpContent={(
              <FlexBox column>
                <FlexBox center='v-center' spaceBetween className='mt-2'>
                  <span className='gray-text'>Shadow Color</span>
                  <MiniColorPicker
                    name='shadowColor'
                    value={shadowColor}
                    onChange={onButtonSettingsChange}
                    disabled={!hasShadow}
                  />
                </FlexBox>

                <InlinePopup
                  title='Shadow'
                  popUpContent={(
                    <FlexBox column>
                      <span>Shadow</span>
                      <Toggle value={hasShadow} onToggle={(target) => onButtonSettingsChange({ target })} name='hasShadow' />

                      <span className='gray-text'>Offset-X</span>
                      <Slider
                        max={20}
                        min={0}
                        defaultValue={5}
                        onChange={(offsetX) => onSliderButtonChange(offsetX, 'boxShadowOffsetX')}
                        value={boxShadowOffsetX}
                        disabled={!hasShadow}
                      />
                      <span className='gray-text'>Offset-Y</span>
                      <Slider
                        max={20}
                        min={0}
                        defaultValue={5}
                        onChange={(offsetY) => onSliderButtonChange(offsetY, 'boxShadowOffsetY')}
                        value={boxShadowOffsetY}
                        disabled={!hasShadow}
                      />
                      <span className='gray-text'>Blur</span>
                      <Slider
                        max={20}
                        min={0}
                        defaultValue={5}
                        onChange={(blur) => onSliderButtonChange(blur, 'boxShadowBlur')}
                        value={boxShadowBlur}
                        disabled={!hasShadow}
                      />
                    </FlexBox>
                  )}
                />
              </FlexBox>
            )}
          />
        </FlexBox>
      )}
    />
  );
};


SectionStyles.propTypes = {};

export default SectionStyles;