import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal';
import common from 'components/common';
import ids from 'short-id';
import UpsellFeature from 'components/UpsellFeature';
import * as upsellActions from 'actions/upsells';

const {
  InputRow, MainTitle, Button, List
} = common;
class UpsellForm extends Component {
  state = {
    upsell: {},
    newFeature: {}
  }

  componentDidMount() {
    const { upsell, newUpsell } = this.props;

    if (!newUpsell && upsell) {
      this.setState({
        upsell
      });
    }
  }

  componentDidUpdate(preProps) {
    const { upsell } = this.props;
    if (preProps.upsell !== upsell) this.setState({ upsell });
  }

  onUpsellFieldsChange = (name, value) => {
    const { upsell } = this.state;
    this.setState({
      upsell: {
        ...upsell,
        [name]: value
      }
    });
  }

  onFieldChange = ({ target: { name, value }, ...rest }) => {
    this.onUpsellFieldsChange(name, value);
  }

  onNewFeatureTitleChange = ({ target: { value } }) => {
    const { newFeature } = this.state;
    if (value.trim().length) {
      this.setState({
        newFeature: {
          ...newFeature,
          title: value
        }
      });
    }
  }

  onNewFeatureDescriptionChange = ({ target: { name, value } }) => {
    const { newFeature } = this.state;
    if (value.trim().length) {
      this.setState({
        newFeature: {
          ...newFeature,
          description: value
        }
      });
    }
  }

  onFeatureAdd = () => {
    const { upsell: { features = [], ...upsell }, newFeature } = this.state;
    if (features.length > 4) return;
    const newFeatures = [...features, newFeature];
    this.setState({
      upsell: {
        ...upsell,
        features: newFeatures
      }
    });
  }

  onCreate = () => {
    const { upsell } = this.state;
    setTimeout(() => {
      this.props.onClose();
    }, 150);
    this.props.createUpsell(upsell);
  }

  onUpdate = () => {
    const { upsell } = this.state;
    this.props.updateUpsell(upsell);
  }

  onAssetTypeChange = ({ target: { value: assetsType } }) => {
    const { assets } = this.state;
    this.onUpsellFieldsChange('assets', { ...assets, assetsType });
  }

  onAssetsLinkChange = ({ target: { value: assetLink } }) => {
    const { assets } = this.state;
    this.onUpsellFieldsChange('assets', { ...assets, assetLink });
  }

  onAssciatedProductChange = ({ target: { id, value } }) => {
    console.log(value, id);
    this.onUpsellFieldsChange('linkedProduct', id);
  }

  getProductNameById = (id) => {
    const product = this.props.products.find((p) => p._id === id) || {};
    return product.name || 'Search Product';
  }

  render() {
    const {
      state: {
        upsell: {
          features = [],
          name,
          upsellIntro,
          assets: { assetsType, assetLink } = {},
          price: { amount: price } = {},
          linkedProduct,
          upsellFulfillment
        }
      },
      props: {
        products, errors, newUpsell, show: isVisible, onClose
      }
    } = this;
    console.log(assetsType);
    return (
      <Modal onClose={onClose} isVisible={isVisible} className='upsell-modal-form'>
        <MainTitle
          bottomLine
        >
          Create New Upsell

        </MainTitle>
        <InputRow>
          <InputRow.Label error={errors.name}>Upsell Name:</InputRow.Label>
          <InputRow.SmallInput name='name' value={name} error={errors.name} onChange={this.onFieldChange} />
          <InputRow.PriceField
            className='margin-left-15'
            name='price'
            value={price}
            error={errors.price}
            onChange={this.onFieldChange}
            children='Upsell Price'
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.name}>Upsell Intro:</InputRow.Label>
          <InputRow.NormalInput
            name='upsellIntro'
            value={upsellIntro}
            error={errors.upsellIntro}
            onChange={this.onFieldChange}
          />
        </InputRow>

        <InputRow>
          <InputRow.Label error={errors.assets}>Asset Type:</InputRow.Label>
          <InputRow.SelectOption
            value={assetsType}
            name='assetsType'
            onChange={this.onAssetTypeChange}
            className='asste-type-dropdown'
            options={[
              { label: 'Video', value: 'video' },
              { label: 'Image', value: 'image' }
            ]}
          />
          <InputRow.NormalInput
            error={errors.assets}
            value={assetLink}
            name='assetLink'
            onChange={this.onAssetsLinkChange}
            className='margin-left-15'
          >
            Enter a valid link for the image/video
          </InputRow.NormalInput>
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.featuresTitle}>Features Title:</InputRow.Label>
          <InputRow.SmallInput
            name='featuresTitl'
            onChange={this.onFieldChange}
            error={errors.featuresTitle}
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.price}>Upsell Features:</InputRow.Label>
          <InputRow.SmallInput
            onChange={this.onNewFeatureTitleChange}
          >
            Feature title

          </InputRow.SmallInput>
          <input type='submit' onClick={this.onFeatureAdd} className='add-input-field' value='Add' />

        </InputRow>
        <InputRow>
          <InputRow.Label />
          <InputRow.TextAreaInput
            placeholder='Feature Description'
            countable
            min={0}
            max={40}
            onChange={this.onNewFeatureDescriptionChange}
          />
        </InputRow>
        <InputRow>
          <List ordered className='upsell-features-list'>
            {features.map((f, id) => (
              <UpsellFeature key={ids.generate()} id={id} {...f} />
            ))}
          </List>
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.upsellFulfillment}>Upsell fulfillment link:</InputRow.Label>
          <InputRow.UrlInput
            name='upsellFulfillment'
            value={upsellFulfillment}
            onChange={this.onFieldChange}
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.description}>Associated Product:</InputRow.Label>
          <InputRow.SearchInput
            data={products}
            defaultValue={this.getProductNameById(linkedProduct)}
            target='name'
            name='linkedProduct'
            onChange={this.onAssciatedProductChange}
          />
        </InputRow>
        {errors.message && <span className='error-message'>{errors.message}</span>}
        <Button onClick={newUpsell ? this.onCreate : this.onUpdate} classes='primary-color margin-with-float-right'>
          <i className={`fas fa-${newUpsell ? 'plus' : 'edit'}`} />
          {newUpsell ? 'Create' : 'Update'}
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = ({ products: { products }, upsells: { errors } }) => ({
  products,
  errors
});
export default connect(mapStateToProps, upsellActions)(UpsellForm);
