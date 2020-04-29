import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import common from 'components/common';
import { GoInfo } from 'react-icons/go';
import { IoIosAdd } from 'react-icons/io';
import ReactToolTip from 'react-tooltip';
import { includesIgnoreCase } from 'libs';
import { connect } from 'react-redux';
import { mapListToObject } from 'libs';
const animatedComponents = makeAnimated();


// const integrationsLabel = [
//   { label: 'Aweber', value: 'aweber' }
// ];
const selectedIntegrationActions = [
  { label: 'Add to List', value: 'addToList' }
];

const getActionsOptions = ({ action: { serviceName } = {} }, actionsMap) => {
  if (actionsMap[serviceName]) {
    return actionsMap[serviceName].actions.map((action) => ({
      label: action.label,
      value: action.name
    }));
  }
  return [];
};
const {
  FlexBox,
  MainTitle,
  Button
} = common;

const TriggerActionMaker = ({
  products,
  hasGroups,
  integrations: integrationsLabels,
  actionsMap,
  ...props
}) => {
  const [group, setGroup] = useState({});
  const [expand, setExpand] = useState(hasGroups);


  const toggleExpand = () => setExpand((expand) => !expand);

  const onAdd = () => {
    if (props.onAdd) props.onAdd(group);
    toggleExpand();
  };

  const onProductsChanged = (products) => {
    setGroup({
      ...group,
      products: products.map((p) => p.value)
    });
  };

  const onIntegrationSelected = ({ value }) => {
    setGroup({
      ...group,
      action: { serviceName: value }
    });
  };
  const onIntegrationActionSelected = ({ value }) => {
    setGroup({
      ...group,
      action: {
        ...group.action,
        serviceAction: value
      }
    });
  };
  useEffect(() => {
    setGroup({});
  }, [expand]);

  const actionsOptions = getActionsOptions(group, actionsMap);

  return expand ? (
    <FlexBox column className='white-bg padding-v-10 padding-h-10 soft-edges'>
      <div className='large-text'>Make New Trigger Group:</div>
      <FlexBox center='v-center margin-v-10'>
        <div className='label margin-right-10'>For The Products</div>
        <Select
          className='flex-item '
          components={animatedComponents}
          name='products'
          onChange={onProductsChanged}
          isMulti
          options={products}
        />
      </FlexBox>
      <FlexBox center='v-center margin-v-10'>
        <FlexBox center='v-center' className='label margin-right-10'>
          Execute
          <GoInfo
            data-tip='Integration service that you are connected to'
            className='gray-text animate margin-left-3 font-size-10'
          />

        </FlexBox>
        <Select
          className='flex-item margin-h-10'
          defaultValue='IntegrationsService'
          options={integrationsLabels}
          onChange={onIntegrationSelected}
        />
        <FlexBox center='v-center' className='label margin-right-10'>
          Action
          <GoInfo
            data-tip='An action is the functionality available in an Integration you are connected to.'
            className='gray-text animate margin-left-3 font-size-11'
          />
        </FlexBox>
        <Select
          className='flex-item'
          defaultValue='IntegrationsAction'
          options={actionsOptions}
          onChange={onIntegrationActionSelected}
        />
      </FlexBox>
      <FlexBox flexEnd flex className='margin-top-10'>
        <Button onClick={onAdd} className='light-btn'>
          <FlexBox center='v-center'>
            <IoIosAdd />
            <span>
              Add
            </span>
          </FlexBox>
        </Button>
        <ReactToolTip delayShow={300} />
      </FlexBox>
    </FlexBox>
  ) : (
    <Button onClick={toggleExpand} className='light-btn full-width'>
      <FlexBox center='v-center h-center padding-v-5'>
        <IoIosAdd />
        <span>
            Add New Trigger Group
        </span>
      </FlexBox>
    </Button>
  );
};
TriggerActionMaker.propTypes = {};
const mapStateToProps = ({ integrations }) => {
  const integrationsList = integrations
    .filter((integration) => !includesIgnoreCase(integration.category, 'payment'))
    .map((integration) => ({ label: integration.name, value: integration.key, actions: integration.actions }));

  const actionsMap = mapListToObject(integrationsList, 'value');

  return {
    integrations: integrationsList,
    actionsMap
  };
};
export default connect(mapStateToProps)(TriggerActionMaker);
