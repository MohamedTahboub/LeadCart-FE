import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from 'components/Modals';
import dashboardSettings from 'data/dashboardSettings';
import * as Schemas from 'libs/validation';
import * as dashboardActions from '../../../../actions/dashboard';
import * as flashMessagesActions from '../../../../actions/flashMessage';
import common from '../../../../components/common';
import { notification } from 'libs';
import './style.css';

const { Button, InputRow } = common;

const OptionItem = ({
  label,
  onToggle,
  show,
  disabled
}) => {
  const classes = `${show ? 'displayed-item' : 'available-item'} ${disabled ? 'coming-soon disabled' : ''}`;

  const onClick = () => {
    if (!disabled) onToggle();
  };
  return (
    <div
      onClick={onClick}
      className={`option-item  ${classes}`}
    >
      {label}
    </div>
  );
};


const SettingsModal = ({
  show,
  updateDashboardChartsSettings,
  settings,
  onClose
}) => {
  const [displayMainChart, setDisplayMainChart] = useState(settings.displayMainChart);
  const [options, setOptions] = useState(settings.defaultCardsSettings);

  const onToggleOption = (option, type = 'sales') => () => {
    const newOption = { ...option, show: !option.show };
    const newOptions = options[type].map((o) => (o.value === option.value ? newOption : o));
    setOptions({ ...options, [type]: newOptions });
  };
  const onToggleDisplayMainCharts = () => {
    setDisplayMainChart((v) => !v);
  };

  const onResetToDefault = () => {
    setOptions(dashboardSettings.defaultCardsSettings);
    setDisplayMainChart(dashboardSettings.displayMainChart);
  };

  useEffect(() => {
    setDisplayMainChart(settings.displayMainChart);
    setOptions(settings.defaultCardsSettings);
  }, [show, settings]);

  const onSave = async () => {
    const settings = {
      dashboardSettings: {
        defaultCardsSettings: options,
        displayMainChart
      }
    };

    const { isValid, value: validSettings } = await Schemas.dashboardChartsSettings(settings);

    if (isValid) {
      updateDashboardChartsSettings(
        validSettings,
        {
          onSuccess: (arg) => {
            notification.success('Dashboard settings updated');
            onClose();
          },
          onFailed: (message) => {
            notification.failed(message);
          }
        }
      );
    } else {
      notification.failed('Failed to save dashboard settings');
    }
  };

  return (
    <Modal
      onClose={onClose}
      isVisible={show}
      className='charts-settings-modal'
    >
      <div className='charts-settings-header'>
        <div className='title'>Customize your Dashboard</div>
        <div className='note general-note'>
          Choose Which metrics you want to display on your dashboard.
        </div>
      </div>
      <div className='charts-settings-content'>
        <div className='options-container'>
          <div className='section-title'>Sales Stats</div>
          <div className='options-columns'>
            <div className='options-column displayed-options'>
              {options.sales.filter(({ show }) => show).map((option, id) => (
                <OptionItem
                  onToggle={onToggleOption(option, 'sales')}
                  key={`${option.value}_${id}`}
                  {...option}
                />
              ))}
            </div>
            <div className='options-column available-options'>
              {options.sales.filter(({ show }) => !show).map((option, id) => (
                <OptionItem
                  onToggle={onToggleOption(option, 'sales')}
                  key={`${option.value}_${id}`}
                  {...option}
                />
              ))}
            </div>
          </div>
          <div className='section-title'>Refunds Stats</div>
          <div className='options-columns'>
            <div className='options-column displayed-options'>
              {options.refunds.filter(({ show }) => show).map((option, id) => (
                <OptionItem
                  onToggle={onToggleOption(option, 'refunds')}
                  key={`${option.value}_${id}`}
                  {...option}
                />
              ))}
            </div>
            <div className='options-column available-options'>
              {options.refunds.filter(({ show }) => !show).map((option, id) => (
                <OptionItem
                  onToggle={onToggleOption(option, 'refunds')}
                  key={`${option.value}_${id}`}
                  {...option}
                />
              ))}
            </div>
          </div>
        </div>
        <InputRow className='main-charts-settings-container'>
          <div className='section-title mr-3'>Main Chart</div>
          <InputRow.Toggle
            value={displayMainChart}
            onToggle={onToggleDisplayMainCharts}
            beforeLabel='Show'
            afterLabel='Hide'

          />
        </InputRow>
      </div>
      <div className='charts-settings-footer'>
        <div>
          <Button onClick={onResetToDefault} className='gray-bg reset-btn'>Reset To Default</Button>
        </div>
        <div className='chart-modal-btns'>
          <Button onClick={onClose} className='gray-bg'>Cancel</Button>
          <Button onClick={onSave} className='primary-color'>Save</Button>
        </div>
      </div>
    </Modal>
  );
};
SettingsModal.propTypes = {
  show: PropTypes.bool,
  updateDashboardChartsSettings: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.objectOf()
};
SettingsModal.defaultProps = {
  settings: dashboardSettings,
  show: false
};


export default connect(null, {
  ...flashMessagesActions,
  ...dashboardActions
})(SettingsModal);
