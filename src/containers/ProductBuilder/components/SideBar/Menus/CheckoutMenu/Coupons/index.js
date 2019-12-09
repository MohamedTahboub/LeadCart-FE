import React from 'react';
import common from 'components/common';
import * as couponActions from 'actions/coupon';

import { connect } from 'react-redux';


import './style.css';
import {
  MenuItem,
  MenuTitle,
  MenuContent,
} from '../MenuElements';

const {
  CouponRowCard,
  InputRow
} = common;

const Coupons = ({
  onChange,
  coupons = [],
  changeCouponState,
  product: {
    coupons: productCoupon = {},
    ...product
  } = {}
}) => {
  const filteredCoupons = coupons.filter(({ products, forAll }) => {
    if (forAll) return true;
    return products.includes(product._id);
  });
  const onToggleCoupons = () => {
    onChange({
      target: {
        name: 'coupons',
        value: { enabled: !productCoupon.enabled }
      }
    });
  };


  return (
    <MenuItem>
      <MenuTitle>Coupons</MenuTitle>
      <MenuContent>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Show:</InputRow.Label>
          <InputRow.SwitchInput
            value={productCoupon.enabled}
            onToggle={onToggleCoupons}
            className='sidebar-switch-input'
          />
        </InputRow>
        <div className='sub-menu-title padding-left-10'>
          Coupons List:
        </div>
        {!filteredCoupons.length && (
          <div className='message-note'>
            No Coupons Available
          </div>
        )}
        {filteredCoupons.map((coupon) => (
          <CouponRowCard
            {...coupon}
            onToggleStatus={changeCouponState}
          />

        ))}
      </MenuContent>
    </MenuItem>
  );
};

Coupons.propTypes = {

};

const mapStateToProps = ({ coupons: { coupons = [] } = {} }) => ({
  coupons
});
export default connect(mapStateToProps, couponActions)(Coupons);
