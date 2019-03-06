import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SlideModal as Modal } from 'components/Modals';
import common from 'components/common';
import ids from 'shortid';
import UpsellFeature from 'components/UpsellFeature';
import UpsellActionButton from 'components/UpsellActionButton';
import * as upsellActions from 'actions/upsells';
import { UpsellSchema } from 'libs/validation';

const {
  InputRow,
  MainTitle,
  Button,
  ActivationSwitchInput,
  List,
  DisableEnableWrapper,
  FlexBoxesContainer
} = common;

const FeaturesList = ({
  list: features, onFeatureEnabled, onFeatureDisabled, onFeatureFieldChange, ...props
}) => (
  <List ordered className='upsell-features-list'>
    {features.map(({
      title, description: featureDescription, enabled, id: fId
    }, id) => (
      <DisableEnableWrapper
        onEnabled={onFeatureEnabled}
        onDisabled={onFeatureDisabled}
        key={ids.generate()}
        enabled={enabled}
        id={fId}
        className='upsell-feature-container'
      >
        <UpsellFeature
          title={title}
          description={featureDescription}
          number={id + 1}
          id={fId}
          onChange={onFeatureFieldChange}
        />
      </DisableEnableWrapper>
    ))}
  </List>
);

class UpsellForm extends Component {
  state = {
    upsell: {},
    newFeature: {},
    created: false,
    updated: false
  }

  updateUpselldetails = (upsell) => {
    const { features = [] } = upsell || {};

    this.setState({
      upsell: {
        ...upsell,
        features: features.length === 4 ? features : this.refactoredUpsellFeatures(features)
      }
    });
  }

  componentDidMount () {
    const { upsell } = this.props;
    this.updateUpselldetails(upsell);
  }

  refactoredUpsellFeatures = (features = []) => {
    const tf = {
      title: 'Click to Edit the Title',
      description: 'Click to edit the feature description',
      temp: true
    };
    // if (!features.length) return (tf).repeate(4);
    const newFeaturesList = [...features];
    for (let i = newFeaturesList.length; i < 4; i++) newFeaturesList[i] = tf;

    return newFeaturesList.map((f) => ({ ...f, id: ids.generate(), enabled: !f.temp }));
  }

  componentDidUpdate (prev) {
    const { upsells, upsell, onClose } = this.props;
    const { upsell: { _id: upsellId }, updated, created } = this.state;

    if (prev.upsell !== upsell) this.updateUpselldetails(upsell);

    // when an upsell is created
    if (upsells.length && upsells.length > prev.upsells.length && created) {
      this.setState({ created: false });
      this.state.created && onClose();
    }
    // when an upsell is updated

    if (upsellId === updated) {
      this.setState({ updated: '' });
      onClose();
    }
  }


  onUpsellFieldsChange = (name, value) => {
    const { upsell } = this.state;
    this.setState({
      upsell: {
        ...upsell,
        errors: { ...upsell.errors, [name]: '' },
        [name]: value,
      }
    });
  }

  onFieldChange = ({ target: { name, value }, ...rest }) => {
    this.onUpsellFieldsChange(name, value);
  }

  onUpsellPriceChange = ({ target: { value } }) => {
    const { price } = this.state.upsell;
    const amount = +(value);
    if (amount && Number.isInteger(amount)) this.onUpsellFieldsChange('price', { ...price, amount });
  }

  onFeatureEnabled = (id) => {
    const { features } = this.state.upsell;

    const newFeatures = features.map((f) => (f.id === id ? ({ ...f, enabled: true }) : f));

    this.onUpsellFieldsChange('features', newFeatures);
  }

  onFeatureDisabled = (id) => {
    const { features } = this.state.upsell;
    const newFeatures = features.map((f) => (f.id === id ? ({ ...f, enabled: false }) : f));

    this.onUpsellFieldsChange('features', newFeatures);
  }

  onCreate = async () => {
    const { upsell } = this.state;
    const { isValid, value, errors } = await this.onUpsellEncapsulation(upsell);

    if (!isValid) return this.onUpsellFieldsChange('errors', errors);

    this.props.createUpsell(value);
    this.setState({ created: true });
  }

  onUpdate = async () => {
    const { upsell } = this.state;
    const upsellId = upsell._id;
    const { isValid, value, errors } = await this.onUpsellEncapsulation(upsell);
    console.log(isValid, errors);
    if (!isValid) return this.onUpsellFieldsChange('errors', errors);
    console.log(value);
    this.props.updateUpsell({ body: value, upsellId });
    this.setState({ updated: upsellId });
  }

  onAssetTypeChange = ({ target: { value: assetsType } }) => {
    const { assets = {} } = this.state.upsell;
    this.onUpsellFieldsChange('assets', { ...assets, assetsType });
  }

  onAssetsLinkChange = ({ target: { value: assetLink } }) => {
    const { assets = {} } = this.state.upsell;
    this.onUpsellFieldsChange('assets', { ...assets, assetLink });
  }

  onAssetsImageLinkChange = (assetLink) => {
    const { assets = {} } = this.state.upsell;
    this.onUpsellFieldsChange('assets', { ...assets, assetLink });
  }

  onAssciatedProductChange = ({ target: { id, value } }) => {
    this.onUpsellFieldsChange('linkedProduct', id);
  }

  getProductNameById = (id) => {
    const product = this.props.products.find((p) => p._id === id) || {};
    return product.name || 'Search Product';
  }

  onToggleUpsellState = () => {
    const { upsell: { active, _id: upsellId } } = this.state;
    if (upsellId) {
      this.props.changeUpsellState({ upsellId, active: !active });
      this.onUpsellFieldsChange('active', active);
    }
  }

