import React from 'react';
import moment from 'moment';
import './style.css';
import currencies from '../../../../../../../../../../data/currencies.json';

const getCurrencySymbol = (code) => {
  const currency = currencies.find((c) => c.code === code);

  return currency ? currency.symbol : code;
};

const OrderRow = ({ label, value, className = '' }) => (
  <div className={`order-recept-row ${className}`}>
    <span className='product-name'>{label}</span>
    <span className='product-price'>{value}</span>
  </div>
);
const OrderRecept = ({
  details: {
    purchases = [],
    date,
    currency = 'USD',
    discount: { couponData: coupon = {}, discount = 0 } = {}
  } = {}
}) => {

  let total = purchases.reduce((t, p) => t + p.amount, 0);


  total = total < discount ? 0 : total - discount;
  total = Math.round(total * 100) / 100;
  const currencySymbol = getCurrencySymbol(currency);
  const couponLabel = `Coupon discount ${coupon.type === 'Flat' ? `(${currencySymbol}${coupon.amount})` : `(${coupon.percent}%)`}`;
  return (
    <div className='order-recept-container'>
      <div className='order-recept-table'>
        <div className='order-recept-header'>
          <span className='order-recept-header-text'>
                        Your Order Recept Summary
          </span>
          <span>
            {moment(date).format('MMM DD YYYY')}
          </span>
        </div>
        {purchases.map(({ name, amount }, id) => (
          <OrderRow
            key={id.toString() + name}
            label={name}
            value={`${currencySymbol} ${amount}`}
          />
        ))}
        {coupon.type && (
          <OrderRow
            label={couponLabel}
            value={`- ${currencySymbol} ${Math.round(discount * 100) / 100}`}
          />
        )}
        <OrderRow
          label='Total Amount Paid'
          value={`${currencySymbol} ${total}`}
          className='total-row'
        />
      </div>
    </div>
  );
};

OrderRecept.propTypes = {};

export default OrderRecept;
