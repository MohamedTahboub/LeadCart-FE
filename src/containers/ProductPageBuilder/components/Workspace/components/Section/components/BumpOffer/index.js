import React from 'react';
import 'react-toggle/style.css';


import common from 'components/common';
import { useContext } from '../../../../../../actions';
import { BottomImage, CenteredImage, Defaults, SideImage, TopImage } from './themes';
import './style.css';

const { LayoutSwitch } = common;


const BumpOffer = ({ section = {}, ...props }) => {
  const { styles = {}, content = {} } = section;
  const { actions } = useContext();

  const onChange = ({ target }) => {
    actions.onSectionSettingChange({
      section,
      field: target
    });
  };

  const onImageChange = (target) => {
    actions.onSectionSettingChange({
      section,
      field: target
    });
  };


  const { price, introText, name, bodyText, title, checked: isChecked, img } = content;

  const {
    containerBackground,
    contentHeadlineTextColor,
    headerBackground = 'transparent',
    headerTextColor,
    borderColor,
    borderWidth,
    borderRadius,
    borderStyle,
    containerTextColor,
    toggleInput = 'checkbox',
    theme = 'LeftImage',
    borderBottomColor,
    borderBottomStyle,
    borderBottomWidth
  } = styles;


  const containerStyle = {
    backgroundColor: containerBackground,
    borderColor,
    borderWidth: `${borderWidth}px`,
    borderRadius: `${borderRadius}px`,
    borderStyle
  };


  const mainTitleProps = {
    headerBackground,
    headerTextColor,
    toggleInput,
    borderRadius,
    title,
    isChecked,
    borderBottomColor,
    borderBottomStyle,
    borderBottomWidth
  };


  const allProps = {
    price,
    introText,
    name,
    bodyText,
    title,
    img,
    containerBackground,
    contentHeadlineTextColor,
    headerBackground,
    headerTextColor,
    borderColor,
    borderWidth,
    borderRadius,
    containerTextColor,
    toggleInput,
    theme,
    containerStyle,
    mainTitleProps,
    onChange,
    onImageChange,
    ...props
  };


  return (
    <LayoutSwitch active={theme} className='bump-offer' >
      <SideImage id='LeftImage' {...allProps} />
      <SideImage id='RightImage' {...allProps} />
      <TopImage id='TopImage' {...allProps} />
      <CenteredImage id='CenteredImage' {...allProps} />
      <BottomImage id='BottomImage' {...allProps} />
      <Defaults id='withoutImage' {...allProps} />
    </LayoutSwitch>
  );
};

export default BumpOffer;
