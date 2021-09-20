import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import * as dashboardActions from '../../../../actions/dashboard';
import common from '../../../../components/common';
import { notification } from 'libs';
import './style.css';
import { FlexBox } from 'components/common/boxes';
import { isFunction } from 'libs/checks';
import moment from 'moment';
import { appInit } from 'actions/appInit';
const { Button, InputRow } = common;

const { DatePicker, SelectOption, Checkbox } = InputRow;

const Label = (props) => <InputRow.Label {...props} limitWidth={false} capitalize={false} />;

const ActivitiesResetModal = ({
  show,
  resetDashboardActivities,
  appInit,
  onClose
}) => {

  const [values, setValues] = useState({
    resetType: 'all',
    activitiesToReset: ['views', 'sales', 'prospects', 'refunds'],
    fromDate: moment().subtract(1, 'M'),
    toDate: moment()
  });
  const [loading, setLoading] = useState(false);

  const isResetAll = values.resetType === 'all';

  const updateLaunchDetails = () => {
    appInit({});
  };
  const onReset = async () => {
    const { fromDate, toDate, activitiesToReset } = values || {};

    let payload = { all: isResetAll };

    if (!payload.all) {
      payload = {
        all: isResetAll,
        activitiesToReset,
        fromDate,
        toDate
      };
    }
    setLoading(true);
    resetDashboardActivities(
      payload,
      {
        onSuccess: (arg) => {
          notification.success('Activities has been reset');
          setLoading(false);
          updateLaunchDetails();
          onClose();
        },
        onFailed: (message) => {
          setLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const onDateChange = (date) => {
    if (!(Array.isArray(date) && date.length)) return;

    const [from, to] = date;

    const fromDate = isFunction(from.format) && from.format();
    const toDate = isFunction(to.format) && to.format();

    if (!(toDate && fromDate)) return;

    setValues({
      ...values,
      fromDate,
      toDate
    });
  };
  const onChange = ({ name, value }) => {
    setValues({ ...values, [name]: value });
  };
  const onSelectChange = ({ target }) => {
    onChange(target);
  };
  const isActivityTypePresent = (type) => {
    return Array.isArray(values.activitiesToReset) && values.activitiesToReset.includes(type);
  };

  const onToggleActivityType = (type) => () => {
    const { activitiesToReset = [] } = values;
    const isExist = isActivityTypePresent(type);
    if (isExist) {
      onChange({
        name: 'activitiesToReset',
        value: activitiesToReset.filter((t) => t !== type)
      });
    } else {
      onChange({
        name: 'activitiesToReset',
        value: [type, ...activitiesToReset]
      });
    }
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={show}
      className='reset-activities-modal'
    >
      <div className='title'>Reset registered activities</div>
      <FlexBox column flex>
        <FlexBox column className='mt-3'>
          <Label>Reset Options:</Label>
          <SelectOption
            value={values.resetType}
            name='resetType'
            onChange={onSelectChange}
            className='min-width-200'
            options={[
              { label: 'Reset all of my activities', value: 'all' },
              { label: 'Reset Activities based on date', value: 'byDate' }
            ]}
          />
        </FlexBox>
        {!isResetAll && (
          <FlexBox column>
            <FlexBox column className='my-3'>
              <Label>Reset activities from / to dates:</Label>
              <DatePicker.RangePicker
                name='fromDate'
                type='picker'
                disabledDate={(date) => date > (Date.now() - (24 * 60 * 60 * 1000))}
                defaultValue={[moment().subtract(1, 'M'), moment()]}
                onChange={onDateChange}
              />
            </FlexBox>
            <FlexBox column className='my-3'>
              <Label>Activities to reset:</Label>
              <FlexBox>
                <Checkbox
                  onClick={onToggleActivityType('views')}
                  checked={isActivityTypePresent('views')}
                >
                  Views
                </Checkbox>
                <Checkbox
                  className='ml-2'
                  onClick={onToggleActivityType('prospects')}
                  checked={isActivityTypePresent('prospects')}
                >
                  Prospects
                </Checkbox>
                <Checkbox
                  className='ml-2'
                  onClick={onToggleActivityType('sales')}
                  checked={isActivityTypePresent('sales')}
                >
                  Sales
                </Checkbox>
                <Checkbox
                  className='ml-2'
                  onClick={onToggleActivityType('refunds')}
                  checked={isActivityTypePresent('refunds')}
                >
                  Refunds
                </Checkbox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        )}
      </FlexBox>
      <FlexBox spaceBetween className='mt-5'>
        <Button className='light-btn' onClick={onClose}>Cancel</Button>
        <Button
          className='light-btn reset-confirm-btn'
          onClick={onReset}
          onprogress={loading}
        >Confirm & Reset Activities</Button>
      </FlexBox>
    </Modal>
  );
};
ActivitiesResetModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};
ActivitiesResetModal.defaultProps = { show: false };

const mapStateToProps = ({ user: { user } }) => ({ user });
export default connect(mapStateToProps, { appInit, ...dashboardActions })(ActivitiesResetModal);
