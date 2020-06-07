import React from 'react';
import FlexibleBox from 'components/FlexibleBox';
import { useContext } from '../../../../../../actions';

import './style.css';

const Spacer = ({
  section = {},
  ...props
}) => {
  const { styles = {} } = section;

  const { actions } = useContext();

  const onFieldChange = (name, value) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name,
        value
      }
    });
  };

  const onSizeChange = ({ height }) => {
    onFieldChange('styles.height', height);
  };

  return (
    <FlexibleBox
      size={{ height: styles.height }}
      onResizeStop={onSizeChange}
      showOnParentHover
    />
  );
};

Spacer.propTypes = {};

export default Spacer;

