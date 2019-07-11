import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import common from 'components/common';

import {
  MenuItem, MenuTitle, MenuContent, MenuFlexContent
} from '../MenuElements';

import './style.css';

const { Avatar } = common;

const FulfillmentRowCard = ({
  _id: id,
  activeFulfillment,
  name,
  onSelect,
  type
}) => (
  <div
    onClick={onSelect(id)}
    className={`sidebar-fulfillment-card ${activeFulfillment === id ? 'active' : ''}`}
  >
    <Avatar name={name} className='sidebar-profile-avatar' />
    <div className='sidebar-fulfillment-card-details'>
      <div className='sidebar-fulfillment-card-name'>{name}</div>
      <div className='sidebar-fulfillment-card-type'>{type}</div>
    </div>
  </div>
);
const Fulfillments = ({
  product: { fulfillment } = {},
  fulfillments,
  ...props
}) => {
  const onSelect = (id) => () => {
    props.onChange({
      target: {
        name: 'fulfillment',
        value: id
      }
    });
  };
  return (
    <MenuItem>
      <MenuTitle>Fulfillments</MenuTitle>
      <MenuContent>
        {fulfillments.map((ful) => (
          <FulfillmentRowCard
            key={ful._id}
            activeFulfillment={fulfillment}
            onSelect={onSelect}
            {...ful}
          />
        ))}
      </MenuContent>
    </MenuItem>
  );
};

Fulfillments.propTypes = {
  fulfillments: PropTypes.arrayOf(PropTypes.objectOf({})),
  onChange: PropTypes.func.isRequired,
  product: PropTypes.objectOf({}),
};
Fulfillments.defaultProps = {
  product: {},
  fulfillments: []
};


const mapStateToProps = ({ fulfillments: { list: fulfillments = [] } = {} }) => ({ fulfillments });
export default connect(mapStateToProps)(Fulfillments);
