import React from 'react';
import { useContext } from '../../../../../../actions';

import './style.css';
import ProgressBar from 'components/ProgressBar';


export default ({
  section = {},
  ...props
}) => {
  const {
    styles = {},
    content = {}
  } = section;

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

  const styleColors = {
    borderColor: styles.borderColor,
    barColor: styles.barColor,
    textColor: styles.textColor
  };
  const onChange = (event) => {
    const { target: { name, value } } = event;

    onFieldChange(name, value);
  };

  return (
    <ProgressBar
      value={content.value}
      theme={styles.theme}
      colors={styleColors}
      name='content.text'
      text={content.text}
      onChange={onChange}
    />
  );
};
