import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import upsellTempImage1 from 'assets/images/upsells/v_upsell_template_1.jpg';
import upsellTempImage2 from 'assets/images/upsells/h_upsell_template.jpg';

import './style.css';
import {
  MenuItem,
  MenuTitle,
  MenuContent,
  MenuFlexContent
} from '../MenuElements';

const { Collapse, TwitterPicker } = common;
const { Panel } = Collapse;

const templates = [
  upsellTempImage1,
  upsellTempImage2
];

const TemplateThumbnail = ({
  image,
  order,
  className,
  onClick,
  activeTemplate,
  onSelect,
  ...props
}) => {
  const templateName = `temp${order}`;
  const isActive = activeTemplate === templateName;

  return (
    <div
      onClick={onSelect(templateName)}
      className={`template-thumbnail-element box-shadow small ${isActive ? 'active' : ''} ${className}`}
      role='button'
    >
      <img src={image} alt='template thumbnail' className='template-thumbnail-image' />
    </div>
  );
};


const Appearance = ({
  product: {
    pagePreferences: {
      template,
      themeColor,
      backgroundColor,
      productBackgroundColor
    } = {}
  } = {},
  ...props
}) => {
  const onColorChange = (name) => ({ hex: value }) => {
    props.onChange({
      target: {
        name,
        value
      }
    });
  };
  const onTemplateChange = (value) => () => {
    props.toggleTemplateChangeEffect();
    props.onChange({
      target: {
        name: 'pagePreferences.template',
        value
      }
    });
  };


  return (
    <MenuItem>
      <MenuTitle>Appearance</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1', '2', '3', '4']}>
          <Panel header='Templates' key='1'>
            <MenuFlexContent>
              {templates.map((image, id) => (
                <TemplateThumbnail
                  key={image}
                  image={image}
                  activeTemplate={template}
                  className={id === 1 ? 'vertical-oriented' : ''}
                  order={id + 1}
                  onSelect={onTemplateChange}
                />
              ))}
            </MenuFlexContent>
          </Panel>
          <Panel header='Theme Color' key='2'>
            <TwitterPicker
              className='template-color-picker'
              color={themeColor}
              onChange={onColorChange('pagePreferences.themeColor')}
            />
          </Panel>
          <Panel header='Upsell Background Color' key='3'>
            <TwitterPicker
              className='template-color-picker'
              color={productBackgroundColor}
              onChange={onColorChange('pagePreferences.productBackgroundColor')}
            />
          </Panel>
          <Panel header='Page Background Color' key='4'>
            <TwitterPicker
              className='template-color-picker'
              color={backgroundColor}
              onChange={onColorChange('pagePreferences.backgroundColor')}
            />
          </Panel>
        </Collapse>
      </MenuContent>
    </MenuItem>
  );
};

Appearance.propTypes = {
  product: PropTypes.objectOf({}),
  onChange: PropTypes.func.isRequired,
};

Appearance.defaultProps = {
  product: {}
};

export default Appearance;
