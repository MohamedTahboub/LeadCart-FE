import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import * as couponsActions from 'actions/coupon';
import Table from 'components/common/Tables';
import moment from 'moment';
import './style.css';

const {
  SmallButton,
  MiniButton
} = common;

const {
  Body,
  Cell,
  Row
} = Table;

const CouponsList = ({ coupons, showEditModal, deleteModal, productsNames, ...props }) => {
  return (
    <Body>
      {coupons
        .map((coupon, orderInList) => {
          const {
            _id: couponId,
            code,
            discount = {},
            active,
            products,
            duration
          } = coupon;

          const selectedProducts = products.map((ele) => productsNames[ele]).reverse();
          let content = '';

          if (selectedProducts.length === 1)
            content = selectedProducts.join('');
          else
            content = `${selectedProducts.slice(0, -1).join(', ')} and ${selectedProducts[selectedProducts.length - 1]}`;

          return (
            <Row key={code} orderInList={orderInList} className='coupon-tabel-row'>
              <Cell mainContent={code} />
              <Cell mainContent={discount.type} />
              <Cell mainContent={discount.type !== 'Percent' ? `$${discount.amount}` : `${discount.percent}%`} />

              <Cell
                mainContent={
                  products.length === 0 ? 'All Products'
                    : content
                }
                nowrap='productnowrap'
                cellName='product'
              />
              <Cell mainContent={moment(duration).format('YYYY-MM-DD')} />

              <Cell>
                <SmallButton
                  onClick={() => props.changeCouponState({ couponId, active: !active })}
                  className={active ? 'green-color' : 'gray-bg'}
                >
                  {`${active ? 'Active' : 'Inactive'}`}
                </SmallButton>
              </Cell>

              <MiniButton
                toolTip='Delete'
                className='table-row-delete-btn'
                iconClass='fa-trash-alt'
                onClick={() => deleteModal(couponId)}
              />

              <MiniButton
                toolTip='Edit'
                className='table-row-edit-btn'
                iconClass='fas fa-edit'
                onClick={() => showEditModal(coupon)}
              />
            </Row>
          );
        })}
    </Body>
  );
};


const mapStateToProps = ({
  coupons: {
    coupons = [],
    errors
  },
  products: { products = [] } = {}
}) => ({
  errors,
  coupons,
  productsNames: products.reduce((obj, { _id: id, name }) => {
    obj[id] = name;
    return obj;
  }, {})
});


export default connect(mapStateToProps, { ...couponsActions })(CouponsList);

