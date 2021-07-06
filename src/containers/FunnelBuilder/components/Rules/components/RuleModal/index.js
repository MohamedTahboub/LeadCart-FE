import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import common from 'components/common';
import Select from 'react-select';
import rulesEvents from 'data/rulesEvents';
import { connect } from 'react-redux';
import * as funnelsActions from 'actions/funnels';
import { mapListToObject, notification } from 'libs';
import { funnelRuleSchema } from 'libs/validation';
import TriggerGroup from './TriggerGroup';
import TriggerActionMaker from './TriggerActionMaker';
import { funnelTypes } from 'propTypes';
import {
  constructProductsAndOffersLabels,
  filterProperEvents,
  getAvailablePricingOptionsDetails,
  getIntersectedProducts,
  getTriggerLabel,
  hasWebhook,
  updateWithWebhookDefault
} from '../helpers';


const rulesEventsMap = mapListToObject(rulesEvents, 'value');
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
  funnelId,
  productsMap,
  isOptInFunnel,
  funnelProducts,
  funnel,
  isPaypalConnected,
  isSubscriptionCheckout = false,
  ...props
}) => {
  const [fields, setFields] = useState({ triggerGroups: [] });
  const [saving, setSaving] = useState(false);
  const [editGroupMode, setEitGroupMode] = useState(false);
  const productsOptions = constructProductsAndOffersLabels(productsMap, funnelProducts);

  const onTriggerGroupEdit = (group) => () => {
    setEitGroupMode(group);
  };
  const onUpdateTriggerGroup = (group) => {
    const newTriggerGroups = [...fields.triggerGroups.map((currentGroup) => {
      const groupId = currentGroup._id || currentGroup.id;
      return groupId === (group._id || group.id) ? group : currentGroup;
    })];
    setFields({ ...fields, triggerGroups: newTriggerGroups });
    setEitGroupMode();
  };

  const onDeleteTriggerGroup = (id) => () => {
    const newTriggerGroups = fields.triggerGroups.filter((group) => group._id !== id);
    setFields({ ...fields, triggerGroups: newTriggerGroups });
  };

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
    const { isValid, value, message: errorMessage = 'Please check your rule fields,\ne.g. rule event' } = funnelRuleSchema(fields);
    let ruleValue = value;
    if (!isValid) {
      setSaving(false);
      return notification.failed(errorMessage);
    }


    if (hasWebhook(ruleValue.triggerGroups))
      ruleValue = updateWithWebhookDefault(ruleValue);

    if (isNew) {
      props.createFunnelRule({
        rule: ruleValue,
        funnel: funnelId,
        originalFunnelDetails: funnel
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
      const { _id: ruleId } = fields;
      props.updateFunnelRule({
        ruleId,
        rule: ruleValue,
        funnel: funnelId,
        originalFunnelDetails: funnel
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

  const eventTypes = filterProperEvents(rulesEvents, { isOptInFunnel, isSubscriptionCheckout });

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
          options={eventTypes}
          className='flex-item margin-h-10'
          onChange={onTriggerChange}
          placeholder='Select an event'
          value={rulesEventsMap[fields.trigger]}
        />
        <div className='label margin-left-10'>Fired</div>
      </FlexBox>
      <FlexBox
        column
        className='modal-trigger-groups-list margin-top-10 padding-v-10 padding-h-10 bordered soft-edges lightgray-bg'
      >
        {
          fields.triggerGroups.map((group) => (
            (editGroupMode && editGroupMode._id === group._id) ? (
              <TriggerActionMaker
                key={group._id}
                isEdit
                hasGroups={!!(fields.triggerGroups && fields.triggerGroups.length)}
                products={productsOptions}
                onAdd={onTriggerGroupAdded}
                onUpdate={onUpdateTriggerGroup}
                triggerEvent={fields.trigger}
                isPaypalConnected={isPaypalConnected}
                group={group}
              />
            ) : (
              <TriggerGroup
                className='white-bg soft-edges margin-v-5 padding-v-10 padding-h-5'
                onEdit={onTriggerGroupEdit(group)}
                onDelete={onDeleteTriggerGroup(group._id)}
                key={group._id}
                {...group}
                products={getIntersectedProducts(productsMap, group.products)}
                pricingOptions={getAvailablePricingOptionsDetails(group.pricingOptions, group.products, productsMap)}
              />
            )
          ))
        }
        {!editGroupMode && (
          <TriggerActionMaker
            hasGroups={!!(fields.triggerGroups && fields.triggerGroups.length)}
            products={productsOptions}
            onAdd={onTriggerGroupAdded}
            triggerEvent={fields.trigger}
          />)}
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

RuleModal.propTypes = {
  isNew: PropTypes.bool,
  ruleData: funnelTypes.rule,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  funnelId: PropTypes.string.isRequired,
  productsMap: PropTypes.shape({}),
  funnelProducts: funnelTypes.product
};

export default connect(null, funnelsActions)(RuleModal);
