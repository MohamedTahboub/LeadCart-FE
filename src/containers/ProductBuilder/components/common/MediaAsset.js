import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ReactPlayer from 'react-player';
import upsellDefaultImage from 'assets/images/upsells/upsell-image.png';

const Media = ({
  type,
  value,
  autoPlay,
  ...props
}) => (type === 'image'
  ? (<img src={value} alt='asset link' {...props} />)
  : (<ReactPlayer url={value} playing={autoPlay} {...props} />));

Media.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string.isRequired
};
Media.defaultProps = {
  type: 'image'
};

const {
  InputRow,
  Button,
} = common;


const MediaAsset = ({
  product: {
    pagePreferences: {
      asset: {
        visible,
        link,
        type
      } = {}
    } = {}
  } = {},
  onChange,
  ...props
}) => {
  // const [state, setState] = useState({ type: 'video', ...asset });
  // const [changed, setChanged] = useState(false);


  const onUpdate = ({ target: { name, value } }) => {
    onChange({
      target: {
        name: 'pagePreferences.asset',
        value: {
          type,
          link,
          visible,
          [name]: value
        }
      }
    });
  };

  // const onSubmit = () => {
  //   props.onChange && props.onChange({
  //     target: {
  //       name: 'pagePreferences.asset',
  //       value: {
  //         type: state.type,
  //         link: state.link,
  //         visible: state.visible
  //       }
  //     }
  //   });
  //   setChanged(false);
  // };

  // useEffect(() => {
  //   setState(asset);
  // }, [asset.visible]);

  const onAssetImageChange = (image) => {
    onUpdate({ target: { name: 'link', value: image } });
  };

  // const onEditMode = () => {
  //   setChanged(true);
  // };
  const onHideMedia = () => {
    // setChanged(true);
    onUpdate({ target: { name: 'visible', value: !visible } });
  };


  if (!visible) return null;

  return (
    <div className='upsell-media-asset-container'>
      <Media
        type={type}
        value={link}
        alt=''
        className='media-assets'
      />
      <div className='editing-warper'>
        <InputRow className='editing-warper-from'>
          <InputRow.SelectOption
            value={type}
            name='type'
            // error={errors.assets && errors.assets.assetsType}
            onChange={onUpdate}
            className='asset-type'
            options={[
              { label: 'Video', value: 'video' },
              { label: 'Image', value: 'image' }
            ]}
          />
          {type === 'image'
            ? (
              <InputRow.AddImage
                value={link}
                source='assets_link'
                onUploaded={onAssetImageChange}
                name='link'
                className='upsell-image-alignment'
              >
                Upload Image
              </InputRow.AddImage>
            )
            : (
              <InputRow.TextField
                value={link}
                name='link'
                onChange={onUpdate}
                placeholder='Enter Valid video link'
                className='asset-input-value'
              />
            )
          }
        </InputRow>
        <div
          onClick={onHideMedia}
          className='asset-edit-btn asset-hide-btn'
          role='presentation'
        >
          <i className='fas fa-eye-slash' />
        </div>
      </div>
    </div>
  );
};

MediaAsset.propTypes = {
  value: PropTypes.string
};

MediaAsset.defaultProps = {
  value: upsellDefaultImage
};

export default MediaAsset;
