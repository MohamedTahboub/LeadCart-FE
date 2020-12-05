import React from 'react';
import clx from 'classnames';
import Slider from 'rc-slider';

import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';

import './style.css';

const { FlexBox, InputRow, MiniColorPicker, Title } = common;
const { Label, Toggle } = InputRow;

const SectionStyles = ({ values = {}, onChange }) => {
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

            <InlinePopup
              title='Shadow Color'
              popUpContent={(
                <FlexBox center='v-center' spaceBetween className='mt-2'>
                  <span className='gray-text'>Shadow Color</span>
                  <MiniColorPicker
                    name='shadowColor'
                    value={values.shadowColor || '#FFF'}
                    onChange={onChange}
                    disabled={!values.hasShadow}
                  />
                </FlexBox>
              )}
            />
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

    </FlexBox>
  );
};


SectionStyles.propTypes = {};

export default SectionStyles;
