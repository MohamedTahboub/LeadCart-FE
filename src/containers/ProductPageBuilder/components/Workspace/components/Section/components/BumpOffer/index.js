import React from 'react';
import 'react-toggle/style.css';

import common from 'components/common';
import { useContext } from '../../../../../../actions';
import { BottomImage, CenteredImage, Defaults, SideImage, TopImage } from './themes';
import { getSectionBackground } from 'helpers/common';
import './style.css';

const { LayoutSwitch } = common;


const BumpOffer = ({ section = {}, ...props }) => {
  const { styles = {}, content = {} } = section;

  const {
    state: {
      product: {
        pageStyles: {
          productPage: {
            firstColumn: { backgroundColor: columnBg } = {},
            backgroundColor: productBg
          } = {},
          pageBackgroundSettings: { firstSectionBackground:  { backgroundColor: sectionBg } = {} } = {}
        } = {}
      } = {}
    }, actions
  } = useContext();


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
    headerTextColor = '#000',
    borderColor,
    borderWidth,
    borderRadius,
    borderStyle,
    containerTextColor,
    toggleInput = 'checkbox',
    theme = 'LeftImage',
    borderBottomColor,
    borderBottomStyle,
    borderBottomWidth,
    hasBlurBackgroundImage
  } = styles;

  const sectionBackground = getSectionBackground(styles, containerBackground);

  const containerStyle = {
    ...sectionBackground,
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
    borderBottomWidth,
    containerBackground,
    onChange,
    columnBg,
    productBg,
    sectionBg
  };


  const allProps = {
    price,
    introText,
    name,
    bodyText,
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
    hasBlurBackgroundImage,
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
