import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import './style.css';

const {
  HeaderLogo,
  EditableField,
  FlexBox
} = common;


const Header = ({
  onChange,
  funnel,
  history,
  ...props
}) => {
  const navigateToHome = () => {
    history.goBack();
  };

  const onNameChange = ({ target: { name, value } }) => {
    onChange({ name, value });
  };

  return (
    <FlexBox className='white-bg' center='v-center'>
      <FlexBox flex flexStart>
        <HeaderLogo
          onClick={navigateToHome}
        />
      </FlexBox>
      <FlexBox center='h-center v-center'>
        <EditableField
          className='large-text dashed-text aligned-center-text lightgray-border-color'
          name='name'
          defaultValue=' '
          onChange={onNameChange}
          value={funnel.name}
          max={50}
        />
      </FlexBox>

      <FlexBox flex />
      {props.children}
    </FlexBox>
  );
};
Header.propTypes = {
  onDisplayChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  subdomain: PropTypes.string.isRequired,
  history: PropTypes.objectOf({}),
  product: PropTypes.objectOf({})
};

Header.defaultProps = {
  history: {},
  product: {}
};

export default Header;
