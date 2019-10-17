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
}) => (type === 'image'
  ? (<img src={value} alt='asset link' {...props} />)
  : (<ReactPlayer url={value} playing={autoPlay} {...props} />));

// Media.propTypes ={
//   type:PropTypes
// }

const {
  InputRow,
  // MainTitle,
  Button,
  // ActivationSwitchInput,
  // List,
  // SubTabs,
  // FlexBoxesContainer
} = common;

const MediaAsset = ({ product: { pagePreferences: { asset = {} } = {} } = {}, ...props }) => {
  // const { asset= {} } = product.pagePreferences
  const [state, setState] = useState({ type: 'video', ...asset });
  const [changed, setChanged] = useState(false);


  const onChange = ({ target: { name, value } }) => {
    setState((state) => ({
      ...state,
      [name]: value
    }));
  };

  const onSubmit = () => {
    props.onChange && props.onChange({
      target: {
        name: 'pagePreferences.asset',
        value: {
          type: state.type,
          link: state.link
        }
      }
    });
    setChanged(false);
  };

  // useEffect(() => {
  //   console.log('UPDATESSS', asset);
  //   if (asset.type !== state.type || asset.link !== state.link) setState(asset);
  // }, [asset]);

  const onAssetImageChange = (image) => {
    onChange({ target: { name: 'value', value: image } });
  };

  const onEditMode = () => {
    setChanged(true);
  };

  return (
    <div className='upsell-media-asset-container'>
      <Media
        type={state.type}
        value={state.link}
        alt=''
        className='media-assets'
      />
      {changed ? (
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
                  value={state.link}
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
                  value={state.link}
                  // error={errors.assets && errors.assets.assetLink}
                  name='link'
                  onChange={onChange}
                  placeholder='Enter Valid video link'
                  className='asset-input-value'
                />
              )
            }
            <Button onClick={onSubmit} className='primary-color'>
              Submit
            </Button>
          </InputRow>
        </div>
      )
        : (
          <div className='editing-warper edit-btn-warper'>
            <div onClick={onEditMode} className='asset-edit-btn'>
              <i className='fas fa-pen' />
            </div>
          </div>
        )
      }
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
