import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow } = common;


class ProductFeatures extends Component {
    state = {
      testimonials: {
        text: '',
        value: '',
        value: []
      }
    }

    onFieldChange = ({ target: { name, value } }) => {
      this.props.onProductCheckoutFieldChange({ name, value });
    }

  onBulletPointsChange = (points) => {
    this.props.onProductCheckoutFieldChange({ name: 'bulletPoints', value: points.map(({ value }) => value) });
  };

  render () {
    const { bulletPoints, bulletPointsTitle } = this.props.checkout;
    return (
      <Fragment>
        <InputRow>
          <InputRow.Label>Features Title</InputRow.Label>
          <InputRow.SmallInput name='bulletPointsTitle' value={bulletPointsTitle} onChange={this.onFieldChange}></InputRow.SmallInput>
        </InputRow>
        <InputRow>
          <InputRow.Label>Features</InputRow.Label>
          <InputRow.AddComponentField type='tags' onTagsChange={this.onBulletPointsChange} placeholder='Create a Feature' value={bulletPoints}>Add Feature</InputRow.AddComponentField>
        </InputRow>
      </Fragment>
    );
  }
}


const mapStateToProps = ({ product: { checkout } }) => ({ checkout });
export default connect(mapStateToProps, producActions)(ProductFeatures);