  onActionBtnTextChange = ({ target: { value: text } }) => {
    const { actionBtn = {} } = this.state.upsell;
    actionBtn.text = text;
    if (text.length <= 20) this.onUpsellFieldsChange('actionBtn', actionBtn);
  }

  onActionBtnColorChange = (color) => {
    const { actionBtn = {} } = this.state.upsell;
    actionBtn.color = color;
    this.onUpsellFieldsChange('actionBtn', actionBtn);
  }

  onFeatureFieldChange = (featureId, { target: { name, value } }) => {
    const { features } = this.state.upsell;
    const newFeatures = features.map((f) => (f.id === featureId ? ({ ...f, [name]: value }) : f));
    if (value) this.onUpsellFieldsChange('features', newFeatures);
  }

  onUpsellEncapsulation = (upsell) => {
    upsell.features = upsell.features
      .filter(({ enabled }) => enabled)
      .map(({ title, description }) => ({ title, description }));
    return UpsellSchema(upsell);
  }

  render () {
    const {
      state: {
        upsell: {
          featuresTitle,
          features = [],
          _id: upsellId,
          name,
          description,
          assets: { assetsType, assetLink } = {},
          price = {},
          linkedProduct,
          fulfillment,
          errors = {},
          actionBtn = {},
          active: UpsellState
        }
      },
      props: {
        products, errors: genralErrors = {}, newUpsell, show: isVisible, onClose
      }
    } = this;

    return (
      <Modal onClose={onClose} isVisible={isVisible} className='upsell-modal-form'>
        <FlexBoxesContainer className='space-between-elements upsell-modal-head'>
          <MainTitle>{newUpsell ? 'Create New Upsell' : 'Update Upsell'}</MainTitle>
          {upsellId && <ActivationSwitchInput active={UpsellState} onToggle={this.onToggleUpsellState} />}
        </FlexBoxesContainer>
        <InputRow>
          <InputRow.Label error={errors.name}>Upsell Name:</InputRow.Label>
          <InputRow.SmallInput name='name' value={name} error={errors.name} onChange={this.onFieldChange} />
          <InputRow.PriceField
            className='margin-left-15'
            name='price'
            value={price.amount}
            error={errors.price && errors.price.amount}
            onChange={this.onUpsellPriceChange}
            children='Price'
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.description}>Upsell Description:</InputRow.Label>
          <InputRow.TextAreaInput
            name='description'
            value={description}
            error={errors.description}
            countable
            min={0}
            max={40}
            onChange={this.onFieldChange}
          />
        </InputRow>

        <InputRow>
          <InputRow.Label error={errors.assets && errors.assets.assetsType}>Asset Type:</InputRow.Label>
          <InputRow.SelectOption
            value={assetsType}
            name='assetsType'
            error={errors.assets && errors.assets.assetsType}
            onChange={this.onAssetTypeChange}
            className='asste-type-dropdown'
            options={[
              { label: 'Video', value: 'video' },
              { label: 'Image', value: 'image' }
            ]}
          />
          {assetsType === 'image'
            ? (
              <InputRow.AddImage
                className='upsell-asset-image'
                value={assetLink}
                source='assets_link'
                onUploaded={this.onAssetsImageLinkChange}
                name='assets_link'
                children='Upload Image'
              />
            )
            : (
              <InputRow.NormalInput
                error={errors.assets}
                value={assetLink}
                error={errors.assets && errors.assets.assetsLink}
                name='assetLink'
                onChange={this.onAssetsLinkChange}
                className='margin-left-15'
                children='Enter a valid link for the image/video'
              />
            )
          }
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.featuresTitle}>Features Title:</InputRow.Label>
          <InputRow.NormalInput
            name='featuresTitle'
            value={featuresTitle}
            error={errors.featuresTitle}
            onChange={this.onFieldChange}
            error={errors.featuresTitle}
          />
        </InputRow>
        <InputRow>
          <FeaturesList
            list={features}
            onFeatureEnabled={this.onFeatureEnabled}
            onFeatureDisabled={this.onFeatureDisabled}
            onFeatureFieldChange={this.onFeatureFieldChange}
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.fulfillment}>Upsell fulfillment link:</InputRow.Label>
          <InputRow.UrlInput
            name='fulfillment'
            value={fulfillment}
            error={errors.fulfillment}
            onChange={this.onFieldChange}
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.linkedProduct}>Associated Product:</InputRow.Label>
          <InputRow.SearchInput
            data={products}
            defaultValue={this.getProductNameById(linkedProduct)}
            target='name'
            name='linkedProduct'
            error={errors.linkedProduct}
            onChange={this.onAssciatedProductChange}
          />
        </InputRow>
        <InputRow>
          <InputRow.Label
            error={errors.actionBtn && errors.actionBtn.text}
            notes='The action Button Can just accepts 20 character '
          >
            Upsell Action Button:

          </InputRow.Label>
          <InputRow.SmallInput
            value={actionBtn.text}
            error={errors.actionBtn && errors.actionBtn.text}
            error={errors.actionBtn}
            onChange={this.onActionBtnTextChange}
          />
          <UpsellActionButton
            text={actionBtn.text}
            color={actionBtn.color}
            onChange={this.onActionBtnColorChange}
          />
        </InputRow>
        {genralErrors.message && <span className='error-message'>{genralErrors.message}</span>}
        <Button onClick={!upsellId ? this.onCreate : this.onUpdate} classes='primary-color margin-with-float-right'>
          <i className={`fas fa-${!upsellId ? 'plus' : 'edit'}`} />
          {!upsellId ? 'Create' : 'Update'}
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = ({ products: { products }, upsells: { errors, list: upsells } }) => ({
  products,
  upsells,
  errors
});
export default connect(mapStateToProps, upsellActions)(UpsellForm);
