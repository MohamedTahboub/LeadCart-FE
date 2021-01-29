import React, { useMemo } from 'react';
import clx from 'classnames';

import VideoContent from './VideoContent';
import { useContext } from '../../../../../../actions';
import { getSectionBackground } from 'helpers/common';

import './style.css';


const VideoSection = ({
  className,
  section = { styles: {} },
  value: videoLink
}) => {
  const { actions } = useContext();


  const classNames = clx({
    'video-section': true,
    [className]: className
  });

  if (!section.styles) section.styles = {};

  const sectionBackground = getSectionBackground({ styles: section.styles });

  const sectionStyle = {
    ...section.styles,
    paddingTop: `${section.styles.paddingTop}px`,
    paddingBottom: `${section.styles.paddingBottom}px`,
    height: `${section.styles.height}px`,
    width: `${section.styles.width}px`,
    ...sectionBackground
  };
  const onChange = ({ target: { value } }) => {
    const updatedSection = {
      ...section,
      content: {
        ...section.content,
        value
      }
    };
    // if (props.onChange) return props.onChange(updatedSection);

    actions.updateProductSection(updatedSection);
  };


  return useMemo(() => (
    <div className={classNames} style={sectionStyle}>
      <VideoContent
        value={videoLink}
        onChange={onChange}
      />
    </div>
  ), [videoLink, sectionStyle.backgroundImage, sectionStyle.backgroundColor]);
};
VideoSection.propTypes = {};

export default VideoSection;
