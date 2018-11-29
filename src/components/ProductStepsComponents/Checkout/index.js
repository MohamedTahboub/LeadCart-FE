import React from 'react';
import TemplatePreview from 'components/Templates';
import common from 'components/common';
import tempImage1 from 'assets/images/checkout_templates/temp_1.jpg';
import tempImage2 from 'assets/images/checkout_templates/temp_2.jpg';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { MainBlock } = common;

class CheckoutTemplates extends React.Component {
    state = { defaultTemplate: false }

    toggleTemplates = () => {
      const { defaultTemplate } = this.state;
      this.setState({ defaultTemplate: !defaultTemplate });
      this.props.onProductCheckoutFieldChange({
        name: 'template',
        value: !defaultTemplate ? 'x' : 'y'
      });
    };

    render () {
      return (
        <MainBlock>
          <form className='products-details-form inputs-grounp section-block flex-row-wrap checkout-pages-designs'>
            <TemplatePreview active image={tempImage1} name='Classic' onSelect={this.toggleTemplates} />
            <TemplatePreview active={false} image={tempImage2} onSelect={this.toggleTemplates} />
            <TemplatePreview active={false} image={tempImage2} onSelect={this.toggleTemplates} />
          </form>
        </MainBlock>
      );
    }
}

const mapStateToProps = ({ product }) => ({ product });
export default connect(mapStateToProps, producActions)(CheckoutTemplates);
