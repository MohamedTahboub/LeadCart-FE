import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal';
import common from 'components/common';
import ids from 'short-id';
import UpsellFeature from 'components/UpsellFeature';
import UpsellActionButton from 'components/UpsellActionButton';
import * as upsellActions from 'actions/upsells';

const {
  InputRow,
  MainTitle,
  Button,
  ActivationSwitchInput,
  List,
  DisableEnableWrapper,
  FlexBoxesContainer
} = common;


class UpsellForm extends Component {
  state = {
    upsell: {},
    newFeature: {}
  }

  updateUpselldetails = (upsell) => {
    const { features = [] } = upsell || {};
    this.setState({
      upsell: {
        ...upsell,
        features: this.refactoreUpsellFeatures(features)
      }
    });
  }

  componentDidMount () {
    const { upsell, newUpsell } = this.props;
    this.updateUpselldetails(upsell);
  }

  refactoreUpsellFeatures = (features = []) => {
    const tf = { title: 'Click to Edit the Title', description: 'Click to edit the feature description', enabled: false };
    const newFeaturesList = [...features];
    for (let i = newFeaturesList.length; i < 4; i++) newFeaturesList[i] = tf;

    return newFeaturesList.map((f) => ({ ...f, id: ids.generate(), enabled: typeof f.enabled === 'undefined' }));
  }

  componentDidUpdate (prev) {
    const { upsell } = this.props;

    if (prev.upsell !== upsell) this.updateUpselldetails(upsell);
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

  onCreate = () => {
    const { upsell } = this.state;

    console.log(upsell);
    // this.props.createUpsell(upsell);
  }

  onUpdate = () => {
    const { upsell } = this.state;
    this.props.updateUpsell(upsell);
  }

  onAssetTypeChange = ({ target: { value: assetsType } }) => {
    const { assets = {} } = this.state.upsell;
    this.onUpsellFieldsChange('assets', { ...assets, assetsType });
  }

  onAssetsLinkChange = ({ target: { value: assetLink } }) => {
    const { assets = {} } = this.state.upsell;
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

  render () {
    const {
      state: {
        upsell: {
          features = [],
          name,
          upsellIntro,
          assets: { assetsType, assetLink } = {},
          price: { amount: price } = {},
          linkedProduct,
          upsellFulfillment,
          actionBtn = {},
          active: UpsellState
        }
      },
      props: {
        products, errors, newUpsell, show: isVisible, onClose
      }
    } = this;

    return (
      <Modal onClose={onClose} isVisible={isVisible} className='upsell-modal-form'>
        <FlexBoxesContainer className='space-between-elements upsell-modal-head'>
          <MainTitle>{newUpsell ? 'Create New Upsell' : 'Update Upsell'}</MainTitle>
          {!newUpsell && <ActivationSwitchInput active={UpsellState} onToggle={this.onToggleUpsellState} />}
        </FlexBoxesContainer>
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
          <InputRow.Label error={errors.description}>Upsell Description:</InputRow.Label>
          <InputRow.TextAreaInput
            // placeholder='Feature Description'
            name='description'
            countable
            min={0}
            max={40}
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
          <InputRow.NormalInput
            name='featuresTitl'
            onChange={this.onFieldChange}
            error={errors.featuresTitle}
          />
        </InputRow>
        <InputRow>
          <List ordered className='upsell-features-list'>
            {features.map(({
              title, description, enabled, id: fId
            }, id) => (
              <DisableEnableWrapper
                onEnabled={this.onFeatureEnabled}
                onDisabled={this.onFeatureDisabled}
                key={fId}
                enabled={enabled}
                id={fId}
                className='upsell-feature-container'
              >
                <UpsellFeature
                  title={title}
                  description={description}
                  number={id + 1}
                  id={fId}
                  onChange={this.onFeatureFieldChange}
                />
              </DisableEnableWrapper>
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
        <InputRow>
          <InputRow.Label
            error={errors.actionBtn}
            notes='The action Button Can just accepte 20 character '
          >
            Upsell Action Button:

          </InputRow.Label>
          <InputRow.SmallInput
            name='name'
            value={actionBtn.text}
            error={errors.actionBtn}
            onChange={this.onActionBtnTextChange}
          />
          <UpsellActionButton
            text={actionBtn.text}
            color={actionBtn.color}
            onChange={this.onActionBtnColorChange}
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
