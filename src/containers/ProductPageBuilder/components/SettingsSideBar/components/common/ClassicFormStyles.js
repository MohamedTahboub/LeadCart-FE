import React from 'react';
import clx from 'classnames';
import Slider from 'rc-slider';

import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';

import './style.css';

const { FlexBox, InputRow, MiniColorPicker, Title } = common;
const { Label, Toggle, SelectOption } = InputRow;

const SectionStyles = ({ values = {}, onChange, completeOrderButton, onSectionSettingChange, sectionSetting }) => {
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


  const onSliderChange = (value, name) => {
    onChange({ target: { name, value } });
  };

  return (
    <FlexBox column>
      <InlinePopup
        title='Background Color'
        popUpContent={(
          <FlexBox>
            <Label className='sidebar-input-label mr-2'>
                Background Color:
            </Label>

            <MiniColorPicker
              name={'backgroundColor'}
              value={values.backgroundColor}
              onChange={onChange}
            />
          </FlexBox>
        )}
      />

      <InlinePopup
        title='Border Radius'
        popUpContent={(
          <FlexBox column>
            <span>Top Left Border {`${values.borderTopLeftRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(topLeft) => onSliderChange(topLeft, 'borderTopLeftRadius')}
              value={values.borderTopLeftRadius || 0}
            />

            <span>Top Right Border {`${values.borderTopRightRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(topRight) => onSliderChange(topRight, 'borderTopRightRadius')}
              value={values.borderTopRightRadius || 0}
            />

            <span>Bottom Left Border {`${values.borderBottomLeftRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomLeft) => onSliderChange(bottomLeft, 'borderBottomLeftRadius')}
              value={values.borderBottomLeftRadius || 0}
            />

            <span>Bottom Right Border {`${values.borderBottomRightRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomRight) => onSliderChange(bottomRight, 'borderBottomRightRadius')}
              value={values.borderBottomRightRadius || 0}
            />
          </FlexBox>

        )}
      />

      <InlinePopup
        title='Shadows'
        popUpContent={(
          <FlexBox column>
            <span>Shadow</span>
            <Toggle value={values.hasShadow} onToggle={(target) => onChange({ target })} name='hasShadow' />
            <span className='gray-text'>Offset-X</span>
            <Slider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(offsetX) => onSliderChange(offsetX, 'boxShadowOffsetX')}
              value={values.boxShadowOffsetX || 0}
              disabled={!values.hasShadow}
            />
            <span className='gray-text'>Offset-Y</span>
            <Slider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(offsetY) => onSliderChange(offsetY, 'boxShadowOffsetY')}
              value={values.boxShadowOffsetY || 0}
              disabled={!values.hasShadow}
            />
            <span className='gray-text'>Blur</span>
            <Slider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(blur) => onSliderChange(blur, 'boxShadowBlur')}
              value={values.boxShadowBlur || 0}
              disabled={!values.hasShadow}
            />
            <FlexBox center='v-center' spaceBetween className='mt-2'>
              <span className='gray-text'>Shadow Color</span>
              <MiniColorPicker
                name='shadowColor'
                value={values.shadowColor || '#FFF'}
                onChange={onChange}
                disabled={!values.hasShadow}
              />
            </FlexBox>
          </FlexBox>
        )}
      />


      <InlinePopup
        title='Margin'
        popUpContent={(
          <FlexBox column>
            <span>Margin Top {`${values.marginTop || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginTop) => onSliderChange(marginTop, 'marginTop')}
              value={values.marginTop || 0}
            />

            <span>Margin Right {`${values.marginRight || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginRight) => onSliderChange(marginRight, 'marginRight')}
              value={values.marginRight || 0}
            />

            <span>Margin Bottom {`${values.marginBottom || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginBottom) => onSliderChange(marginBottom, 'marginBottom')}
              value={values.marginBottom || 0}
            />

            <span>Margin Left {`${values.marginLeft || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginLeft) => onSliderChange(marginLeft, 'marginLeft')}
              value={values.marginLeft || 0}
            />
          </FlexBox>
        )}
      />

      <InlinePopup
        title='Padding'
        popUpContent={(
          <FlexBox column>
            <span>Padding Top {`${values.paddingTop || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingTop) => onSliderChange(paddingTop, 'paddingTop')}
              value={values.paddingTop || 0}
            />

            <span>Padding Right {`${values.paddingRight || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingRight) => onSliderChange(paddingRight, 'paddingRight')}
              value={values.paddingRight || 0}
            />

            <span>Padding Bottom {`${values.paddingBottom || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingBottom) => onSliderChange(paddingBottom, 'paddingBottom')}
              value={values.paddingBottom || 0}
            />

            <span>Padding Left {`${values.paddingLeft || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingLeft) => onSliderChange(paddingLeft, 'paddingLeft')}
              value={values.paddingLeft || 0}
            />
          </FlexBox>
        )}
      />


      <FlexBox column>
        <Title>Button Style:</Title>
        <InlinePopup
          title='Button Background Color'
          popUpContent={(
            <FlexBox spaceBetween>
              <span className='gray-text'>Button Background</span>
              <MiniColorPicker
                name='background'
                value={background}
                onChange={onButtonSettingsChange}
              />
            </FlexBox>
          )}
        />

        <InlinePopup
          title='Button Text Color'
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
              <div>Border Radius</div>
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
              <FlexBox center='v-center' spaceBetween className='mb-2'>
                <div className='gray-text mb-2'>Border style</div>
                <SelectOption
                  name='borderStyle'
                  value={borderStyle}
                  onChange={onButtonSettingsChange}
                  options={[
                    { label: 'Solid', value: 'solid' },
                    { label: 'Dashed', value: 'dashed' },
                    { label: 'Dotted', value: 'dotted' },
                    { label: 'None', value: 'hidden' }
                  ]}
                />
              </FlexBox>
              <FlexBox center='v-center' spaceBetween className='mb-2'>
                <div className='gray-text mb-2'>Border Width</div>
                <SelectOption
                  value={borderWidth}
                  name='borderWidth'
                  onChange={onButtonSettingsChange}
                  options={[
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
                  ]}
                />
              </FlexBox>
              <FlexBox center='v-center' className='pb-140px' spaceBetween>
                <span className='gray-text'>Border Color</span>
                <MiniColorPicker
                  name='borderColor'
                  value={borderColor}
                  onChange={onButtonSettingsChange}
                />
              </FlexBox>
            </FlexBox>
          )}
        />


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
              <FlexBox center='v-center' spaceBetween className='pb-140px mt-2'>
                <span className='gray-text'>Shadow Color</span>
                <MiniColorPicker
                  name='shadowColor'
                  value={shadowColor}
                  onChange={onButtonSettingsChange}
                  disabled={!hasShadow}
                />
              </FlexBox>
            </FlexBox>
          )}
        />


        {/* <FlexBox center='v-center' spaceBetween>
          <span className='gray-text'>Position</span>
          <SelectOption
            name='position'
            value={position}
            onChange={onButtonSettingsChange}
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' },
              { label: 'Center', value: 'center' },
              { label: 'Justified', value: 'justified' }
            ]}
          />
        </FlexBox> */}


        <InlinePopup
          title='Button Position'
          popupClass='p-1'
          popUpContent={(
            <FlexBox center='v-center margin-v-5'>
              {[
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
                { label: 'Center', value: 'center' },
                { label: 'Justified', value: 'justified' }
              ].map(({ label, value }) => {
                return (
                  <FlexBox
                    className={clx('v-cenet h-center py-2 px-1 item-clickable mx-1 position-option ', { activePositionOption: value === position })}
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
    </FlexBox>
  );
};


SectionStyles.propTypes = {};

export default SectionStyles;
