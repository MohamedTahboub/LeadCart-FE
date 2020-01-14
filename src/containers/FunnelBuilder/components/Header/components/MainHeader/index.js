import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
// import config from 'config';
import './style.css';

// import {
//   DisplayModeButtons
// } from './components';

// const { USER_SUB_DOMAIN_URL } = config;
const {
  HeaderLogo,
  EditableField,
  FlexBox,
  // Button,
  ActivationSwitchInput
} = common;


const Header = ({
  onDisplayChange,
  displayType,
  onChange,
  funnel,
  subdomain,
  showSandBoxSwitch,
  showDisplayModes,
  history,
  onSave,
  ...props
}) => {
  const navigateToHome = () => {
    history.goBack();
  };

  // const onToggleAvailability = () => {
  //   // onChange({
  //   //   target: {
  //   //     name: 'available',
  //   //     value: !funnel.available
  //   //   }
  //   // });
  // };
  // const onNameChange = ({ target: { name, value } }) => {
  //   onChange({ name, value });
  // };
  return (
    <FlexBox className='white-bg' center='v-center'>
      <FlexBox flex spaceBetween>
        <HeaderLogo
          onClick={navigateToHome}
        />
      </FlexBox>
      {props.children}
    </FlexBox>
  );
};
/*
      <EditableField
        className='product-name'
        name='name'
        defaultValue=' '
        onChange={onNameChange}
        value={funnel.name}
        max={50}
      />
*/

//  {showSandBoxSwitch && <ActivationSwitchInput active={funnel.available} onToggle={onToggleAvailability} />}
//        {showDisplayModes && <DisplayModeButtons onChange={onDisplayChange} type={displayType} />}
Header.propTypes = {
  onDisplayChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  subdomain: PropTypes.string.isRequired,
  history: PropTypes.objectOf({}),
  product: PropTypes.objectOf({}),
};

Header.defaultProps = {
  history: {},
  product: {},
};

export default Header;
