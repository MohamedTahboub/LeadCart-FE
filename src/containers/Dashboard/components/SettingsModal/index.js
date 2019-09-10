import React, { useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { Modal } from 'components/Modals';
import './style.css';


const { Button } = common;

const availableOptions = {
  sales: [
    { value: 'dailyRev', label: 'Average Daily Revenue', show: true },
    { value: 'transactions', label: 'Total Transactions', show: true },
    { value: 'grossRevenue', label: 'Gross Revenue', show: true },
    { value: 'netRevenue', label: 'Net Revenue', show: true },
    { value: 'customers', label: 'Total Customers', show: false },
    {
      value: 'newCustomers', label: 'New Customers', disabled: true, show: false
    },
    {
      value: 'annualRevenue', label: 'Annual Revenue', disabled: true, show: false
    },
    { value: 'conversionRate', label: 'Conversion Rate', show: true },
    { value: 'views', label: 'Checkout Views', show: true },
  ],
  refunds: [
    { value: 'refunds', label: 'Refunds', show: true },
    { value: 'refundRate', label: 'Refund Rate', show: true },
    {
      value: 'refundAmount', label: 'Refund Amount', disabled: true, show: false
    },
    {
      value: 'refundedCustomers', label: 'Refunded Customers', disabled: true, show: false
    },
  ]
};

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
  onClose,
}) => {
  const [options, setOptions] = useState(availableOptions);


  const onToggleOption = (option, type = 'sales') => () => {
    const newOption = { ...option, show: !option.show };
    console.log(newOption);

    const newOptions = options[type].map((o) => (o.value === option.value ? newOption : o));

    setOptions({ ...options, [type]: newOptions });
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
      </div>
      <div className='charts-settings-footer'>
        <div>
          <Button className='gray-color reset-btn'>Reset To Default</Button>
        </div>
        <div className='chart-modal-btns'>
          <Button className='gray-color'>Cancel</Button>
          <Button className='primary-color'>Save</Button>
        </div>
      </div>
    </Modal>
  );
};
SettingsModal.propTypes = {

};

export default SettingsModal;
