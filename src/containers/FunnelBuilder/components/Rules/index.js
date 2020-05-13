import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import sampleRules from 'data/sampleRules';
import common from 'components/common';
import { connect } from 'react-redux';
import { mapListToObject } from 'libs';
import { IoIosAdd } from 'react-icons/io';
import ReactToolTip from 'react-tooltip';

import {
  RuleCard,
  RuleModal
} from './components';

import './style.css';

const { FlexBox } = common;
const Rules = ({
  rules,
  productsMap,
  // openRuleModal,
  // onToggleRuleModal,
  funnelId,
  funnelProducts,
  // products,
  ...props
}) => {
  const [openRuleModal, setOpenRuleModal] = useState(false);
  const [activeRule, setActiveRule] = useState();

  const onToggleRuleModal = () => {
    setOpenRuleModal((open) => {
      if (activeRule && open) setActiveRule();

      return !open;
    });
  };
  const onRuleEdit = (rule) => () => {
    setActiveRule(rule);
    onToggleRuleModal();
  };

  const onRuleDelete = (rule) => {
    console.log('delete Rule', rule);
  };
  return (
    <FlexBox column center='v-center' className='full-width padding-v-20 rules-container'>
      {rules.map((rule) => (
        <RuleCard
          key={rule.trigger}
          {...rule}
          productsMap={productsMap}
          onEdit={onRuleEdit(rule)}
          onDelete={onRuleDelete(rule)}
        />
      ))}
      <FlexBox className={rules.length ? 'line-up-10' : ''}>
        <IoIosAdd
          onClick={onToggleRuleModal}
          data-tip='create new rule'
          className='animate gray-text white-bg rounded font-size-20 item-clickable'
        />
      </FlexBox>
      {openRuleModal && (
        <RuleModal
          open={openRuleModal}
          onClose={onToggleRuleModal}
          // products={products}
          productsMap={productsMap}
          funnelProducts={funnelProducts}
          funnelId={funnelId}
          ruleData={activeRule}
          isNew={!activeRule}
        />
      )}
    </FlexBox>
  );
};

// <ReactToolTip delayShow='400' />
Rules.propTypes = {};
Rules.defaultProps = {
  rules: [],
  productsMap: {}
};

const propifyState = ({ products: { products = [] } = {} }) => ({
  productsMap: mapListToObject(products, '_id')
  // products
});

export default connect(propifyState)(Rules);
