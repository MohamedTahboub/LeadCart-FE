import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import common from 'components/common';

import {
  MenuItem, MenuTitle, MenuContent, MenuFlexContent
} from '../MenuElements';

import './style.css';

const { FulfillmentRowCard } = common;

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
        <div className='sub-menu-title padding-10'>
          Fulfillments List:
        </div>
        {!fulfillments.length && (
          <div className='message-note'>
            No Fulfillments Available
          </div>
        )}
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
