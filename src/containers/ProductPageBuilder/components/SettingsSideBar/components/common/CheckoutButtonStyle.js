import React from 'react';
import clx from 'classnames';
import Slider from 'rc-slider';

import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';

import './style.css';

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
    borderWidth = '2px'
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


  const borderWidthOptions = [
    { label: '0px', value: '0px' },
    { label: '1px', value: '1px' },
    { label: '2px', value: '2px' },
    { label: '3px', value: '3px' },
    { label: '4px', value: '4px' },
    { label: '5px', value: '5px' },
    { label: '6px', value: '6px' },
    { label: '7px', value: '7px' },
    { label: '8px', value: '8px' },
    { label: '9px', value: '9px' },
    { label: '10px', value: '10px' }
  ];

  return (
    <FlexBox column>
      <InlinePopup
        title='Background Color'
        popUpContent={(
          <FlexBox spaceBetween>
            <span className='gray-text'>Background Color</span>
            <MiniColorPicker
              name='background'
              value={background}
              onChange={onButtonSettingsChange}
            />
          </FlexBox>
        )}
      />

      <InlinePopup
        title='Text Color'
        popUpContent={(
          <FlexBox center='v-center margin-v-5' spaceBetween>
            <span className='gray-text'>Button Text</span>
            <MiniColorPicker
              name='textColor'
              value={textColor}
              onChange={onButtonSettingsChange}
            />
          </FlexBox>
        )}
      />

      <InlinePopup
        title='Borders'
        popUpContent={(
          <FlexBox column>
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

            <InlinePopup
              title='Border style'
              popupClass='p-1'
              popUpContent={(
                <FlexBox center='v-center margin-v-5'>
                  {borderStyleOptions.map(({ label, value }) => {
                    return (
                      <FlexBox
                        className={clx('v-center h-center py-2 px-1 item-clickable mx-1 inline-popup-button-option ', { activeInlinePopupButtonOption: value === borderStyle })}
                        onClick={() => onButtonSettingsChange({ target: { value, name: 'borderStyle' } })}
                        flex
                      >
                        {label}
                      </FlexBox>
                    );
                  })}
                </FlexBox>
              )}
            />

            <InlinePopup
              title='Border Width'
              popupClass='p-1'
              popUpContent={(
                <FlexBox center='v-center margin-v-5' wrappable>
                  {borderWidthOptions.map(({ label, value }) => {
                    return (
                      <FlexBox
                        className={clx('v-center h-center py-2 px-1 item-clickable mx-1 inline-popup-button-option ', { activeInlinePopupButtonOption: value === borderWidth })}
                        onClick={() => onButtonSettingsChange({ target: { value, name: 'borderWidth' } })}
                        flex
                      >
                        {label}
                      </FlexBox>
                    );
                  })}
                </FlexBox>
              )}
            />

            <InlinePopup
              title='Border Color'
              popUpContent={(
                <FlexBox center='v-center' spaceBetween>
                  <span className='gray-text'>Border Color</span>
                  <MiniColorPicker
                    name='borderColor'
                    value={borderColor}
                    onChange={onButtonSettingsChange}
                  />
                </FlexBox>
              )}
            />
          </FlexBox>
        )}
      />


      <InlinePopup
        title='Shadow'
        popUpContent={(
          <FlexBox column>
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

            <InlinePopup
              title='Shadow Color'
              popUpContent={(
                <FlexBox center='v-center' spaceBetween className='mt-2'>
                  <span className='gray-text'>Shadow Color</span>
                  <MiniColorPicker
                    name='shadowColor'
                    value={shadowColor}
                    onChange={onButtonSettingsChange}
                    disabled={!hasShadow}
                  />
                </FlexBox>
              )}
            />
          </FlexBox>
        )}
      />


      <InlinePopup
        title='Button Position'
        popupClass='p-1'
        popUpContent={(
          <FlexBox center='v-center margin-v-5'>
            {positionOptions.map(({ label, value }) => {
              return (
                <FlexBox
                  className={clx('v-center h-center py-2 px-1 item-clickable mx-1 inline-popup-button-option ', { activeInlinePopupButtonOption: value === position })}
                  onClick={() => onButtonSettingsChange({ target: { value, name: 'position' } })}
                  flex
                >
                  {label}
                </FlexBox>
              );
            })}
          </FlexBox>
        )}
      />

    </FlexBox>
  );
};


SectionStyles.propTypes = {};

export default SectionStyles;
