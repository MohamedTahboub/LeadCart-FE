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
import { isFunction } from 'libs/checks';
import ids from 'shortid';
import config from 'config';

const { admins = [] } = config;
const animatedComponents = makeAnimated();
const getActionsOptions = ({ action: { integrationKey } = {} }, actionsMap) => {
  if (actionsMap[integrationKey]) {
    return actionsMap[integrationKey].actions.map((action) => ({
      label: action.label,
      value: action.name || action.value,
      requirement: action.requirement
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
  isEdit,
  onUpdate,
  group: groupDetails = {},
  products,
  hasGroups,
  integrations: integrationsLabels,
  actionsMap,
  onAdd
}) => {
  const [group, setGroup] = useState(groupDetails);
  const [error, setError] = useState();
  const [expand, setExpand] = useState(hasGroups);


  const toggleExpand = () => setExpand((expand) => !expand);

  const _onAdd = () => {
    const errorMessage = notValidGroup(group);

    if (isFunction(onAdd) && !errorMessage) {
      onAdd({
        _id: ids.generate(),
        ...group
      });
    }

    if (errorMessage)
      setError(errorMessage);

    toggleExpand();
  };

  const _onUpdate = () => isFunction(onUpdate) && onUpdate(group);

  const onProductsChanged = (products = []) => {
    setGroup({
      ...group,
      products: products === null ? [] : products.map((p) => p.value)
    });
    setError();
  };

  const onIntegrationSelected = ({ value }) => {
    setGroup({
      ...group,
      action: { integrationKey: value }
    });
  };
  const onIntegrationActionSelected = ({ value, requirement }) => {
    setGroup({
      ...group,
      action: {
        ...group.action,
        type: value,
        requirement
      }
    });
    setError();
  };

  const onDependenciesChange = ({ target: { name, value } }) => {
    const newGroup = immutable.set(group, name, value);
    setGroup(newGroup);
    setError();
  };

  useEffect(() => {
    setGroup({});
  }, [expand]);

  useEffect(() => {
    setGroup(groupDetails);
    if (isEdit) setExpand(true);
    return () => setExpand(false);
  }, [isEdit]);


  const actionsOptions = getActionsOptions(group, actionsMap);
  const selectedProducts = products.filter(({ value }) => Array.isArray(group.products) && group.products.includes(value));
  const selectedIntegration = integrationsLabels.find(({ value }) => group.action && group.action.integrationKey === value);
  const selectedActionOption = actionsOptions.find(({ value }) => group.action && group.action.type === value);
  const actionIntegrationId = group.action && actionsMap[group.action.integrationKey].integrationId;

  return expand ? (
    <FlexBox column className='white-bg padding-v-10 padding-h-10 soft-edges my-1'>
      <div className='large-text'>{`${isEdit ? 'Update This' : 'Make New'}`} Trigger Group:</div>
      <FlexBox center='v-center margin-v-10'>
        <div className='label margin-right-10'>For The Products</div>
        <Select
          className='flex-item '
          components={animatedComponents}
          name='products'
          onChange={onProductsChanged}
          isMulti
          options={products}
          value={selectedProducts}
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
          value={selectedIntegration}
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
          value={selectedActionOption}
        />
      </FlexBox>
      <ActionDependencies
        {...group.action}
        onChange={onDependenciesChange}
        integrationId={actionIntegrationId}
      />
      <FlexBox flexEnd={!error} spaceBetween={error} flex className='margin-top-10'>
        {error && (
          <div className='error-message'>
            {error}
          </div>
        )}
        <Button onClick={isEdit ? _onUpdate : _onAdd} className='light-btn'>
          <FlexBox center='v-center'>
            <IoIosAdd className='mx-1' />
            <span>
              {`${isEdit ? 'Update' : 'Add'}`}
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

const mapStateToProps = ({ user: { user = {} } = {}, integrations }) => {
  const integrationsLabels = integrations
    .filter((integration) => !includesIgnoreCase(integration.category, 'payment'))
    .map((integration) => ({
      label: integration.name,
      value: integration.key,
      actions: integration.actions,
      integrationId: integration._id
    }));

  const localFulfillment = {
    ...leadcartFulfillment,
    actions: leadcartFulfillment.actions.filter((ful) => ful.private ? admins.includes(user.email) : true)
  };
  const integrationsList = [localFulfillment, ...integrationsLabels];
  const actionsMap = mapListToObject(integrationsList, 'value');

  return {
    integrations: integrationsList,
    actionsMap
  };
};
export default connect(mapStateToProps)(TriggerActionMaker);
