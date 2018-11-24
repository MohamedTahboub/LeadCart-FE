import React, { Component } from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import common from 'components/common';
import * as productsActions from 'actions/products';
const {
  InputRow, MainBlock, Button, MainTitle
} = common;

class Coupons extends Component {
  state = { isModalVisable: false, enableCoupons: true , type : 'falt' }

  products = []

  toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

  onEnable = () => this.setState({ enableCoupons: !this.state.enableCoupons })


  onChangeTarget = ({ target: { value, name } }) => {
    if (value === 'All products') this.setState({ forAll: true });
    else this.setState({
       forAll: false,
       productId: this.products.filter(({ name }) => name === value)[0].id 
    });
    setTimeout(() => {
      console.log(this.state);
    }, 200);
  }

  onTypeSelect = (i) => {
     this.setState({
      type : i
    })
  }

  componentDidUpdate = () => {
    const products = this.props.products.map((product) => ({
      id: product._id, name: product.name
    }));
    products.unshift({ id: 'all', name: 'All products' });
    this.products = products;
  }

  componentDidMount = () => {
    this.props.getUserProducts();
  }

  onFieldChange = ({ target: { name, value },...rest }) => {
    const { couponModel } = this.state
    console.log(name , value)
    this.setState({
      ...couponModel,
      [name]: value
    })
  }
  onDateChange = date => {
    const { couponModel } = this.state
      this.setState({
        ...couponModel,
        duration : date.unix()
      })
  }

  onSubmit = () =>{
    console.log(this.state)
  }
  render = () => (
    <div className='coupons-page'>
      <MainBlock title='Coupons'>
        <InputRow>
          <InputRow.Label>Allow Coupons</InputRow.Label>
          <InputRow.SwitchInput onToggle={this.onEnable} value={this.state.enableCoupons} />
        </InputRow>
        {this.state.enableCoupons && (
          <InputRow>
            <InputRow.Label>Configure Coupons</InputRow.Label>
            <InputRow.AddComponentField onClick={this.toggleModal} type='click'>Add coupon</InputRow.AddComponentField>
          </InputRow>
        )}
      </MainBlock>
      <Modal onClose={this.toggleModal} isVisable={this.state.isModalVisable}>
        <MainTitle>Create Coupon</MainTitle>
        <InputRow>
          <InputRow.Label>Coupon code</InputRow.Label>
          <InputRow.CustomInput name='code' placeholder='Coupon Code.' onChange={this.onFieldChange} />
          <InputRow.DatePicker
            name='duration'
            type='date'
            disabledDate={(date) => date <( Date.now() - (24*60*60*1000))}
            placeholder='Active Duration' className='margin-left-30' onChange={this.onDateChange} />
        </InputRow>
        <InputRow>
          <InputRow.Label>Coupon Type</InputRow.Label>
          <InputRow.FlatSelect
           onSelect={this.onTypeSelect} 
           value={this.state.type}
           note='Is this percent or flat amount off?' />
          <InputRow.PriceField note='How much off is your coupon.' classes={['margin-left-30']}></InputRow.PriceField>
        </InputRow>
        <InputRow margin='35'>
          <InputRow.Label>Apply to</InputRow.Label>
          <InputRow.SearchInput data={this.products} target='name' name='appiedTo' onChange={this.onChangeTarget} />
        </InputRow>
        <Button onClick={this.onSubmit} classes='primary-color margin-with-float-right'>
          <i className='fas fa-plus' />
          {' '}
          Create Coupon
        </Button>
      </Modal>
    </div>
  )
}

const mapStateToProps = ({ coupons, products }) => ({
  coupons: coupons.coupons,
  products: products.products
});
export default connect(mapStateToProps, productsActions)(Coupons);

