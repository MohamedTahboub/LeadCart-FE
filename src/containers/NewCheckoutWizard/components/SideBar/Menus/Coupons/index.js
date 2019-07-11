import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import * as couponActions from 'actions/coupon';

import { connect } from 'react-redux';


import './style.css';
import {
  MenuItem,
  MenuTitle,
  MenuContent,
  MenuFlexContent
} from '../MenuElements';

const {
  CouponRowCard
} = common;

const Coupons = ({
  coupons,
  changeCouponState,
  product = {}
}) => {
  const filteredCoupons = coupons.filter(({ products }) => products.includes(product._id));

  return (
    <MenuItem>
      <MenuTitle>Coupons</MenuTitle>
      <MenuContent>
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
