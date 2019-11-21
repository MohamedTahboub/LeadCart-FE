import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';


import tempImage1 from 'assets/images/checkout_templates/temp_1.png';
import tempImage2 from 'assets/images/checkout_templates/temp_2.png';
import tempImage3 from 'assets/images/checkout_templates/temp_3.png';
import tempImage4 from 'assets/images/checkout_templates/temp_4.png';
import tempImage5 from 'assets/images/checkout_templates/temp_5.png';
import tempImage6 from 'assets/images/checkout_templates/temp_6.png';

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
  tempImage1,
  tempImage2,
  tempImage3,
  tempImage4,
  tempImage5,
  tempImage6
];

const TemplateThumbnail = ({
  image,
  order,
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
      className={`template-thumbnail-element box-shadow small ${isActive ? 'active' : ''}`}
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
      themeColor = '#4da1ff',
      backgroundColor = '#eee'
    } = {}
  } = {},
  ...props
}) => {
  const onColorChange = (name) => (color = {}) => {
    props.onChange({
      target: {
        name,
        value: color.hex
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
        <Collapse defaultActiveKey={['1', '2', '3']}>
          <Panel header='Templates' key='1'>
            <MenuFlexContent>
              {templates.map((image, id) => (
                <TemplateThumbnail
                  key={id}
                  image={image}
                  activeTemplate={template}
                  order={id + 1}
                  onSelect={onTemplateChange}
                />
              ))}
            </MenuFlexContent>
          </Panel>
          <Panel header='Theme Color' key='2'>
            <TwitterPicker
              className='template-color-picker'
              // color={themeColor}
              name='pagePreferences.themeColor'
              onChange={onColorChange('pagePreferences.themeColor')}
            />
          </Panel>
          <Panel header='Page Background Color' key='3'>
            <TwitterPicker
              className='template-color-picker'
              // color={backgroundColor}
              name='pagePreferences.backgroundColor'
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
  toggleTemplateChangeEffect: PropTypes.func.isRequired,
};

Appearance.defaultProps = {
  product: {}
};

export default Appearance;
