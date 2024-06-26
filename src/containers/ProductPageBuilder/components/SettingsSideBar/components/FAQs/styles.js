import React from 'react';
import Slider from 'rc-slider';
import clx from 'classnames';

import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';

const { InputRow, FlexBox, MiniColorPicker, Title, BackgroundOptions } = common;
const { Label, Toggle } = InputRow;


const FaqStyles = ({ onChange, onColorChange, onBackgroundChange, styles = {} }) => {
  const {
    titleColor = '#000',
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
    itemStyles = {}
  } = styles;

  const {
    backgroundColor: itemBackgroundColor,
    titleColor: itemTitleColor,
    contentTextColor: itemContentTextColor,
    contentBackgroundColor: itemContentBackgroundColor,
    borderColor: itemBorderColor,
    borderWidth: itemBorderWidth = 0,
    borderStyle: itemBorderStyle = 'solid',
    borderTopLeftRadius: itemBorderTopLeftRadius = 0,
    borderTopRightRadius: itemBorderTopRightRadius = 0,
    borderBottomLeftRadius: itemBorderBottomLeftRadius = 0,
    borderBottomRightRadius: itemBorderBottomRightRadius = 0,
    hasShadow,
    boxShadowBlur,
    boxShadowOffsetX,
    boxShadowOffsetY,
    shadowColor,
    iconsColor
  } = itemStyles;


  const borderStyleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
    { label: 'None', value: 'hidden' }
  ];


  return (
    <FlexBox column>
      <BackgroundOptions onChange={onBackgroundChange} styles={styles} />

      <InlinePopup
        title='Title Color'
        popUpContent={(
          <FlexBox className='v-center my-2' spaceBetween>
            <Label>Title Color</Label>
            <MiniColorPicker
              value={titleColor}
              name='styles.titleColor'
              onChange={onColorChange}
            />
          </FlexBox>
        )}
      />

      <InlinePopup
        title='Border'
        popUpContent={(
          <FlexBox column>
            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Border Color</Label>
              <MiniColorPicker
                value={borderColor}
                name='styles.borderColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox column>
              <span>Border Width {`${borderWidth}px`}</span>
              <Slider
                max={10}
                min={0}
                defaultValue={0}
                value={borderWidth}
                onChange={(value) => onChange({ value, name: 'styles.borderWidth' })}
              />
            </FlexBox>

            <FlexBox center='mb-3 p-0' column>
              <Title>Border Style:</Title>
              <FlexBox className='v-center' spaceBetween>
                {borderStyleOptions.map(({ label, value }) => {
                  return (
                    <FlexBox
                      className={clx('v-center h-center p-1 item-clickable mr-1 faqs-inline-popup-option', { activeOption: value === borderStyle })}
                      onClick={() => {onChange({ value, name: 'styles.borderStyle' });}}
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
                  <span className='small-text' >Top Left Border {`${borderTopLeftRadius}px`}</span>
                  <Slider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderTopLeftRadius}
                    onChange={(value) => onChange({ value, name: 'styles.borderTopLeftRadius' })}
                  />

                  <span className='small-text' >Top Right Border {`${borderTopRightRadius}px`}</span>
                  <Slider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderTopRightRadius}
                    onChange={(value) => onChange({ value, name: 'styles.borderTopRightRadius' })}
                  />

                  <span className='small-text' >Bottom Left Border {`${borderBottomLeftRadius}px`}</span>
                  <Slider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderBottomLeftRadius}
                    onChange={(value) => onChange({ value, name: 'styles.borderBottomLeftRadius' })}
                  />

                  <span className='small-text' >Bottom Right Border {`${borderBottomRightRadius}px`}</span>
                  <Slider
                    max={100}
                    min={0}
                    defaultValue={0}
                    value={borderBottomRightRadius}
                    onChange={(value) => onChange({ value, name: 'styles.borderBottomRightRadius' })}
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
            <span>Padding Top {`${paddingTop}px`}</span>
            <Slider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingTop}
              onChange={(value) => onChange({ value, name: 'styles.paddingTop' })}
            />

            <span>Padding Right {`${paddingRight}px`}</span>
            <Slider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingRight}
              onChange={(value) => onChange({ value, name: 'styles.paddingRight' })}
            />

            <span>Padding Bottom {`${paddingBottom}px`}</span>
            <Slider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingBottom}
              onChange={(value) => onChange({ value, name: 'styles.paddingBottom' })}
            />

            <span>Padding Left {`${paddingLeft}px`}</span>
            <Slider
              max={100}
              min={0}
              defaultValue={0}
              value={paddingLeft}
              onChange={(value) => onChange({ value, name: 'styles.paddingLeft' })}
            />
          </FlexBox>
        )}
      />


      <InlinePopup
        title='Item Styles'
        popUpContent={(
          <FlexBox column>
            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Background Color</Label>
              <MiniColorPicker
                value={itemBackgroundColor}
                name='styles.itemStyles.backgroundColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Points Color</Label>
              <MiniColorPicker
                value={iconsColor}
                name='styles.itemStyles.iconsColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Title Color</Label>
              <MiniColorPicker
                value={itemTitleColor}
                name='styles.itemStyles.titleColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Content Text Color</Label>
              <MiniColorPicker
                value={itemContentTextColor}
                name='styles.itemStyles.contentTextColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Content Background Color</Label>
              <MiniColorPicker
                value={itemContentBackgroundColor}
                name='styles.itemStyles.contentBackgroundColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <InlinePopup
              title='Border'
              popupClass='p-1'
              popUpContent={(
                <FlexBox column>
                  <FlexBox className='v-center my-2' spaceBetween>
                    <Label>Border Color</Label>
                    <MiniColorPicker
                      value={itemBorderColor}
                      name='styles.itemStyles.borderColor'
                      onChange={onColorChange}
                    />
                  </FlexBox>

                  <FlexBox column>
                    <span>Border Width {`${itemBorderWidth}px`}</span>
                    <Slider
                      max={10}
                      min={0}
                      defaultValue={0}
                      onChange={(value) => onChange({ value, name: 'styles.itemStyles.borderWidth' })}
                      value={itemBorderWidth}
                    />
                  </FlexBox>

                  <FlexBox center='mb-3 p-0' column>
                    <Title>Border Style:</Title>
                    <FlexBox className='v-center' spaceBetween>
                      {borderStyleOptions.map(({ label, value }) => {
                        return (
                          <FlexBox
                            className={clx('v-center h-center p-1 item-clickable mr-1 faqs-inline-popup-option small-text', { activeOption: value === itemBorderStyle })}
                            onClick={() => {onChange({ value, name: 'styles.itemStyles.borderStyle' });}}
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
                    className='min-width-150'
                    popUpContent={(
                      <FlexBox column>
                        <span className='small-text' >Top Left Border {`${itemBorderTopLeftRadius}px`}</span>
                        <Slider
                          max={100}
                          min={0}
                          defaultValue={0}
                          value={itemBorderTopLeftRadius}
                          onChange={(value) => onChange({ value, name: 'styles.itemStyles.borderTopLeftRadius' })}
                        />

                        <span className='small-text' >Top Right Border {`${itemBorderTopRightRadius}px`}</span>
                        <Slider
                          max={100}
                          min={0}
                          defaultValue={0}
                          value={itemBorderTopRightRadius}
                          onChange={(value) => onChange({ value, name: 'styles.itemStyles.borderTopRightRadius' })}
                        />

                        <span className='small-text' >Bottom Left Border {`${itemBorderBottomLeftRadius}px`}</span>
                        <Slider
                          max={100}
                          min={0}
                          defaultValue={0}
                          value={itemBorderBottomLeftRadius}
                          onChange={(value) => onChange({ value, name: 'styles.itemStyles.borderBottomLeftRadius' })}
                        />

                        <span className='small-text' >Bottom Right Border {`${itemBorderBottomRightRadius}px`}</span>
                        <Slider
                          max={100}
                          min={0}
                          defaultValue={0}
                          value={itemBorderBottomRightRadius}
                          onChange={(value) => onChange({ value, name: 'styles.itemStyles.borderBottomRightRadius' })}
                        />
                      </FlexBox>
                    )}
                  />
                </FlexBox>
              )}
            />

            <InlinePopup
              title='Shadows'
              popUpContent={(
                <FlexBox column>
                  <span>Shadow</span>
                  <Toggle value={hasShadow} onToggle={() => onChange({ name: 'styles.itemStyles.hasShadow', value: !hasShadow })} />
                  <span className='gray-text'>Offset-X</span>

                  <Slider
                    max={20}
                    min={0}
                    defaultValue={0}
                    value={boxShadowOffsetX}
                    disabled={!hasShadow}
                    onChange={(value) => onChange({ value, name: 'styles.itemStyles.boxShadowOffsetX' })}
                  />

                  <span className='gray-text'>Offset-Y</span>
                  <Slider
                    max={20}
                    min={0}
                    defaultValue={5}
                    value={boxShadowOffsetY}
                    disabled={!hasShadow}
                    onChange={(value) => onChange({ value, name: 'styles.itemStyles.boxShadowOffsetY' })}
                  />

                  <span className='gray-text'>Blur</span>
                  <Slider
                    max={20}
                    min={0}
                    defaultValue={5}
                    value={boxShadowBlur}
                    disabled={!hasShadow}
                    onChange={(value) => onChange({ value, name: 'styles.itemStyles.boxShadowBlur' })}
                  />

                  <FlexBox center='v-center' spaceBetween className='mt-2'>
                    <span className='gray-text'>Shadow Color</span>
                    <MiniColorPicker
                      name='styles.itemStyles.shadowColor'
                      value={shadowColor || '#FFF'}
                      onChange={onColorChange}
                      disabled={!hasShadow}
                    />
                  </FlexBox>
                </FlexBox>
              )}
            />
          </FlexBox>
        )}
      />
    </FlexBox>
  );
};

export default FaqStyles;
