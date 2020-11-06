import React, { useState } from 'react';
import common from 'components/common';
import { SettingBox } from '../../../common';
import Slider from 'rc-slider';
import Collapse from 'components/Collapsible';
import { FiColumns } from 'react-icons/fi';
import { VscBrowser } from 'react-icons/vsc';
import FlatRadio from 'components/FlatRadio';
import * as immutable from 'object-path-immutable';
import InlinePopup from 'components/common/InlinePopup';
import { GoSettings } from 'react-icons/go';
import { BiHide } from 'react-icons/bi';


const SettingToggleIcons = ({ show }) => {

  return !show ? (
    <GoSettings color='#25345d' />
  ) : (
    <BiHide color='#25345d' />
  );
};

const {
  MiniColorPicker,
  InputRow,
  FlexBox,
  Tooltip
} = common;


const {
  Label,
  SelectOption,
  Toggle
} = InputRow;

const defaultPadding = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
};
const LayoutsContainerSettings = ({
  pageStyles,
  onChange
}) => {

  const { productPage = {} } = pageStyles;
  const [openCollapse, setOpenCollapse] = useState();

  const _onChange = ({ name, value }) => {
    onChange({ target: { name, value } });
  };

  const onToggleChange = (target) => {
    if (target.name === 'pageStyles.layout') {
      const isTwoColumnLayout = target.value === 'two-column';

      _onChange({
        name: 'pageStyles',
        value: {
          ...pageStyles,
          widthMode: isTwoColumnLayout ? 'wide' : 'normal',
          layout: target.value
        }
      });
    } else {
      _onChange(target);
    }
  };


  const onSliderChange = (value, name) => {
    const updatedProductStyles = immutable.set(pageStyles, name, value);
    _onChange({
      name: 'pageStyles',
      value: updatedProductStyles
    });
  };

  return (
    <FlexBox column>
      <SettingBox
        title='Product Header'
      >
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Show:
          </Label>
          <Toggle
            value={pageStyles.showHead}
            name='pageStyles.showHead'
            onToggle={onToggleChange}
            beforeLabel='Show'
            afterLabel='Hide'
          />
        </InputRow>
      </SettingBox>
      <SettingBox
        title='Product Page Layout'
      >
        <FlexBox center='v-center' className='p-2'>
          <Label className='sidebar-input-label'>
            Layout:
          </Label>
          <FlatRadio
            options={[
              {
                label: (
                  <Tooltip placement='top' text='One Column Product Layout'>
                    <FlexBox center='v-center h-center' className='p-2'>
                      <VscBrowser
                        className={`${pageStyles.layout !== 'two-column' ? 'white-text' : 'gray-text'} mr-1`}
                      />
                    </FlexBox>
                  </Tooltip>
                )
                , value: 'one-column'
              },
              {
                label: (
                  <Tooltip placement='top' text='Two Column Product Layout'>
                    <FlexBox center='v-center h-center' className='p-2'>
                      <FiColumns
                        data-tip='Two Column Product Layout'
                        className={`${pageStyles.layout === 'two-column' ? 'white-text' : 'gray-text'} mr-1`}
                      />
                    </FlexBox>
                  </Tooltip>
                ), value: 'two-column'
              }
            ]}
            value={pageStyles.layout || 'one-column'}
            name='pageStyles.layout'
            onToggle={onToggleChange}
          />
        </FlexBox>
      </SettingBox>
      <InlinePopup
        title={'Background'}
        button={SettingToggleIcons}
        popUpContent={(
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Background Color:
            </Label>
            <MiniColorPicker
              name='pageStyles.productPage.backgroundColor'
              value={pageStyles.productPage?.backgroundColor}
              onChange={onChange}
            />
          </InputRow>
        )}
      />
      <InlinePopup
        title={`Container Border Radius ${productPage.borderRadius || 16}px`}
        button={SettingToggleIcons}
        popUpContent={(
          <Slider
            max={100}
            min={0}
            defaultValue={16}
            onChange={(radius) => onSliderChange(radius, 'productPage.borderRadius')}
            value={productPage.borderRadius || 16}
          />
        )}
      />
      <InlinePopup
        title={'Margin'}
        button={SettingToggleIcons}
        popUpContent={(
          <FlexBox column>
            <span>Margin Top {`(${productPage.marginTop || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginTop) => onSliderChange(marginTop, 'productPage.marginTop')}
              value={productPage.marginTop || 0}
            />

            <span>Margin Right {`(${productPage.marginRight || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginRight) => onSliderChange(marginRight, 'productPage.marginRight')}
              value={productPage.marginRight || 0}
            />

            <span>Margin Bottom {`(${productPage.marginBottom || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginBottom) => onSliderChange(marginBottom, 'productPage.marginBottom')}
              value={productPage.marginBottom || 0}
            />

            <span>Margin Left {`(${productPage.marginLeft || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginLeft) => onSliderChange(marginLeft, 'productPage.marginLeft')}
              value={productPage.marginLeft || 0}
            />
          </FlexBox>
        )}
      />
      <InlinePopup
        title={'Padding'}
        button={SettingToggleIcons}
        popUpContent={(
          <FlexBox column>
            <span>Padding Top {`(${productPage.paddingTop || defaultPadding.top}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingTop) => onSliderChange(paddingTop, 'productPage.paddingTop')}
              value={productPage.paddingTop || defaultPadding.top}
            />

            <span>Padding Right {`(${productPage.paddingRight || defaultPadding.right}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingRight) => onSliderChange(paddingRight, 'productPage.paddingRight')}
              value={productPage.paddingRight || defaultPadding.right}
            />

            <span>Padding Bottom {`(${productPage.paddingBottom || defaultPadding.bottom}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingBottom) => onSliderChange(paddingBottom, 'productPage.paddingBottom')}
              value={productPage.paddingBottom || defaultPadding.bottom}
            />

            <span>Padding Left {`(${productPage.paddingLeft || defaultPadding.left}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultAddImageValue={5}
              onChange={(paddingLeft) => onSliderChange(paddingLeft, 'productPage.paddingLeft')}
              value={productPage.paddingLeft || defaultPadding.left}
            />
          </FlexBox>
        )}
      />
    </FlexBox >
  );
};
LayoutsContainerSettings.propTypes = {};


export default LayoutsContainerSettings;
