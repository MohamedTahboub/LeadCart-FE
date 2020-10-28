import React, { useEffect, useState } from 'react';
import common from 'components/common';
import { useContext } from '../../../../actions';
import { FiColumns } from 'react-icons/fi';
import { VscBrowser } from 'react-icons/vsc';
import FlatRadio from 'components/FlatRadio';
import { SettingBox } from '../common';
import ReactToolTip from 'react-tooltip';
import Slider from 'rc-slider';
import Collapse from 'components/Collapsible';
import * as immutable from 'object-path-immutable';
// import { PageBackgroundModal } from './components';

const {
  MiniTwitterPicker,
  Tabs,
  Tab,
  InputRow,
  FlexBox,
  Button
} = common;


const {
  Label,
  SelectOption,
  Toggle,
  AddImage
} = InputRow;

const PageSettings = () => {

  const [openCollapse, setOpenCollapse] = useState();
  const [activeColumn, setActiveColumn] = useState('firstColumn');

  const {
    state: { product = {} },
    actions
  } = useContext();

  const { pageStyles = {} } = product;
  const { productPage = {} } = pageStyles;

  const onToggleChange = (target) => {
    if (target.name === 'pageStyles.layout') {
      const isTwoColumnLayout = target.value === 'two-column';

      actions.onProductFieldChange({
        name: 'pageStyles',
        value: {
          ...pageStyles,
          widthMode: isTwoColumnLayout ? 'wide' : 'normal',
          layout: target.value
        }
      });
    } else {
      actions.onProductFieldChange(target);
    }
  };

  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };

  const onPageStylesFiledChange = ({ target = {} }) => {
    const { name, value } = target;
    console.log({
      name,
      value
    });
    actions.onProductFieldChange({
      name: `pageStyles.${name}`,
      value
    });
  };


  const openPageBackgroundModal = () => {
    actions.onToggleProductBackgroundModal();
  };

  const onSliderChange = (value, name) => {
    const updatedProductStyles = immutable.set(pageStyles, name, value);
    actions.onProductFieldChange({
      name: 'pageStyles',
      value: updatedProductStyles
    });
  };
  // const onNestedSliderChange = (value, name) => {
  //   onSliderChange(value, `pageStyles.${name}`);
  // };

  const onActiveColumnChange = ({ value }) => {
    setActiveColumn(value);
  };

  const isColumnBackgroundHasImageType = productPage[activeColumn]?.backgroundType === 'image';

  useEffect(() => {
    if (activeColumn) setOpenCollapse();
  }, [activeColumn]);
  return (
    <Tabs active='styles' className='p-2 flex' tabsContentClassName='scrolling-70vh flex'>

      <Tab id='styles' title='Styles' >
        <SettingBox
          title='Size'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Product Width:
            </Label>
            <SelectOption
              value={pageStyles.widthMode}
              name='pageStyles.widthMode'
              onChange={onChange}
              options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Wide', value: 'wide' }
              ]}
            />
          </InputRow>
        </SettingBox>
        <SettingBox
          title='Page Background Settings'
        >
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Screen Backgrounds:
            </Label>
            <Button
              className='light-btn'
              onClick={openPageBackgroundModal}
            >
              Change
            </Button>
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Product Background Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.productBackground'
              value={pageStyles.productBackground}
              onChange={onChange}
            />
          </InputRow>
          <InputRow className='sidebar-row'>
            <Label className='sidebar-input-label'>
              Theme Color:
            </Label>
            <MiniTwitterPicker
              name='pageStyles.themeColor'
              value={pageStyles.themeColor}
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
              value={pageStyles.borderRadius}
              name='pageStyles.borderRadius'
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
                { label: '10 px', value: '10' }
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

            <span>Padding Top {`(${productPage.paddingTop || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingTop) => onSliderChange(paddingTop, 'productPage.paddingTop')}
              value={productPage.paddingTop || 0}
            />

            <span>Padding Right {`(${productPage.paddingRight || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingRight) => onSliderChange(paddingRight, 'productPage.paddingRight')}
              value={productPage.paddingRight || 0}
            />

            <span>Padding Bottom {`(${productPage.paddingBottom || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingBottom) => onSliderChange(paddingBottom, 'productPage.paddingBottom')}
              value={productPage.paddingBottom || 0}
            />

            <span>Padding Left {`(${productPage.paddingLeft || 0}px)`}</span>
            <Slider
              max={200}
              min={0}
              defaultAddImageValue={5}
              onChange={(paddingLeft) => onSliderChange(paddingLeft, 'productPage.paddingLeft')}
              value={productPage.paddingLeft || 0}
            />
          </Collapse>
        </SettingBox>
      </Tab>
      <Tab id='advance' title='Advance' >
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
                    <FlexBox center='v-center h-center' className='p-2'>
                      <VscBrowser
                        data-tip='One Column Product Layout'
                        className={`${pageStyles.layout !== 'two-column' ? 'white-text' : 'gray-text'} mr-1`}
                      />
                    </FlexBox>
                  )
                  , value: 'one-column'
                },
                {
                  label: (
                    <FlexBox center='v-center h-center' className='p-2'>
                      <FiColumns
                        data-tip='Two Column Product Layout'
                        className={`${pageStyles.layout === 'two-column' ? 'white-text' : 'gray-text'} mr-1`}
                      />
                    </FlexBox>
                  ), value: 'two-column'
                }
              ]}
              value={pageStyles.layout || 'one-column'}
              name='pageStyles.layout'
              onToggle={onToggleChange}
            />
          </FlexBox>
        </SettingBox>
        <SettingBox
          title={(
            <span className='small-text'>
              Each Column Background & Spacing
            </span>
          )}
        >
          <FlatRadio
            options={[
              { label: 'First Column', value: 'firstColumn' },
              { label: 'Second Column', value: 'secondColumn' }
            ]}
            value={activeColumn || 'firstColumn'}
            name='activeColumn'
            className='m-2'
            onToggle={onActiveColumnChange}
          />
          <Collapse defaultOpen={openCollapse === 'Column Background'} title='Column Background' toggle={setOpenCollapse}>
            <InputRow className='sidebar-row'>
              <Label className='sidebar-input-label'>
                Background Type:
              </Label>
              <SelectOption
                value={productPage[activeColumn]?.backgroundType}
                name={`productPage.${activeColumn}.backgroundType`}
                onChange={onPageStylesFiledChange}
                options={[
                  { label: 'Color', value: 'color' },
                  { label: 'Image', value: 'image' }
                ]}
              />
            </InputRow>
            <InputRow className='sidebar-row'>
              <Label className='sidebar-input-label'>
                Background {`${isColumnBackgroundHasImageType === 'image' ? 'Image' : 'Color'}`}:
              </Label>
              {isColumnBackgroundHasImageType ? (
                <AddImage
                  value={productPage[activeColumn]?.backgroundImage}
                  name={`productPage.${activeColumn}.backgroundImage`}
                  onUploaded={(image) => onPageStylesFiledChange({
                    target: {
                      name: `productPage.${activeColumn}.backgroundImage`,
                      value: image
                    }
                  })}
                />
              ) : (
                <MiniTwitterPicker
                  name={`productPage.${activeColumn}.backgroundColor`}
                  value={productPage[activeColumn]?.backgroundColor}
                  onChange={onPageStylesFiledChange}
                />
              )}
            </InputRow>


          </Collapse>
          <Collapse defaultOpen={openCollapse === 'Column Border Radius'} title='Column Border Radius' toggle={setOpenCollapse}>
            <span>Top Left Border {`${productPage[activeColumn]?.borderTopLeftRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(topLeft) => onSliderChange(topLeft, `productPage.${activeColumn}.borderTopLeftRadius`)}
              value={productPage[activeColumn]?.borderTopLeftRadius || 0}
            />

            <span>Top Right Border {`${productPage[activeColumn]?.borderTopRightRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(topRight) => onSliderChange(topRight, `productPage.${activeColumn}.borderTopRightRadius`)}
              value={productPage[activeColumn]?.borderTopRightRadius || 0}
            />


            <span>Bottom Left Border {`${productPage[activeColumn]?.borderBottomLeftRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomLeft) => onSliderChange(bottomLeft, `productPage.${activeColumn}.borderBottomLeftRadius`)}
              value={productPage[activeColumn]?.borderBottomLeftRadius || 0}
            />


            <span>Bottom Right Border {`${productPage[activeColumn]?.borderBottomRightRadius || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(bottomRight) => onSliderChange(bottomRight, `productPage.${activeColumn}.borderBottomRightRadius`)}
              value={productPage[activeColumn]?.borderBottomRightRadius || 0}
            />

          </Collapse>
          <Collapse defaultOpen={openCollapse === 'Column Margin'} title='Column Margin' toggle={setOpenCollapse}>
            <span>Margin Top {`${productPage[activeColumn]?.marginTop || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginTop) => onSliderChange(marginTop, `productPage.${activeColumn}.marginTop`)}
              value={productPage[activeColumn]?.marginTop || 0}
            />

            <span>Margin Right {`${productPage[activeColumn]?.marginRight || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginRight) => onSliderChange(marginRight, `productPage.${activeColumn}.marginRight`)}
              value={productPage[activeColumn]?.marginRight || 0}
            />

            <span>Margin Bottom {`${productPage[activeColumn]?.marginBottom || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginBottom) => onSliderChange(marginBottom, `productPage.${activeColumn}.marginBottom`)}
              value={productPage[activeColumn]?.marginBottom || 0}
            />

            <span>Margin Left {`${productPage[activeColumn]?.marginLeft || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(marginLeft) => onSliderChange(marginLeft, `productPage.${activeColumn}.marginLeft`)}
              value={productPage[activeColumn]?.marginLeft || 0}
            />

          </Collapse>
          <Collapse defaultOpen={openCollapse === 'Column Padding'} title='Column Padding' toggle={setOpenCollapse}>

            <span>Padding Top {`${productPage[activeColumn]?.paddingTop || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingTop) => onSliderChange(paddingTop, `productPage.${activeColumn}.paddingTop`)}
              value={productPage[activeColumn]?.paddingTop || 0}
            />

            <span>Padding Right {`${productPage[activeColumn]?.paddingRight || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingRight) => onSliderChange(paddingRight, `productPage.${activeColumn}.paddingRight`)}
              value={productPage[activeColumn]?.paddingRight || 0}
            />

            <span>Padding Bottom {`${productPage[activeColumn]?.paddingBottom || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingBottom) => onSliderChange(paddingBottom, `productPage.${activeColumn}.paddingBottom`)}
              value={productPage[activeColumn]?.paddingBottom || 0}
            />

            <span>Padding Left {`${productPage[activeColumn]?.paddingLeft || 0}px`}</span>
            <Slider
              max={200}
              min={0}
              defaultValue={5}
              onChange={(paddingLeft) => onSliderChange(paddingLeft, `productPage.${activeColumn}.paddingLeft`)}
              value={productPage[activeColumn]?.paddingLeft || 0}
            />
          </Collapse>
        </SettingBox>

        <ReactToolTip delayShow={300} />
      </Tab>
    </Tabs>
  );
};
PageSettings.propTypes = {};


export default PageSettings;
