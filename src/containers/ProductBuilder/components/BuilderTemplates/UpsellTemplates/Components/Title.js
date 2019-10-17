import React from 'react';
import PropTypes from 'prop-types';
// import EditableField from './EditableField';
import common from 'components/common';
const {
  List,
  // InputRow,
  // MainTitle,
  // Button,
  // ActivationSwitchInput,
  // SubTabs,
  // FlexBoxesContainer
  EditableField
} = common;

const Title = ({ product : {name}={}, onChange, ...props }) => {

  // const onEdit = (text) => {
  //   console.log(text)
  // }
  return (
    <div className="upsell-title">
      <EditableField
        name='name'
        value={name}
        onChange={onChange}
      />
    </div>
  )
};

Title.propTypes = {
  value: PropTypes.string
};

Title.defaultProps = {
  value: 'upsell title here'
};

export default Title;
