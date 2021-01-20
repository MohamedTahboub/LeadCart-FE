import React from 'react';
import clx from 'classnames';

import guaranteeBadge1 from 'assets/images/guaranteeBadges/gur-1.png';
import common from 'components/common';
import { useContext } from '../../../../../../actions';
import QuillEditor from 'components/QuillEditor';
import Image from 'components/common/Image';
import { getSectionBackground } from 'helpers/common';

import './style.css';

const { FlexBox } = common;

const Figure = ({
  className,
  section = {}
}) => {
  const { actions } = useContext();

  const {
    id,
    styles = {},
    content: {
      image: imageSrc = guaranteeBadge1,
      text: textContent
    } = {}
  } = section;

  const { theme = 'right-theme' } = styles;


  const sectionClasses = clx({
    'margin-h-20': true,
    'text-center full-width': theme === 'center-theme'
  });


  const onChange = ({ name, value }) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name,
        value
      }
    });
  };
  const onImageChange = ({ value }) => {
    onChange({
      name: 'content.image',
      value
    });
  };

  const onContentChange = (value) => {
    onChange({
      name: 'content.text',
      value
    });
  };

  const sectionBackground = getSectionBackground({ styles });


  return (
    <FlexBox
      center='h-center'
      className={clx('figure-section', className)}
      reverse={theme === 'right-theme'}
      style={sectionBackground}
    >
      <Image
        className='figure-section-image'
        image={imageSrc}
        alt='figure illustration photo'
        name={`figure-image-${id}`}
        onChange={onImageChange}
      />
      <FlexBox flex column className={sectionClasses}>
        <QuillEditor
          value={textContent}
          onEdit={onContentChange}
          bounds='#product-builder-window'
        />
      </FlexBox>
    </FlexBox>
  );
};

Figure.propTypes = {};
Figure.defaultProps = {};

export default Figure;
