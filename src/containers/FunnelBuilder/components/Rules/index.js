import React from 'react';
import PropTypes from 'prop-types';
import sampleRules from 'data/sampleRules';
import common from 'components/common';
import { connect } from 'react-redux';
import { mapListToObject } from 'libs';
import { RuleCard } from './components';

import './style.css'

const {
  FlexBox
} = common;
const Rules = ({ rules, productsMap, ...props }) => (
  <FlexBox column center='v-center' className='full-width padding-v-20 rules-container'>
    {rules.map((rule) => (
      <RuleCard
        key={rule.trigger}
        {...rule}
        productsMap={productsMap}
      />
    ))}
  </FlexBox>
);

Rules.propTypes = {

};
Rules.defaultProps = {
  rules: sampleRules,
  productsMap: {}
};

const propifyState = ({ products: { products = [] } = {} }) => ({ productsMap: mapListToObject(products, '_id') });

export default connect(propifyState)(Rules);
