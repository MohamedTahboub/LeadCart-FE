import React, { Component } from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import common from 'components/common';
import * as productsActions from 'actions/products';
import * as couponsActions from 'actions/coupon';
import Tabel from 'components/common/Tabels';
const {
  InputRow, FlexBoxesContainer, Button, MainTitle, SmallButton
} = common;

const getProductNameByCouponId = (id, products) => {
  const isItCouponRelated = (coupons) => coupons.find((c) => c === id);
  const product = products.find(({ coupons }) => isItCouponRelated(coupons)) || {};
  console.log(product);
  const productName = product.name || 'unrecognizable';
  return productName;
};

const AddNewButton = ({ onClick, ...props }) => (
  <Button onClick={onClick} classes='primary-color medium-add-btn explort-csv-btn'>
    <i className='fas fa-plus' />
    {' '}
    Add new
  </Button>
);

class Coupons extends Component {
  state = {
    isModalVisable: false, products: [], forAll: true, enableCoupons: true, type: 'Flat', submited: false
  }

  products = []

  toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

  onEnable = () => this.setState({ enableCoupons: !this.state.enableCoupons })


  onChangeTarget = ({ target: { value, name } }) => {
    if (value === 'All products') {
      this.setState({ forAll: true });
    } else {
      this.setState({
        forAll: false,
        productId: this.products.filter(({ name }) => name === value)[0].id
      });
    }
  }

  onTypeSelect = (i) => {
    this.setState({
      type: i
    });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.products !== prevProps.products) {
      this.products = this.props.products;
      this.setState({
        products: this.props.products.map((product) => ({
          id: product._id, name: product.name
        })).unshift({ id: 'all', name: 'All products' })
      });
    }
    if (this.props.created && (this.props.coupons.length > prevProps.coupons.length)) {
      this.setState({ isModalVisable: false });
      this.props.resetCouponModale();
    }
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
    this.setState({ submited: true });
    this.props.createNewCoupon(coupon);
  }

  getProductNameByCouponId = (id) => {
    const isItCouponRelated = (coupons) => coupons.find((c) => c === id);
    const product = this.products.find(({ coupons }) => isItCouponRelated(coupons)) || {};
    console.log(product);
    const productName = product.name || 'unrecognizable';
    return productName;
  };

  render () {
    const {
      state: {
        enableCoupons, products, isModalVisable, type
      }, props: { errors, coupons }
    } = this;
    return (
      <div className='coupons-page'>
        <FlexBoxesContainer className='space-between-elements'>
          <MainTitle>Create New Coupon</MainTitle>
          <Button onClick={this.toggleModal} classes=' primary-color'>
            New Coupon
          </Button>
        </FlexBoxesContainer>
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
            {coupons
              .map(({
                _id: couponId,
                code,
                discount = {},
                active,
                createdAt,
                forAll,
                usedBy
              }) => (
                <Tabel.Row key={code}>
                  <Tabel.Cell mainContent={code} />
                  <Tabel.Cell mainContent={discount.type} />
                  <Tabel.Cell mainContent={discount.type !== 'Percent' ? `${discount.amount}$` : `${discount.percent}%`} />
                  <Tabel.Cell mainContent={forAll === true ? 'All Products' : this.getProductNameByCouponId(couponId, products)} />
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
        <Modal onClose={this.toggleModal} isVisible={isModalVisable}>
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
            />
            <InputRow.PriceField
              type={type === 'Flat' ? '$' : '%'}
              name={type === 'Flat' ? 'amount' : 'percent'}
              onChange={this.onFieldChange}
              note='How much off is your coupon.'
              className='margin-left-30'
            />
          </InputRow>
          <InputRow margin='35'>
            <InputRow.Label>Apply to</InputRow.Label>
            <InputRow.SearchInput data={this.products} target='name' name='appiedTo' onChange={this.onChangeTarget} />
          </InputRow>
          {errors.message && <span className='error-message'>{errors.message}</span>}
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

const mapStateToProps = ({ coupons: { created, coupons = [], errors }, products }) => ({
  created,
  coupons,
  errors,
  products: products.products
});
export default connect(mapStateToProps, { ...couponsActions, ...productsActions })(Coupons);

