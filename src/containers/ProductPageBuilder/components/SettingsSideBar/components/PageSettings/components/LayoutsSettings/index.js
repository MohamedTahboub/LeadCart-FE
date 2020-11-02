import React, { useEffect, useState } from 'react';
import common from 'components/common';
import FlatRadio from 'components/FlatRadio';
import { SettingBox } from '../../../common';
import Slider from 'rc-slider';
import Collapse from 'components/Collapsible';
import * as immutable from 'object-path-immutable';

const {
  MiniColorPicker,
  InputRow,
  FlexBox
} = common;


const {
  Label,
  SelectOption,
  AddImage
} = InputRow;

const LayoutsSettings = ({
  pageStyles = {},
  onChange
}) => {

  const [openCollapse, setOpenCollapse] = useState();
  const [activeColumn, setActiveColumn] = useState('firstColumn');

  const { productPage = {} } = pageStyles;

  const isColumnBackgroundHasImageType = productPage[activeColumn]?.backgroundType === 'image';
  const isOneColumnLayout = pageStyles.layout !== 'two-column';

  const defaultWidth = isOneColumnLayout ? 750 : 450;

  const _onChange = ({ name, value }) => {
    onChange({ target: { name, value } });
  };


  const onPageStylesFiledChange = ({ target = {} }) => {
    const { name, value } = target;
    _onChange({
      name: `pageStyles.${name}`,
      value
    });
  };

  const onSliderChange = (value, name) => {
    const updatedProductStyles = immutable.set(pageStyles, name, value);
    _onChange({
      name: 'pageStyles',
      value: updatedProductStyles
    });
  };

  const onActiveColumnChange = ({ value }) => {
    setActiveColumn(value);
  };

  useEffect(() => {
    if (activeColumn) setOpenCollapse();
  }, [activeColumn]);


  return (
    <FlexBox column>
      <SettingBox
        title={(
          <span className='small-text'>
            Active Product Column Setup
          </span>
        )}
      >
        <FlatRadio
          options={[
            { label: 'First Column', value: 'firstColumn' },
            { label: 'Second Column', value: 'secondColumn', disabled: isOneColumnLayout }
          ]}
          value={activeColumn || 'firstColumn'}
          name='activeColumn'
          className='m-2'
          onToggle={onActiveColumnChange}
        />
        <Collapse defaultOpen={openCollapse === 'Column Width'} title='Column Width' toggle={setOpenCollapse}>
          <span>Width {`${productPage[activeColumn]?.width || defaultWidth}px`}</span>
          <Slider
            max={1200}
            min={300}
            defaultValue={defaultWidth}
            onChange={(width) => onSliderChange(width, `productPage.${activeColumn}.width`)}
            value={productPage[activeColumn]?.width || defaultWidth}
          />
        </Collapse>

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
              Background {`${isColumnBackgroundHasImageType ? 'Image' : 'Color'}`}:
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
              <MiniColorPicker
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
    </FlexBox>
  );
};
LayoutsSettings.propTypes = {};


export default LayoutsSettings;