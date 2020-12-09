import React from 'react';
import Slider from 'rc-slider';


import common from 'components/common';
import InlinePopup from 'components/common/InlinePopup';

const { InputRow, FlexBox, MiniColorPicker } = common;
const { Label } = InputRow;


const FaqStyles = ({ onChange, onColorChange, styles }) => {
  const {
    backgroundColor = 'transparent',
    titleColor = '#000',
    borderColor,
    borderWidth = 0,


    itemBackgroundColor,
    itemTitleColor,
    itemContentTextColor,
    itemContentBackgroundColor,
    itemBorderColor,
    itemBorderWidth = 0
  } = styles;


  console.log(styles);
  return (
    <FlexBox column>
      <InlinePopup
        title='FAQs Color'
        popUpContent={(
          <FlexBox column>
            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Background Color</Label>
              <MiniColorPicker
                value={backgroundColor}
                name='styles.backgroundColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Title Color</Label>
              <MiniColorPicker
                value={titleColor}
                name='styles.titleColor'
                onChange={onColorChange}
              />
            </FlexBox>
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
                name='styles.itemBackgroundColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Title Color</Label>
              <MiniColorPicker
                value={itemTitleColor}
                name='styles.itemTitleColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Content Text Color</Label>
              <MiniColorPicker
                value={itemContentTextColor}
                name='styles.itemContentTextColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <FlexBox className='v-center my-2' spaceBetween>
              <Label>Content Background Color</Label>
              <MiniColorPicker
                value={itemContentBackgroundColor}
                name='styles.itemContentBackgroundColor'
                onChange={onColorChange}
              />
            </FlexBox>

            <InlinePopup
              title='Border'
              popUpContent={(
                <FlexBox column>
                  <FlexBox className='v-center my-2' spaceBetween>
                    <Label>Border Color</Label>
                    <MiniColorPicker
                      value={itemBorderColor}
                      name='styles.itemBorderColor'
                      onChange={onColorChange}
                    />
                  </FlexBox>

                  <FlexBox column>
                    <span>Border Width {`${itemBorderWidth}px`}</span>
                    <Slider
                      max={10}
                      min={0}
                      defaultValue={0}
                      onChange={(value) => onChange({ value, name: 'styles.itemBorderWidth' })}
                      value={itemBorderWidth}
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
