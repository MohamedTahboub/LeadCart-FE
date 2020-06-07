import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import common from 'components/common';
import { GoInfo } from 'react-icons/go';
import { IoIosAdd } from 'react-icons/io';
import ReactToolTip from 'react-tooltip';
import { includesIgnoreCase, mapListToObject } from 'libs';
import { connect } from 'react-redux';
import leadcartFulfillment from 'data/leadcartFulfillment';
import ActionDependencies from './ActionDependencies';
import * as immutable from 'object-path-immutable';
const animatedComponents = makeAnimated();

const getActionsOptions = ({ action: { integrationKey } = {} }, actionsMap) => {
  if (actionsMap[integrationKey]) {
    return actionsMap[integrationKey].actions.map((action) => ({
      label: action.label,
      value: action.name || action.value
    }));
  }
  return [];
};

const notValidGroup = ({ products = [], action = {} }) => {
  if (!products.length)
    return 'Select at lease on product';
  if (!(action.integrationKey && action.type))
    return 'No service or service action is selected';
};
const {
  FlexBox,
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
  const [error, setError] = useState();
  const [expand, setExpand] = useState(hasGroups);


  const toggleExpand = () => setExpand((expand) => !expand);

  const onAdd = () => {
    const errorMessage = notValidGroup(group);

    if (props.onAdd && !errorMessage) props.onAdd(group);

    if (errorMessage)
      setError(errorMessage);

    toggleExpand();
  };

  const onProductsChanged = (products) => {
    setGroup({
      ...group,
      products: products.map((p) => p.value)
    });
    setError();
  };

  const onIntegrationSelected = ({ value }) => {
    setGroup({
      ...group,
      action: { integrationKey: value }
    });
  };
  const onIntegrationActionSelected = ({ value }) => {
    setGroup({
      ...group,
      action: {
        ...group.action,
        type: value
      }
    });
    setError();
  };

  const onDependenciesChange = ({ target: { name, value } }) => {
    console.log(name, value);
    const newGroup = immutable.set(group, name, value);
    setGroup(newGroup);
    setError();
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
            data-tip='Integration Services()'
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
          name=''
          className='flex-item'
          defaultValue='IntegrationsAction'
          options={actionsOptions}
          onChange={onIntegrationActionSelected}
        />
      </FlexBox>
      <ActionDependencies
        {...group.action}
        onChange={onDependenciesChange}
      />
      <FlexBox flexEnd={!error} spaceBetween={error} flex className='margin-top-10'>
        {error && (
          <div className='error-message'>
            {error}
          </div>
        )}
        <Button onClick={onAdd} className='light-btn'>
          <FlexBox center='v-center'>
            <IoIosAdd className='mx-1' />
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
  const integrationsLabels = integrations
    .filter((integration) => !includesIgnoreCase(integration.category, 'payment'))
    .map((integration) => ({ label: integration.name, value: integration.key, actions: integration.actions }));

  const integrationsList = [leadcartFulfillment, ...integrationsLabels];
  const actionsMap = mapListToObject(integrationsList, 'value');

  return {
    integrations: integrationsList,
    actionsMap
  };
};
export default connect(mapStateToProps)(TriggerActionMaker);
