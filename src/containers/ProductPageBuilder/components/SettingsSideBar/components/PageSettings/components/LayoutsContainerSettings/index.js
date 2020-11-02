import React, { useState } from 'react';
import common from 'components/common';
import { SettingBox } from '../../../common';
import Slider from 'rc-slider';
import Collapse from 'components/Collapsible';
import { FiColumns } from 'react-icons/fi';
import { VscBrowser } from 'react-icons/vsc';
import FlatRadio from 'components/FlatRadio';
import * as immutable from 'object-path-immutable';

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
      <SettingBox title='Background' >
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
      </SettingBox>

      <SettingBox title='Border Style'>
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Border Radius:
          </Label>
          <SelectOption
            value={pageStyles.productPage?.borderRadius || 16}
            name='pageStyles.productPage.borderRadius'
            onChange={onChange}
            options={[
              { label: '0 px', value: '0' },
              { label: '1 px', value: '1' },
              { label: '2 px', value: '2' },
              { label: '3 px', value: '3' },
              { label: '4 px', value: '4' },
              { label: '5 px', value: '5' },
              { label: '6 px', value: '6' },
              { label: '7 px', value: '7' },
              { label: '8 px', value: '8' },
              { label: '9 px', value: '9' },
              { label: '10 px', value: '10' },
              { label: '11 px', value: '11' },
              { label: '12 px', value: '12' },
              { label: '13 px', value: '13' },
              { label: '14 px', value: '14' },
              { label: '15 px', value: '15' },
              { label: '16 px', value: '16' }
            ]}
          />
        </InputRow>
      </SettingBox>
      <SettingBox title='Spacing'>
        <Collapse defaultOpen={openCollapse === 'Margin'} title='Margin' toggle={setOpenCollapse}>
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

        </Collapse>
        <Collapse defaultOpen={openCollapse === 'Padding'} title='Padding' toggle={setOpenCollapse}>

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
        </Collapse>
      </SettingBox>
    </FlexBox>
  );
};
LayoutsContainerSettings.propTypes = {};


export default LayoutsContainerSettings;