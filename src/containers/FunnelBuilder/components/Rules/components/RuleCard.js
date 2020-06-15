import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import ReactToolTip from 'react-tooltip';


import TriggerGroup from './RuleModal/TriggerGroup';

import { getIntersectedProducts } from './helpers';

const {
  Card,
  FlexBox,
  Badge
} = common;

const RuleCard = ({
  productsMap,
  trigger,
  triggerGroups,
  onDelete,
  onEdit,
  ...props
}) => (
  <Card className='width-percent-60 padding-h-20 padding-v-20 margin-v-10 relative-element'>
    <FlexBox column>
      <FlexBox center='v-center'>
        <span className='small-text gray-color bold-text'>When</span>
        <Badge data-tip='rule trigger event' className='margin-h-10'>{trigger}</Badge>
        <span className='small-text gray-color bold-text'>Occur</span>
      </FlexBox>
      <FlexBox center='v-center'>
        <span className='small-text gray-color bold-text'>For</span>
        <FlexBox column className='margin-left-20'>
          {triggerGroups.map((group) => (
            <TriggerGroup
              className='margin-left-20'
              key={group.id}
              {...group}
              products={getIntersectedProducts(productsMap, group.products)}
            />
          ))}
        </FlexBox>
      </FlexBox>
      <FlexBox column spaceBetween className='rule-control'>
        <FaRegEdit
          data-tip='Edit this rule'
          onClick={onEdit}
          className='gray-text animate item-clickable'
        />
        <MdDelete
          data-tip='Delete this rule'
          onClick={onDelete}
          className='gray-text animate item-clickable'
        />
      </FlexBox>
    </FlexBox>
    <ReactToolTip delayShow={300} />
  </Card>
);

RuleCard.propTypes = {};

export default RuleCard;
