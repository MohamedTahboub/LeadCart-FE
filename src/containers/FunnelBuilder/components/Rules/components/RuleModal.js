import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modals';
import common from 'components/common';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import rulesEvents from 'data/rulesEvents';
import sampleRules from 'data/sampleRules';
import TriggerGroup from './TriggerGroup';
import TriggerActionMaker from './TriggerActionMaker';

const [{ triggerGroups: sampleTriggerGroups }] = sampleRules;

const {
  FlexBox,
  MainTitle,
} = common;
const getSubProducts = (productsMap = {}, products = []) => products.map((productId) => productsMap[productId] || {});

const RuleModal = ({
  open,
  onClose,
  products,
  productsMap
}) => {
  const [fields, setFields] = useState({ triggerGroups: sampleTriggerGroups });
  const productsOptions = products.map(({ _id: value, name: label }) => ({ label, value }));

  const onTriggerGroupAdded = (group) => {
    setFields({
      ...fields,
      triggerGroups: [...fields.triggerGroups, group]
    });
  };


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

        <Select options={rulesEvents} className='flex-item margin-h-10' />
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
              products={getSubProducts(productsMap, group.products)}
            />
          ))
        }
        <TriggerActionMaker
          products={productsOptions}
          onAdd={onTriggerGroupAdded}
        />
      </FlexBox>

    </Modal>
  );
};

RuleModal.propTypes = {

};

export default RuleModal;
