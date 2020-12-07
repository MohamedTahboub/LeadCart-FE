import React from 'react';
import { LayoutSwitch } from 'components/common/Layout';

import {
  ClassicInput,
  ModernInput
} from './components';

const PhoneNumberInput = ({ theme = 'classic', ...props }) => {
  return (
    <LayoutSwitch active={theme} fallback={<ClassicInput {...props}/>}>
      <ClassicInput {...props} id='classic'/>
      <ModernInput {...props} id='modern'/>
    </LayoutSwitch>
  );
};

PhoneNumberInput.propTypes = {};

export default PhoneNumberInput;
