import React from 'react';
import clx from 'classnames';
import { FiArrowDown, FiArrowRight, FiArrowUpLeft, FiArrowUpRight } from 'react-icons/fi';

import InlinePopup from '../InlinePopup';
import { InputRow } from '../Inputs';
import { MiniColorPicker } from '../ColorPickers';
import { FlexBox } from '../boxes';
import FlatRadio from 'components/FlatRadio';
import { isFunction } from 'libs/checks';

import './style.css';

const { Label, AddImage } = InputRow;


const OptionLabel = ({ label, value, onSelectOptionLabel, activeLabel }) => (
  <p
    className={clx('background-options-label', { 'active-background-options-label': activeLabel === value })}
    onClick={() => onSelectOptionLabel(value)}
  >
    {label}
  </p>
);

const BackgroundOptions = ({
  styles = {},
  onChange,
  title = 'Background',
  backgroundColorName = 'styles.backgroundColor'
}) => {
  const {
    backgroundColor,
    backgroundSecondGradientColor,
    backgroundFirstGradientColor,
    imageBackground,
    gradientType = 'linear',
    gradientColorsDirection = 'to bottom',
    backgroundType = 'color'
  } = styles;

  const isOneColor = backgroundType === 'color';
  const isGradientColor = backgroundType === 'gradientColor';
  const isImageBackground = backgroundType === 'image';
  const isLinearGradient = gradientType === 'linear';


  const labelOptions = [
    { label: 'Color', value: 'color' },
    { label: 'Gradient Color', value: 'gradientColor' },
    { label: 'Image', value: 'image' }
  ];

  const gradientTypeOptions = [
    { label: 'Linear', value: 'linear' },
    { label: 'Radial', value: 'radial' }
  ];

  const gradientDirectionOptions = [
    { label: <FiArrowDown/>, value: 'to bottom' },
    { label: <FiArrowRight />, value: 'to right' },
    { label: <FiArrowUpLeft />, value: 'to top left' },
    { label: <FiArrowUpRight />, value: 'to top right' }
  ];


  const _onChange = (target) => {
    if (isFunction(onChange))
      onChange({ target });
  };


  const onSelectOptionLabel = (value) => _onChange({ name: 'styles.backgroundType', value });
  const onUploadImage = (url) => _onChange({ name: 'styles.imageBackground', value: url });

  return (
    <InlinePopup
      title={title}
      popupClass='background-options-popup'
      popUpContent={(
        <FlexBox className='background-options-container' column>
          <FlexBox className='background-options-labels mb-2' spaceBetween >
            {labelOptions.map((ele) => <OptionLabel {...ele} onSelectOptionLabel={onSelectOptionLabel} activeLabel={backgroundType} />)}
          </FlexBox>


          {
            isOneColor &&
            <FlexBox>
              <Label>Background Color:</Label>
              <MiniColorPicker
                name={backgroundColorName}
                value={backgroundColor}
                onChange={onChange}
                className='flex-1'
              />
            </FlexBox>
          }


          {
            isGradientColor &&
            <FlexBox column>
              <FlexBox >
                <Label>First Color:</Label>
                <MiniColorPicker
                  name='styles.backgroundFirstGradientColor'
                  value={backgroundFirstGradientColor}
                  onChange={onChange}
                  className='flex-1'
                />
              </FlexBox>

              <FlexBox className='my-2' >
                <Label>Second Color:</Label>
                <MiniColorPicker
                  name='styles.backgroundSecondGradientColor'
                  value={backgroundSecondGradientColor}
                  onChange={onChange}
                  className='flex-1'
                />
              </FlexBox>

              <FlexBox spaceBetween>
                <Label>Type:</Label>
                <FlatRadio
                  options={gradientTypeOptions}
                  value={gradientType}
                  name='styles.gradientType'
                  onToggle={_onChange}
                />
              </FlexBox>

              {
                isLinearGradient &&
              <FlexBox className='mt-2' spaceBetween>
                <Label>Direction:</Label>
                <FlatRadio
                  options={gradientDirectionOptions}
                  value={gradientColorsDirection}
                  name='styles.gradientColorsDirection'
                  onToggle={_onChange}
                />
              </FlexBox>
              }
            </FlexBox>
          }


          {
            isImageBackground &&
            <FlexBox className='mt-2' spaceBetween>
              <Label>Add Image:</Label>
              <AddImage onUploaded={onUploadImage} value={imageBackground} />
            </FlexBox>
          }

        </FlexBox>


      )}
    />
  );
};

export default BackgroundOptions;
