import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import ReactPlayer from 'react-player';

const VideoContent = ({
  className,
  section = { styles: {} },
  value: videoLink,
}) => {
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

  return (
    <div className={classNames} style={sectionStyle}>
      <ReactPlayer
        url={videoLink}
        playing={false}
      />
    </div>
  );
};
VideoContent.propTypes = {

};

export default VideoContent;
