import React, { useRef } from 'react';
import clx from 'classnames';
import defaultDropImage from 'assets/images/upload-image.png';
import common from 'components/common';
import FlexibleBox from 'components/FlexibleBox';
import { useContext } from '../../../../../actions';
const { InputRow: { AddImage } } = common;

const ImageContent = ({
  className,
  section = {},
  parentSectionId,
  shallow,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { actions, state } = useContext();
  const { styles = {}, content = {}, id: sectionId } = section;
  const classNames = clx({
    shallow,
    'image-section': true,
    [className]: className
  });

  const onImageChange = (image) => {
    if (parentSectionId) {
      const { product: { sections } } = state;
      const parentSection = sections.find(({ id }) => id === parentSectionId);
      const nestedSections = parentSection.content.sections;
      const updatedSections = nestedSections.map((section) => {
        if (section.id === sectionId)
          return { ...section, content: { ...section.content, value: image } };

        return section;
      });
      actions.onSectionSettingChange({
        section: parentSection,
        field: {
          name: 'content.sections',
          value: updatedSections
        }
      });
    } else {
      actions.onSectionSettingChange({
        section,
        field: {
          name: 'content.value',
          value: image
        }
      });
    }
  };

  const onUpload = () => {
    inputRef.current.click();
  };


  const onSizeChange = (size) => {
    actions.onSectionSettingChange({
      section,
      field: {
        name: 'styles.height',
        value: size.height
      }
    });
  };

  return (
    <FlexibleBox
      size={{ height: styles.height }}
      className={classNames}
      onResizeStop={onSizeChange}
      showOnParentHover
      holdResize={!!parentSectionId}
    >
      <img
        src={content.value || defaultDropImage}
        alt='product asset'
        data-tip='Double Click to Upload'
        data-delay-show={1000}
        className='image-section'
        onDoubleClick={onUpload}
        role='presentation'
      />
      <AddImage
        inputRef={inputRef}
        subLabel='Logo'
        source='product_image'
        className='hiden-element'
        name='logo'
        onUploaded={onImageChange}
      />
    </FlexibleBox>
  );
};

ImageContent.propTypes = {};

export default ImageContent;
