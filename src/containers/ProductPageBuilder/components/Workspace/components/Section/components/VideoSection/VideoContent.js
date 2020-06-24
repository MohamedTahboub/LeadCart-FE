import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ReactPlayer from 'react-player';
import upsellDefaultImage from 'assets/images/upsells/upsell-image.png';


const { InputRow } = common;


const VideoContent = ({
  value,
  onChange,
  ...props
}) => (
  <div className='upsell-media-asset-container'>
    <ReactPlayer
      url={value}
      // playing={autoPlay}
      disabled
      className='media-assets'
      width='min-content'
    />
    <div className='editing-warper'>
      <InputRow className='editing-warper-from'>
        <InputRow.TextField
          value={value}
          name='link'
          onChange={onChange}
          placeholder='Video URL'
          className='asset-input-value'
        />
      </InputRow>
    </div>
  </div>
);

VideoContent.propTypes = { value: PropTypes.string };

VideoContent.defaultProps = { value: upsellDefaultImage };

export default VideoContent;
