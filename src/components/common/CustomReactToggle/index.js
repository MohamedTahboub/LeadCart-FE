import React from 'react';
import Toggle from 'react-toggle';
import { FlexBox } from '../boxes';


import './style.css';

const CustomReactToggle = ({ className, checked, checkmarkColor, backgroundColor, ...props }) => {
  const style = { '--check-mark-color': checkmarkColor, '--bg-color': backgroundColor };

  return (
    <FlexBox style={style} className={`${className} react-custom-toggle v-center h-center`} {...props} >
      <Toggle checked={checked}/>
    </FlexBox>
  );
};


export default CustomReactToggle;
