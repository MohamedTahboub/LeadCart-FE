import React from 'react';
import { CirclePicker } from 'react-color';
import TemplatePreview from 'components/Templates';
import common from 'components/common';
import tempImage1 from 'assets/images/checkout_templates/temp_1.jpg';
import tempImage2 from 'assets/images/checkout_templates/temp_2.jpg';
import tempImage3 from 'assets/images/checkout_templates/temp_3.jpg';
import tempImage4 from 'assets/images/checkout_templates/temp_4.jpg';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import './style.css';

const { MainBlock, FlexBoxesContainer, MainTitle } = common;

class CheckoutTemplates extends React.Component {
  state = { selectedTemplate: 'temp1', templateColor: '#03A9F4' }

  onSelectTemplate = (template) => {
    this.setState({ selectedTemplate: template });
    this.props.onCheckoutPageFieldChange({
      name: 'template',
      value: template
    });
  };

  componentDidMount () {
    const { template: selectedTemplate, presetColors: templateColor } = this.props.checkoutPage;
    this.setState({
      selectedTemplate,
      templateColor
    });
  }

  onColorChange = ({ hex: color }) => {
    this.setState({
      templateColor: color
    });
    this.props.onCheckoutPageFieldChange({
      name: 'presetColors',
      value: color
    });
  }

  isActive = (template) => this.state.selectedTemplate === template

  render () {
    return (
      <MainBlock>
        <MainTitle>Picke your Template Design</MainTitle>
        <form className='products-details-form inputs-grounp section-block flex-row-wrap checkout-pages-designs'>
          <TemplatePreview name='temp1' active={this.isActive('temp1')} image={tempImage1} onSelect={this.onSelectTemplate} />
          <TemplatePreview name='temp2' active={this.isActive('temp2')} image={tempImage2} onSelect={this.onSelectTemplate} />
          <TemplatePreview name='temp3' active={this.isActive('temp3')} image={tempImage3} onSelect={this.onSelectTemplate} />
          <TemplatePreview name='temp4' active={this.isActive('temp4')} image={tempImage4} onSelect={this.onSelectTemplate} />
        </form>
        <MainTitle className='margin-top-20'>Checkout Template Theme Color</MainTitle>
        <FlexBoxesContainer classes={['template-color-picker-container']}>
          <CirclePicker color={this.state.templateColor} onChange={this.onColorChange} />
          <div style={{ background: this.state.templateColor }} className='template-selected-color-simulation' />
        </FlexBoxesContainer>
      </MainBlock>
    );
  }
}

const mapStateToProps = ({ product: { checkoutPage } }) => ({ checkoutPage });
export default connect(mapStateToProps, producActions)(CheckoutTemplates);
