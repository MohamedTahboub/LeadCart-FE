import React, { Component } from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import common from 'components/common';
import * as productsActions from 'actions/products';
import * as couponsActions from 'actions/coupon';
import Tabel from 'components/common/Tabels';
const {
  InputRow, MainBlock, Button, MainTitle, SmallButton
} = common;

const getProductNameByCouponId = (id) => 'PRODUCT X';
class Coupons extends Component {
  state = {
    isModalVisable: false, forAll: true, enableCoupons: true, type: 'Flat'
  }

  products = []

  toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

  onEnable = () => this.setState({ enableCoupons: !this.state.enableCoupons })


  onChangeTarget = ({ target: { value, name } }) => {
    console.log(name, value);
    if (value === 'All products') {
      this.setState({ forAll: true });
    } else {
      this.setState({
        forAll: false,
        productId: this.products.filter(({ name }) => name === value)[0].id
      });
    }
    setTimeout(() => {
      console.log(this.state);
    }, 200);
  }

  onTypeSelect = (i) => {
    this.setState({
      type: i
    });
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

  onFieldChange = ({ target: { name, value }, ...rest }) => {
    const { couponModel } = this.state;
    this.setState({
      ...couponModel,
      [name]: value
    });
  }

  onDateChange = (date) => {
    const { couponModel } = this.state;
    this.setState({
      ...couponModel,
      duration: date.unix()
    });
  }

  onSubmit = () => {
    const {
      code, duration, forAll, amount, percent, productId, type
    } = this.state;
    const coupon = {
      code, duration, forAll, type
    };
    if (type === 'Flat') coupon.amount = amount;
    if (type === 'Percent') coupon.percent = percent;
    if (!forAll) coupon.productId = productId;
    this.props.createNewCoupon(coupon);
  }

  render () {
    const { enableCoupons, isModalVisable, type } = this.state;
    return (
      <div className='coupons-page'>
        <MainBlock title='Coupons'>
          <InputRow>
            <InputRow.Label>Allow Coupons</InputRow.Label>
            <InputRow.SwitchInput onToggle={this.onEnable} value={enableCoupons} />
          </InputRow>
          {enableCoupons && (
            <InputRow>
              <InputRow.Label>Configure Coupons</InputRow.Label>
              <InputRow.AddComponentField onClick={this.toggleModal} type='click'>Add coupon</InputRow.AddComponentField>
            </InputRow>
          )}
        </MainBlock>
        <Tabel>
          <Tabel.Head>
            <Tabel.HeadCell>Code</Tabel.HeadCell>
            <Tabel.HeadCell>Type</Tabel.HeadCell>
            <Tabel.HeadCell>Amount/Percent</Tabel.HeadCell>
            <Tabel.HeadCell>Target Product</Tabel.HeadCell>
            <Tabel.HeadCell>Created Date</Tabel.HeadCell>
            <Tabel.HeadCell>Status</Tabel.HeadCell>
          </Tabel.Head>
          <Tabel.Body>
            {this.props.coupons
              .map(({
                _id: couponId,
                code,
                discount = {},
                active,
                createdAt,
                forAll,
                usedBy
              }) => (
                <Tabel.Row key={couponId}>
                  <Tabel.Cell mainContent={code} />
                  <Tabel.Cell mainContent={discount.type} />
                  <Tabel.Cell mainContent={discount.type !== 'Percent' ? `${discount.amount}$` : `${discount.percent}%`} />
                  <Tabel.Cell mainContent={forAll === true ? 'All Products' : getProductNameByCouponId(couponId)} />
                  <Tabel.Cell mainContent={createdAt.split('T')[0]} />
                  <Tabel.Cell>
                    {active
                      ? <SmallButton onClick={this.props.changeCouponState.bind(this, { couponId, active: !active })} classes='green-color'>Active</SmallButton>
                      : <SmallButton onClick={this.props.changeCouponState.bind(this, { couponId, active: !active })} classes='gray-color'>Inactive</SmallButton>
                    }
                  </Tabel.Cell>
                </Tabel.Row>
              ))}

          </Tabel.Body>
        </Tabel>
        <Modal onClose={this.toggleModal} isVisable={isModalVisable}>
          <MainTitle>Create Coupon</MainTitle>
          <InputRow>
            <InputRow.Label>Coupon code</InputRow.Label>
            <InputRow.CustomInput name='code' placeholder='Coupon Code.' onChange={this.onFieldChange} />
            <InputRow.DatePicker
              name='duration'
              type='date'
              disabledDate={(date) => date < (Date.now() - (24 * 60 * 60 * 1000))}
              placeholder='Active Duration' className='margin-left-30' onChange={this.onDateChange}
            />
          </InputRow>
          <InputRow>
            <InputRow.Label>Coupon Type</InputRow.Label>
            <InputRow.FlatSelect
              onSelect={this.onTypeSelect}
              value={type}
              note='Is this percent or flat amount off?'
            />
            <InputRow.PriceField
              type={type === 'Flat' ? '$' : '%'}
              name={type === 'Flat' ? 'amount' : 'percent'}
              onChange={this.onFieldChange}
              note='How much off is your coupon.' classes={['margin-left-30']}
            />
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
    );
  }
}

const mapStateToProps = ({ coupons: { coupons = [] }, products }) => ({
  coupons,
  products: products.products
});
export default connect(mapStateToProps, { ...couponsActions, ...productsActions })(Coupons);

