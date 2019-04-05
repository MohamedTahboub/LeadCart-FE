import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';
import TemplatePreview from 'components/Templates';
import tempImage1 from 'assets/images/checkout_templates/temp_1.png';
import tempImage2 from 'assets/images/checkout_templates/temp_2.png';
import tempImage3 from 'assets/images/checkout_templates/temp_3.png';
import tempImage4 from 'assets/images/checkout_templates/temp_4.png';
import tempImage5 from 'assets/images/checkout_templates/temp_5.png';
import tempImage6 from 'assets/images/checkout_templates/temp_6.png';

import common from 'components/common';
import './style.css';


const { Title } = common;

const HeaderOptions = ({
  product: {
    checkoutPage: {
      template = 'temp1',
      presetColors: color
    } = {}
  } = {},
  ...props
}) => {
  const [scrollPosition, setScrollPosition] = useState(0)

  const onColorChange = ({ hex: value }) => {
    props.onChange({
      target: {
        name: 'checkoutPage.presetColors',
        value
      }
    });
  }
  const onSelectTemplate = (template) => {
    props.onChange({
      target: {
        name: 'checkoutPage.template',
        value: template
      }
    });
  };

  const onScroll = (e) =>{
    console.log(e)
  }
  const isActive = (temp) => template === temp
  return (
    <div onScroll={onScroll} className="template-header-options">
      <Title>Checkout Template:</Title>
      <form className='products-details-form inputs-grounp section-block flex-row-wrap checkout-pages-designs'>
        <TemplatePreview name='temp1' active={isActive('temp1')} image={tempImage1} onSelect={onSelectTemplate} />
        <TemplatePreview name='temp2' active={isActive('temp2')} image={tempImage2} onSelect={onSelectTemplate} />
        <TemplatePreview name='temp3' active={isActive('temp3')} image={tempImage3} onSelect={onSelectTemplate} />
        <TemplatePreview name='temp4' active={isActive('temp4')} image={tempImage4} onSelect={onSelectTemplate} />
        <TemplatePreview name='temp5' active={isActive('temp5')} image={tempImage5} onSelect={onSelectTemplate} />
        <TemplatePreview name='temp6' active={isActive('temp6')} image={tempImage6} onSelect={onSelectTemplate} />
      </form>
      <Title>Theme Color:</Title>
      <TwitterPicker className='template-color-picker' color={color} onChange={onColorChange} />
      <Title>Other options:</Title>
      <span>
        to edit the company name ,logo and support email go to the marketplace setting in the setting page and edit them from there
      </span>
    </div>
  )
}

export default HeaderOptions;