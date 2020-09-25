import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import * as couponsActions from 'actions/coupon';
import Table from 'components/common/Tables';
import moment from 'moment';
import { getCurrencySymbol, mapListToObject } from 'libs';

import { ProductsNamesList } from './common';

const { SmallButton, MiniButton } = common;
const { Body, Cell, Row } = Table;

const CouponsList = ({
  coupons,
  showEditModal,
  deleteModal,
  productsMap: productsNamesMap,
  changeCouponState,
  currency
}) => {

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

          const productsNames = products
            .map((ele) => productsNamesMap[ele])
            .filter(Boolean)
            .map((product) => product.name);

          return (
            <Row key={code} orderInList={orderInList} className='coupon-table-row'>
              <Cell mainContent={code} />
              <Cell mainContent={discount.type} />
              <Cell mainContent={discount.type !== 'Percent' ? `${getCurrencySymbol(currency)}${discount.amount}` : `${discount.percent}%`} />

              <Cell
                mainContent={(
                  <ProductsNamesList
                    names={productsNames}
                  />)
                }
                nowrap
              />
              <Cell mainContent={moment(duration).format('YYYY-MM-DD')} />

              <Cell>
                <SmallButton
                  onClick={() => changeCouponState({ couponId, active: !active })}
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
  coupons: { coupons = [] },
  products: { products = [] } = {}
}) => {
  const projection = { name: 'name', image: 'thumbnail', _id: '_id' };
  return {
    coupons,
    productsMap: mapListToObject(products, '_id', projection)
  };
};

export default connect(mapStateToProps, { ...couponsActions })(CouponsList);

