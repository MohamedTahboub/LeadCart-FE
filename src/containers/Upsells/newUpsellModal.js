import React, { Component } from 'react';
import { connect } from 'react-redux';
import Testimonials from 'components/Testimonials';
import Modal from 'components/Modal';
import common from 'components/common';
import sampleUpsells from 'data/upsells.json';


const {
  InputRow, MainTitle, Button
} = common;
class UpsellForm extends Component {
  state = {
    upsell: {}
  }

  componentDidMount () {
    const { upsell } = this.props;
    this.setState({ upsell });
  }

  componentDidUpdate (preProps) {
    const { upsell } = this.props;
    if (preProps.upsell !== upsell) this.setState({ upsell });
  }

  onFieldChange = ({ target: { name, value }, ...rest }) => {
    const { couponModel } = this.state;
    this.setState({
      ...couponModel,
      [name]: value
    });
  }

  onAssciatedProductChange = (e) => {
    console.log(e);
  }

  onTestimonialsChange = (e) => {
    console.log(e);
  }

  onCreateNewUpsell = () => {
    const { upsell } = this.state;
    console.log(upsell);
  }

  render () {
    const {
      errors = {}, features, name, price
    } = sampleUpsells[0];
    const {
      props: {
        products, show: isVisable, onClose
      }
    } = this;
    console.log(products);
    return (
      <Modal onClose={onClose} isVisable={isVisable}>
        <MainTitle
          bottomLine
        >
Create New Upsell

        </MainTitle>
        <InputRow>
          <InputRow.Label error={errors.name}>Upsell Name:</InputRow.Label>
          <InputRow.NormalInput name='name' value={name} error={errors.name} onChange={this.onFieldChange} />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.name}>Upsell Intro:</InputRow.Label>
          <InputRow.NormalInput name='name' value={name} error={errors.name} onChange={this.onFieldChange} />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.price}>Upsell Price:</InputRow.Label>
          <InputRow.PriceField name='price' value={price} error={errors.price} onChange={this.onFieldChange} />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.price}>Upsell Features:</InputRow.Label>
          <InputRow.SmallInput>Feature title</InputRow.SmallInput>
          <InputRow.SmallInput>Feature Description</InputRow.SmallInput>
          <input type='submit' className='add-input-field' value='Add' />

        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.description}>Associated Product:</InputRow.Label>
          <InputRow.SearchInput
            data={products}
            target='name'
            onChange={this.onAssciatedProductChange}
          />
        </InputRow>
        {errors.message && <span className='error-message'>{errors.message}</span>}
        <Button onClick={this.onClose} classes='primary-color margin-with-float-right'>
          <i className='fas fa-plus' />
          {' '}
          Create
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = ({ products: { products }, upsells: { upsell = {} } }) => ({
  products,
  upsell
});
export default connect(mapStateToProps)(UpsellForm);
