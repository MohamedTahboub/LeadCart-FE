import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { FaRegEdit } from 'react-icons/fa';
import ReactToolTip from 'react-tooltip';


import TriggerGroup from './TriggerGroup';

const getSubProducts = (productsMap = {}, products = []) => products.map((productId) => productsMap[productId] || {});

const {
  Card,
  FlexBox,
  Badge
} = common;

const RuleCard = ({
  productsMap,
  trigger,
  triggerGroups,
  onEdit,
  ...props
}) => (
  <Card className='width-percent-60 padding-h-20 padding-v-20 margin-v-10'>
    <FlexBox column>
      <FlexBox center='v-center'>
        <span className='small-text gray-color'>When</span>
        <Badge data-tip='rule trigger event' className='margin-h-10'>{trigger}</Badge>
        <span className='small-text gray-color'>Occur</span>
      </FlexBox>
      <FlexBox flexStart>
        <span className='small-text gray-color'>For</span>
        <FlexBox column className='margin-left-20'>
          {triggerGroups.map((group) => (
            <TriggerGroup
              className='margin-left-20'
              key={group.id}
              {...group}
              products={getSubProducts(productsMap, group.products)}
            />
          ))}
        </FlexBox>
      </FlexBox>
      <FlexBox flexEnd>
        <FaRegEdit onClick={onEdit} className='gray-text animate item-clickable' />
      </FlexBox>
    </FlexBox>
    <ReactToolTip delayShow={300} />
  </Card>
);

RuleCard.propTypes = {

};

export default RuleCard;
