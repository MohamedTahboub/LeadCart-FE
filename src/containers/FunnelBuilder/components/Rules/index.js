import React, { useState } from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import { mapListToObject, notification } from 'libs';
import { IoIosAdd } from 'react-icons/io';
import * as funnelRulesActions from 'actions/funnels';
import {
  RuleCard,
  RuleModal
} from './components';

import './style.css';

const { FlexBox } = common;
const Rules = ({
  rules,
  productsMap,
  funnelId,
  funnelProducts,
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

  const onRuleDelete = (rule) => () => {
    props.deleteFunnelRule({
      funnel: funnelId,
      ruleId: rule._id
    }, {
      onSuccess: () => {
        notification.success('Deleted Successfully');
      },
      onFailed: (message) => {
        notification.failed(message);
      }
    });
  };

  return (
    <FlexBox column center='v-center' className='full-width padding-v-20 rules-container'>
      {rules.map((rule) => (
        <RuleCard
          key={rule.trigger}
          productsMap={productsMap}
          onEdit={onRuleEdit(rule)}
          onDelete={onRuleDelete(rule)}
          {...rule}
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

Rules.propTypes = {};
Rules.defaultProps = {
  rules: [],
  productsMap: {}
};

const propifyState = ({ products: { products = [] } = {} }) => ({ productsMap: mapListToObject(products, '_id') });

export default connect(propifyState, funnelRulesActions)(Rules);
