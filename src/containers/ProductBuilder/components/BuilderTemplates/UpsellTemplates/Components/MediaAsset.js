import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import ReactPlayer from 'react-player';
import upsellDefaultImage from '../../../../../../assets/images/upsells/upsell-image.png';

const Media = ({
  type,
  value,
  autoPlay,
  ...props
}) => {
  const Element = (props) => (
    type === 'video'
      ? (<ReactPlayer url={value} playing={autoPlay} {...props} />)
      : (<img src={value} alt='asset link' {...props} />)
  );
  useEffect(() => {

  }, [type, value]);
  return <Element {...props} />;
};
const {
  InputRow,
  // MainTitle,
  Button,
  // ActivationSwitchInput,
  // List,
  // SubTabs,
  // FlexBoxesContainer
} = common;

const MediaAsset = ({ value, type, ...props }) => {
  const [state, setState] = useState({ type: 'video', value: upsellDefaultImage });

  const onChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const onSubmit = () => {

  };

  const onAssetImageChange = (image) => {
    onChange({ target: { name: 'value', value: image } });
  };


  return (
    <div className='upsell-media-asset-container'>
      <Media
        type={state.type}
        value={state.value}
        alt=''
        className='media-assets'
      />
      <div className='editing-warper'>
        <InputRow className='editing-warper-from'>
          <InputRow.SelectOption
            value={state.type}
            name='type'
            // error={errors.assets && errors.assets.assetsType}
            onChange={onChange}
            className='asset-type'
            options={[
              { label: 'Video', value: 'video' },
              { label: 'Image', value: 'image' }
            ]}
          />
          {state.type === 'image'
            ? (
              <InputRow.AddImage
                value={state.value}
                source='assets_link'
                onUploaded={onAssetImageChange}
                name='assets.assetLink'
                className='upsell-image-alignment'
              >
                Upload Image
              </InputRow.AddImage>
            )
            : (
              <InputRow.TextField
                value={state.value}
                // error={errors.assets && errors.assets.assetLink}
                name='value'
                onChange={onChange}
                placeholder='Enter Valid video link'
                className='asset-input-value'
              />
            )
          }
          <Button className='primary-color'>
            Submit
          </Button>
        </InputRow>
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
