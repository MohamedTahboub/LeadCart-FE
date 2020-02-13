import React from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';
import ReactPlayer from 'react-player';

const VideoContent = ({
  className,
  value: videoLink,
}) => {
  const classNames = clx({
    'video-section': true,
    [className]: className,
  });

  return (
    <div className={classNames}>
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
