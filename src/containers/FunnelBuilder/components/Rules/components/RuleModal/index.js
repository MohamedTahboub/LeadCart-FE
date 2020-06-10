import React, { useCallback, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import common from 'components/common';
import Select from 'react-select';
import rulesEvents from 'data/rulesEvents';
import { connect } from 'react-redux';
import * as funnelsActions from 'actions/funnels';
import { notification } from 'libs';
import TriggerGroup from './TriggerGroup';
import TriggerActionMaker from './TriggerActionMaker';

import {
  constructProductsAndOffersLabels,
  getIntersectedProducts,
  getTriggerLabel
} from '../helpers';


const {
  FlexBox,
  MainTitle,
  Button
} = common;


const RuleModal = ({
  isNew,
  ruleData,
  open,
  onClose,
  // products,
  funnelId,
  productsMap,
  funnelProducts,
  ...props
}) => {
  const [fields, setFields] = useState({ triggerGroups: [] });
  const [saving, setSaving] = useState(false);
  const productsOptions = constructProductsAndOffersLabels(productsMap, funnelProducts);

  const onTriggerGroupAdded = (group) => {
    setFields({
      ...fields,
      triggerGroups: [...fields.triggerGroups, group]
    });
  };

  const onTriggerChange = ({ value: trigger }) => {
    setFields({
      ...fields,
      trigger
    });
  };

  const onSubmit = () => {
    setSaving(true);
    if (isNew) {
      props.createFunnelRule({
        rule: fields,
        funnel: funnelId
      }, {
        onSuccess: () => {
          notification.success(`A rule for ${getTriggerLabel(fields.trigger)} event have been created`);
          setSaving(false);
          onClose();
        },
        onFailed: (errMsg) => {
          setSaving(false);
          notification.failed(errMsg);
        }
      });
    } else {
      const { _id: ruleId, ...rule } = fields;
      if (Array.isArray(rule.triggerGroups)) {
        rule.triggerGroups = rule.triggerGroups.map(({ actions, products }) => ({
          products,
          actions
        }));
      }
      props.updateFunnelRule({
        ruleId,
        rule,
        funnel: funnelId
      }, {
        onSuccess: () => {
          notification.success(`A rule for ${getTriggerLabel(fields.trigger)} event have been updated`);
          setSaving(false);
          onClose();
        },
        onFailed: (errMsg) => {
          setSaving(false);
          notification.failed(errMsg);
        }
      });
    }
  };

  useEffect(() => {
    if (!isNew && ruleData) setFields(ruleData);

    return () => {
      setFields({ triggerGroups: [] });
    };
  }, [isNew, open, ruleData]);


  return (
    <Modal
      isVisible={open}
      onClose={onClose}
      className='funnel-rules-modal'
    >
      <MainTitle>
        Build Your Funnel Rule
      </MainTitle>
      <FlexBox center='v-center' flex>
        <div className='label margin-right-10'>When</div>

        <Select
          options={rulesEvents}
          className='flex-item margin-h-10'
          onChange={onTriggerChange}
        />
        <div className='label margin-left-10'>Fired</div>
      </FlexBox>
      <FlexBox
        column
        // flexStart
        className='modal-trigger-groups-list margin-top-10 padding-v-10 padding-h-10 bordered soft-edges lightgray-bg'
      >
        {
          fields.triggerGroups.map((group) => (
            <TriggerGroup
              className='white-bg soft-edges margin-v-5 padding-v-10 padding-h-5'
              key={group.id}
              {...group}
              products={getIntersectedProducts(productsMap, group.products)}
            />
          ))
        }
        <TriggerActionMaker
          hasGroups={!!(fields.triggerGroups && fields.triggerGroups.length)}
          products={productsOptions}
          onAdd={onTriggerGroupAdded}
        />
      </FlexBox>
      <FlexBox flex flexEnd>
        <Button
          onClick={onSubmit}
          className='light-btn'
          onprogress={saving}
          disabled={saving}
        >
          {`${!isNew ? 'Update' : 'Create'} Rule`}
        </Button>
      </FlexBox>
    </Modal>
  );
};

RuleModal.propTypes = {};

export default connect(null, funnelsActions)(RuleModal);