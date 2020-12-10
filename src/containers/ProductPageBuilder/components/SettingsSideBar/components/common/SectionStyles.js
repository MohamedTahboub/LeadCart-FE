import React from 'react';
import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';
import Slider from 'rc-slider';
const { FlexBox, InputRow, MiniColorPicker, CustomSlider } = common;

const { SelectOption, Label, AddImage, Toggle } = InputRow;

const SectionStyles = ({ values = {}, onChange }) => {


  const onSliderChange = (value, name) => {
    onChange({ target: { name, value } });
  };

  const isBackgroundImageType = values.backgroundType === 'image';
  return (
    <FlexBox column>
      <InlinePopup
        title='Background Settings'
        popUpContent={(
          <FlexBox column>
            <InputRow className='sidebar-row'>
              <Label className='sidebar-input-label'>
                Background Type:
              </Label>
              <SelectOption
                value={values.backgroundType}
                name={'backgroundType'}
                onChange={onChange}
                options={[
                  { label: 'Color', value: 'color' },
                  { label: 'Image', value: 'image' }
                ]}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <Label className='sidebar-input-label'>
                Background {`${isBackgroundImageType ? 'Image' : 'Color'}`}:
              </Label>
              {isBackgroundImageType ? (
                <AddImage
                  value={values.backgroundImage}
                  name={'backgroundImage'}
                  onUploaded={(image) => onChange({
                    target: {
                      name: 'backgroundImage',
                      value: image
                    }
                  })}
                />
              ) : (
                <MiniColorPicker
                  name={'backgroundColor'}
                  value={values.backgroundColor}
                  onChange={onChange}
                />
              )}
            </InputRow>
          </FlexBox>
        )}
      />
      <InlinePopup
        title='Border Radius'
        popUpContent={(
          <FlexBox column>
            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(topLeft) => onSliderChange(topLeft, 'borderTopLeftRadius')}
              value={values.borderTopLeftRadius || 0}
              label='Top Left Border'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(topRight) => onSliderChange(topRight, 'borderTopRightRadius')}
              value={values.borderTopRightRadius || 0}
              label='Top Right Border'
            />


            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomLeft) => onSliderChange(bottomLeft, 'borderBottomLeftRadius')}
              value={values.borderBottomLeftRadius || 0}
              label='Bottom Left Border'
            />


            <span>Bottom Right Border {`${values.borderBottomRightRadius || 0}px`}</span>
            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomRight) => onSliderChange(bottomRight, 'borderBottomRightRadius')}
              value={values.borderBottomRightRadius || 0}
              label='Bottom Right Border'
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
            <CustomSlider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(offsetX) => onSliderChange(offsetX, 'boxShadowOffsetX')}
              value={values.boxShadowOffsetX || 0}
              disabled={!values.hasShadow}
              label='Offset-X'
            />
            <CustomSlider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(offsetY) => onSliderChange(offsetY, 'boxShadowOffsetY')}
              value={values.boxShadowOffsetY || 0}
              disabled={!values.hasShadow}
              label='Offset-Y'
            />
            <CustomSlider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(blur) => onSliderChange(blur, 'boxShadowBlur')}
              value={values.boxShadowBlur || 0}
              disabled={!values.hasShadow}
              label='Blur'
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
            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginTop) => onSliderChange(marginTop, 'marginTop')}
              value={values.marginTop || 0}
              label='Margin Top'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginRight) => onSliderChange(marginRight, 'marginRight')}
              value={values.marginRight || 0}
              label='Margin Right'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginBottom) => onSliderChange(marginBottom, 'marginBottom')}
              value={values.marginBottom || 0}
              label='Margin Bottom'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginLeft) => onSliderChange(marginLeft, 'marginLeft')}
              value={values.marginLeft || 0}
              label='Margin Left'
            />
          </FlexBox>
        )}
      />

      <InlinePopup
        title='Padding'
        popUpContent={(
          <FlexBox column>
            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingTop) => onSliderChange(paddingTop, 'paddingTop')}
              value={values.paddingTop || 0}
              label='Padding Top'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingRight) => onSliderChange(paddingRight, 'paddingRight')}
              value={values.paddingRight || 0}
              label='Padding Right'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingBottom) => onSliderChange(paddingBottom, 'paddingBottom')}
              value={values.paddingBottom || 0}
              label='Padding Bottom'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingLeft) => onSliderChange(paddingLeft, 'paddingLeft')}
              value={values.paddingLeft || 0}
              label='Padding Left'
            />
          </FlexBox>
        )}
      />
    </FlexBox>
  );
};

SectionStyles.propTypes = {};

export default SectionStyles;
