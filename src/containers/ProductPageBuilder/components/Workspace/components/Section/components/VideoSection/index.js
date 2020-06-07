import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
// import ReactPlayer from 'react-player';
import VideoContent from './VideoContent';
import { useContext } from '../../../../../../actions';
import './style.css';
const VideoSection = ({
  className,
  section = { styles: {} },
  value: videoLink,
}) => {
  const { actions } = useContext();


  const classNames = clx({
    'video-section': true,
    [className]: className,
  });

  if (!section.styles) section.styles = {};
  const sectionStyle = {
    ...section.styles,
    paddingTop: `${section.styles.paddingTop}px`,
    paddingBottom: `${section.styles.paddingBottom}px`,
    height: `${section.styles.height}px`,
    width: `${section.styles.width}px`
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

  return (
    <div className={classNames} style={sectionStyle}>
      <VideoContent
        value={videoLink}
        onChange={onChange}
      />
    </div>
  );
};
VideoSection.propTypes = {

};

export default VideoSection;
