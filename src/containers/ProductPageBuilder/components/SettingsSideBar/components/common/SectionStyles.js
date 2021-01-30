import React from 'react';
import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';


const { FlexBox, InputRow, MiniColorPicker, CustomSlider, BackgroundOptions } = common;
const { Toggle } = InputRow;

const SectionStyles = ({ values = {}, onChange, onBackgroundChange }) => {
  const onSliderChange = (value, name) => {
    onChange({ target: { name, value } });
  };


  return (
    <FlexBox column>
      <BackgroundOptions onChange={onBackgroundChange} styles={values} />

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
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(topRight) => onSliderChange(topRight, 'borderTopRightRadius')}
              value={values.borderTopRightRadius || 0}
              label='Top Right Border'
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomLeft) => onSliderChange(bottomLeft, 'borderBottomLeftRadius')}
              value={values.borderBottomLeftRadius || 0}
              label='Bottom Left Border'
              unit='px'
            />

            <span>Bottom Right Border {`${values.borderBottomRightRadius || 0}px`}</span>
            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomRight) => onSliderChange(bottomRight, 'borderBottomRightRadius')}
              value={values.borderBottomRightRadius || 0}
              label='Bottom Right Border'
              unit='px'
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
              unit='px'
            />
            <CustomSlider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(offsetY) => onSliderChange(offsetY, 'boxShadowOffsetY')}
              value={values.boxShadowOffsetY || 0}
              disabled={!values.hasShadow}
              label='Offset-Y'
              unit='px'
            />
            <CustomSlider
              max={20}
              min={0}
              defaultValue={5}
              onChange={(blur) => onSliderChange(blur, 'boxShadowBlur')}
              value={values.boxShadowBlur || 0}
              disabled={!values.hasShadow}
              label='Blur'
              unit='px'
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
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginRight) => onSliderChange(marginRight, 'marginRight')}
              value={values.marginRight || 0}
              label='Margin Right'
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginBottom) => onSliderChange(marginBottom, 'marginBottom')}
              value={values.marginBottom || 0}
              label='Margin Bottom'
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginLeft) => onSliderChange(marginLeft, 'marginLeft')}
              value={values.marginLeft || 0}
              label='Margin Left'
              unit='px'
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
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingRight) => onSliderChange(paddingRight, 'paddingRight')}
              value={values.paddingRight || 0}
              label='Padding Right'
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingBottom) => onSliderChange(paddingBottom, 'paddingBottom')}
              value={values.paddingBottom || 0}
              label='Padding Bottom'
              unit='px'
            />

            <CustomSlider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingLeft) => onSliderChange(paddingLeft, 'paddingLeft')}
              value={values.paddingLeft || 0}
              label='Padding Left'
              unit='px'
            />
          </FlexBox>
        )}
      />
    </FlexBox>
  );
};

SectionStyles.propTypes = {};

export default SectionStyles;
