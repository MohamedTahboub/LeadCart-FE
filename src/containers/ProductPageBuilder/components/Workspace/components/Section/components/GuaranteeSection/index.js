import React from 'react';
import clx from 'classnames';

import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';
import common from 'components/common';
import { useContext } from '../../../../../../actions';
import { getSectionBackground } from 'helpers/common';

import './style.css';

const {
  FlexBox,
  ResizableTextarea,
  ResizableInput
} = common;

const GuaranteeSection = ({
  className,
  section = {}
}) => {
  const { actions } = useContext();

  const {
    styles = {},
    content: {
      badge: imageSrc = guaranteeBadge1,
      title,
      description
    } = {}
  } = section;

  const { theme = 'right-theme' } = styles;

  const classNames = clx({
    'image-section': true,
    'guarantee-section': true,
    [className]: className
  });

  const guaranteeTextClasses = clx({
    'px-2': true,
    'text-center full-width': theme === 'center-theme'
  });


  const onChange = ({ target: { name, value } }) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name,
        value
      }
    });
  };

  const sectionBackground = getSectionBackground(styles);

  return (
    <FlexBox
      center='h-center v-center'
      className={classNames}
      column={theme === 'center-theme'}
      reverse={theme === 'right-theme'}
      style={sectionBackground}
    >
      <img
        src={imageSrc}
        className='section-guarantee-image'
        alt='guarantee badge'
      />
      <FlexBox flex column className={guaranteeTextClasses}>
        <ResizableInput
          name='content.title'
          onChange={onChange}
          className='larger-text full-width'
          value={title}
        />
        <ResizableTextarea
          name='content.description'
          onChange={onChange}
          textarea
          value={description}
          className='large-text'
        />

      </FlexBox>
    </FlexBox>
  );
};

GuaranteeSection.propTypes = {};
GuaranteeSection.defaultProps = {};

export default GuaranteeSection;
