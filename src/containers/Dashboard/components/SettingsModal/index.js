import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from '../../../../components/common';
import { Modal } from 'components/Modals';
import './style.css';
import { connect } from 'react-redux';
// import * as dashboardActions from 'actions/dashboard';
import * as dashboardActions from '../../../../actions/dashboard';
import * as flashMessagesActions from '../../../../actions/flashMessage';
import dashboardSettings from 'data/dashboardSettings'
import * as Schemas  from 'libs/validation'

const { Button, InputRow } = common;;

const OptionItem = ({
  label,
  value,
  onToggle,
  show,
  disabled,
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
  showFlashMessage,
  settings,
  onClose,
}) => {
  const [displayMainChart, setDisplayMainChart] = useState(settings.displayMainChart);
  const [options, setOptions] = useState(settings.defaultCardsSettings);
  const [saving, setSaving] = useState(false);

  const onToggleOption = (option, type = 'sales') => () => {
    const newOption = { ...option, show: !option.show };
    const newOptions = options[type].map((o) => (o.value === option.value ? newOption : o));
    setOptions({ ...options, [type]: newOptions });
  };
  const onToggleDisplayMainCharts = () => {
    setDisplayMainChart(v => !v)
  }

  const onResetToDefault = () => {
    setOptions(dashboardSettings.defaultCardsSettings);
    setDisplayMainChart(dashboardSettings.displayMainChart);
  };

  useEffect(() => {
    setDisplayMainChart(settings.displayMainChart)
    setOptions(settings.defaultCardsSettings)

  }, [show, settings]);

  const onSave = async () => {
    const settings = {
      dashboardSettings: {
        defaultCardsSettings: options,
        displayMainChart
      }
    };

    const { isValid, value: validSettings, errors } = await Schemas.dashboardChartsSettings(settings)

    if (isValid) {
      setSaving(true);
      updateDashboardChartsSettings(
        validSettings
        ,
        {
          onSuccess: (arg) => {
            setSaving(false);
            showFlashMessage({
              type: 'success',
              message: 'Dashboard Customization Settings Updated Successfully'
            });
            onClose()
          },
          onFailed: (message) => {
            setSaving(false);
            showFlashMessage({
              type: 'failed',
              message: 'Failed to Save Dashboard Customization Settings'
            });
          }
        }
      );

    } else {
      console.log("isValid" , isValid)
      console.log("errors" , errors)
      showFlashMessage({
        type: 'failed',
        message: 'Failed to Save Dashboard Customization Settings'
      });
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
          <div className='section-title'>Main Chart</div>
          <div className='charts-settings-switch-container' >
            <div className='charts-settings-switch-label'>
              Show / Hide
          </div>
            <InputRow.SwitchInput
              value={displayMainChart}
              onToggle={onToggleDisplayMainCharts}
              className='no-switch-input-labels'
            />
          </div>
        </InputRow>
      </div>
      <div className='charts-settings-footer'>
        <div>
          <Button onClick={onResetToDefault} className='gray-color reset-btn'>Reset To Default</Button>
        </div>
        <div className='chart-modal-btns'>
          <Button onClick={onClose} className='gray-color'>Cancel</Button>
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
  showFlashMessage: PropTypes.func.isRequired,
  settings: PropTypes.objectOf(),
};
SettingsModal.defaultProps = {
  settings: dashboardSettings,
  show: false
};


const mapStateToProps = ({
  dashboard: {
    settings
  } = {}
}) => ({
  settings
});


export default connect(
  mapStateToProps, {
  ...flashMessagesActions,
  ...dashboardActions
})(SettingsModal);
