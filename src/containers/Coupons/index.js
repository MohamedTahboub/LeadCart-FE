import React, { Component } from 'react';
import { Modal } from 'components/Modals';
import { connect } from 'react-redux';
import common from 'components/common';
import * as productsActions from 'actions/products';
import * as couponsActions from 'actions/coupon';
import Tabel from 'components/common/Tabels';
import './style.css'
const {
  InputRow,
  Button,
  MainTitle,
  SmallButton,
  Page,
  PageHeader,
  PageContent
} = common;


const getProductNameByCouponId = (id, products) => {
  const isItCouponRelated = (coupons) => coupons.find((c) => c === id);
  const product = products.find(({ coupons }) => isItCouponRelated(coupons)) || {};
  console.log(product);
  const productName = product.name || 'unrecognizable';
  return productName;
};

const AddNewButton = ({ onClick, ...props }) => (
  <Button onClick={onClick} className='primary-color medium-add-btn explort-csv-btn'>
    <i className='fas fa-plus' />
    {' '}
    Add new
  </Button>
);

class Coupons extends Component {
  state = {
    isModalVisable: false,
    products: [],
    forAll: true,
    enableCoupons: true,
    type: 'Flat',
    couponValue: 0,
    submited: false
  }

  products = []

  toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

  onEnable = () => this.setState({ enableCoupons: !this.state.enableCoupons })


  onChangeTarget = ({ target: { value } }) => {
    if (value === 'all') {
      this.setState({ forAll: true });
    } else {
      this.setState({
        forAll: false,
        productId: value
      });
    }
  }

  onTypeSelect = (type) => {
    this.setState({ type });
  }

  componentDidUpdate = (prevProps) => {
    if (this.props.products !== prevProps.products) {
      this.products = this.props.products;
      const products = this.props.products.map((product) => ({
        value: product._id, label: product.name
      }));
      products.unshift({ value: 'all', label: 'All products' });
      this.setState({
        products
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
      code, duration, forAll, couponValue, percent, productId, type
    } = this.state;
    const coupon = {
      code, duration, forAll, type
    };
    if (type === 'Flat') coupon.amount = couponValue;
    if (type === 'Percent') coupon.percent = couponValue;
    if (!forAll) coupon.productId = productId;
    this.setState({ submited: true });
    this.props.createNewCoupon(coupon);
  }

  getProductNameByCouponId = (id) => {
    const product = this.props.products.find(({ coupons: { list: coupons } = {} }) => coupons.find(({ _id }) => _id === id)) || {};
    return product.name || 'not set';
  };

  render() {
    const {
      state: {
        enableCoupons, products, isModalVisable, type
      },
      props: { errors, coupons, changeCouponState }
    } = this;
    return (
      <Page className='coupons-page'>
        <PageHeader>
          <MainTitle>Coupons</MainTitle>
          <Button onClick={this.toggleModal} className=' primary-color'>
            New Coupon
          </Button>
        </PageHeader>
        <PageContent>
          <Tabel>
            <Tabel.Head>
              <Tabel.HeadCell>Code</Tabel.HeadCell>
              <Tabel.HeadCell>Type</Tabel.HeadCell>
              <Tabel.HeadCell>Amount/Percent</Tabel.HeadCell>
              <Tabel.HeadCell>Used By Product</Tabel.HeadCell>
              <Tabel.HeadCell>Created Date</Tabel.HeadCell>
              <Tabel.HeadCell>Status</Tabel.HeadCell>
            </Tabel.Head>
            <Tabel.Body>
              {coupons
                .sort((a, b) => ((new Date(a.createdAt) < new Date(b.createdAt)) ? 1 : -1))
                .map(({
                  _id: couponId,
                  code,
                  discount = {},
                  active,
                  createdAt,
                  forAll,
                  usedBy
                }, orderInList) => (
                    <Tabel.Row key={code} orderInList={orderInList}>
                      <Tabel.Cell mainContent={code} />
                      <Tabel.Cell mainContent={discount.type} />
                      <Tabel.Cell mainContent={discount.type !== 'Percent' ? `${discount.amount}$` : `${discount.percent}%`} />
                      <Tabel.Cell mainContent={forAll === true ? 'All Products' : this.getProductNameByCouponId(couponId)} />
                      <Tabel.Cell mainContent={createdAt.split('T')[0]} />
                      <Tabel.Cell>
                        <SmallButton
                          onClick={() => changeCouponState({ couponId, active: !active })}
                          className={active ? 'green-color' : 'gray-color'}
                        >
                          {`${active ? 'Active' : 'Inactive'}`}
                        </SmallButton>
                      </Tabel.Cell>
                    </Tabel.Row>
                  ))}

            </Tabel.Body>
          </Tabel>
        </PageContent>

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
              value={type || 'Flat'}
              defaultValue='Flat'
            />
            <InputRow.PriceField
              type={type === 'Flat' ? '$' : '%'}
              name='couponValue'
              onChange={this.onFieldChange}
              note='How much off is your coupon.'
              className='margin-left-30'
            />
          </InputRow>
          <InputRow margin='35'>
            <InputRow.Label>Apply to</InputRow.Label>
            <InputRow.SearchInput
              options={products}
              defaultValue='all'
              target='name'
              name='appiedTo'
              onChange={this.onChangeTarget}
            />
          </InputRow>
          {errors.message && <span className='error-message'>{errors.message}</span>}
          <Button onClick={this.onSubmit} className='primary-color margin-with-float-right'>
            <i className='fas fa-plus' />
            {' '}
            Create Coupon
          </Button>
        </Modal>
      </Page>
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

