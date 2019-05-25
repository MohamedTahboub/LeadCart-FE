import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { SlideModal } from '../Modals';
import common from '../common';
import ids from 'shortid';
import UpsellFeature from '../UpsellFeature';
import UpsellActionButton from '../UpsellActionButton';
import * as upsellActions from 'actions/upsells';
import { UpsellSchema } from 'libs/validation';
import TwitterPicker from 'react-color/lib/components/twitter/Twitter';
import verticalLayoutImage from 'assets/images/upsells/vertical.png'
import horizontalLayoutImage from 'assets/images/upsells/horizontal.png'

import './style.css'
const castFulfillmentList = (fulfillments) => fulfillments.map(({ name: label, _id: value }) => ({ label, value }));
const {
  InputRow,
  MainTitle,
  Button,
  ActivationSwitchInput,
  List,
  SubTabs,
  FlexBoxesContainer
} = common;

const FeaturesList = ({
  features: featuresList = [],
  onFeaturesChange,
  ...props
}) => {

  const [features, setFeatures] = useState(featuresList)

  const onFeatureChange = ({ id, value }) => {
    const newList = features.map((feature) => {
      if (feature.id === id)
        return { id, value }
      return feature
    });

    setFeatures(newList)
    // onFeaturesChange(newList)
  }

  const onAddFeature = () => {
    if (features.length >= 4) return;
    const newList = [...features,
    {
      _id: ids.generate(),
      title: 'change title',
      description: 'feature description ...'
    }];
    setFeatures(newList)
    // onFeaturesChange(newList)
  }
  const onRemoveFeature = id => {
    const newList = features.filter(({ _id }) => _id !== id);
    setFeatures(newList)
  }

  return (
    <List onAdd={onAddFeature} ordered className='upsell-features-list'>
      {features.map(({
        title, description, _id: id
      }, number) => (
          <UpsellFeature
            key={id}
            id={id}
            number={number + 1}
            title={title}
            description={description}
            onChange={onFeatureChange}
            onRemove={onRemoveFeature.bind(this, id)}
          />
        ))}
    </List>
  )
};

const UpsellForm = ({
  fulfillments,
  products,
  updateForm,
  errors: outerError,
  upsells,
  show: isVisible,
  ...props
}) => {

  const upsell = upsells.find(u => u._id === isVisible) || {}

  const [upsellModel, setUpsellModel] = useState(upsell);
  const [errors, setErrors] = useState(outerError)


  const onUpsellFieldsChange = ({ name, value }) => {

    setUpsellModel({ ...upsellModel, [name]: value })
    setErrors({})
  }

  const onCreate = async () => {
    try {

      const { isValid, value, errors } = await onUpsellEncapsulation(upsellModel);

      if (!isValid) return setErrors(errors);

      props.createUpsell(value, {
        onSuccess: () => props.onClose(),
        onFailed: (error) => setErrors(error)
      });

      setUpsellModel({ ...upsellModel, created: true });
    } catch ({ message }) {
      setErrors({ message });
    }
  }

  const onUpdate = async () => {
    try {
      const { isValid, value, errors } = await onUpsellEncapsulation(upsellModel);
      if (!isValid) return setErrors(errors);

      props.updateUpsell({
        body: value,
        upsellId: upsellModel._id
      },
        {
          onSuccess: (m) => {
            props.onClose()
          },
          onFailed: (error) => setErrors(error)
        });
    } catch ({ message }) {
      setErrors({ message });
    }
  }


  const onToggleUpsellState = () => {
    const { active } = upsellModel;
    // props.changeUpsellState({ upsellId, active: !active });
    onUpsellFieldsChange({ name: 'active', value: !active });
  }

  const onActionBtnColorChange = (color) => {
    const { actionBtn = {} } = upsellModel;
    actionBtn.color = color;
    onUpsellFieldsChange({ name: 'actionBtn', value: actionBtn });
  }

  const onFieldChange = ({ target: { value, name } }) => {

    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = upsellModel[key] ? { ...upsellModel[key], ...nestedValue } : nestedValue;
    }


    onUpsellFieldsChange({ name, value })
  }
  const onUpsellEncapsulation = (upsell) => {
    return UpsellSchema(upsell);
  }

  const onAssetImageChange = value => {
    onFieldChange({ target: { name: 'assets.assetLink', value } })
  }

  const {
    active: upsellState,
    price = {},
    name,
    description,
    assets: { assetLink, assetsType } = {},
    featuresTitle,
    upsellLayout = 'vertical',
    features,
    fulfillment,
    linkedProduct,
    actionBtn = {},

  } = upsellModel

  return (
    <SlideModal
      onClose={props.onClose}
      isVisible={isVisible}
      className='upsell-modal-form'
      header={(
        <FlexBoxesContainer className='space-between-elements upsell-modal-head'>
          <MainTitle>
            {!updateForm ? 'Create New Upsell' : 'Update Upsell'}
          </MainTitle>
          {updateForm && (
            <ActivationSwitchInput
              active={upsellState}
              onToggle={onToggleUpsellState}
            />
          )}
        </FlexBoxesContainer>
      )}
    >
      <SubTabs
        defaultTab='Main Details'
        tabs={{
          'Main Details': (
            <div className='upsell-form-container'>
              <InputRow>
                <InputRow.Label error={errors.name}>Upsell Name:</InputRow.Label>
                <InputRow.SmallInput name='name' value={name} error={errors.name} onChange={onFieldChange} />
                <InputRow.PriceField
                  className='margin-left-15'
                  name='price.amount'
                  value={price.amount}
                  error={errors.price && errors.price.amount}
                  onChange={onFieldChange}
                >
                  Price
          </InputRow.PriceField>
              </InputRow>
              <InputRow>
                <InputRow.Label error={errors.description}>Upsell Description:</InputRow.Label>
                <InputRow.TextAreaInput
                  width='420px'
                  name='description'
                  value={description}
                  error={errors.description}
                  countable
                  min={0}
                  max={40}
                  onChange={onFieldChange}
                />
              </InputRow>

              <InputRow>
                <InputRow.Label error={errors.assets && errors.assets.assetsType}>Asset Type:</InputRow.Label>
                <InputRow.SelectOption
                  value={assetsType}
                  name='assets.assetsType'
                  error={errors.assets && errors.assets.assetsType}
                  onChange={onFieldChange}
                  className='asste-type-dropdown'
                  options={[
                    { label: 'Video', value: 'video' },
                    { label: 'Image', value: 'image' }
                  ]}
                />
                {assetsType === 'image'
                  ? (
                    <InputRow.AddImage
                      value={assetLink}
                      source='assets_link'
                      onUploaded={onAssetImageChange}
                      name='assets.assetLink'
                      className='upsell-image-alignment'
                    >
                      Upload Image
              </InputRow.AddImage>
                  )
                  : (
                    <InputRow.NormalInput
                      value={assetLink}
                      error={errors.assets && errors.assets.assetLink}
                      name='assets.assetLink'
                      onChange={onFieldChange}
                      className='margin-left-15'
                    >
                      Enter a valid link for the image/video
              </InputRow.NormalInput>
                  )
                }
              </InputRow>
              <InputRow>
                <InputRow.Label error={errors.featuresTitle}>Features Title:</InputRow.Label>
                <InputRow.NormalInput
                  name='featuresTitle'
                  value={featuresTitle}
                  onChange={onFieldChange}
                  error={errors.featuresTitle}
                />
              </InputRow>
              <InputRow className='upsell-features-container'>
                <FeaturesList
                  features={features}
                // onFeatureEnabled={this.onFeatureEnabled}
                // onFeatureDisabled={this.onFeatureDisabled}
                // onFeatureFieldChange={this.onFeatureFieldChange}
                />
              </InputRow>
              <InputRow>
                <InputRow.Label error={errors.fulfillment}>Upsell fulfillment link:</InputRow.Label>
                <InputRow.SearchInput
                  // size='small'
                  options={castFulfillmentList(fulfillments)}
                  defaultValue={fulfillment}
                  name='fulfillment'
                  error={errors.fulfillment}
                  onChange={onFieldChange}
                />
              </InputRow>
              <InputRow>
                <InputRow.Label error={errors.linkedProduct}>Associated Product:</InputRow.Label>
                <InputRow.SearchInput
                  options={products.map(({ _id: value, name: label }) => ({ label, value }))}
                  defaultValue={linkedProduct}
                  target='name'
                  name='linkedProduct'
                  error={errors.linkedProduct}
                  onChange={onFieldChange}
                />
              </InputRow>
            </div>
          ),
          'Aesthetic Details': (
            <div className='upsell-form-container'>
              <InputRow>
                <InputRow.Label>Upsell Layout(Vertical/horizontal):</InputRow.Label>
                <InputRow.CheckBox
                  checked={upsellLayout === 'vertical'}
                  className='upsell-layout'
                  onChange={onFieldChange.bind(this, { target: { name: 'upsellLayout', value: 'vertical' } })}
                >
                  <img
                    src={verticalLayoutImage}
                    width="80px"
                    height="93.5px"
                    alt="vertical"
                    className='upsell-layout-image'
                  />
                </InputRow.CheckBox>
                <InputRow.CheckBox
                  checked={upsellLayout === 'horizontal'}
                  className='upsell-layout'
                  onChange={onFieldChange.bind(this, { target: { name: 'upsellLayout', value: 'horizontal' } })}
                >
                  <img
                    src={horizontalLayoutImage}
                    height="80px"
                    width='164.8px'
                    alt="horizontal"
                    className='upsell-layout-image'
                  />
                </InputRow.CheckBox>
              </InputRow>
              <InputRow margin={50}>
                <InputRow.Label
                  error={errors.actionBtn && errors.actionBtn.text}
                  notes='The action Button Can just accepts 20 character '
                >
                  Action Button Text:
              </InputRow.Label>
                <InputRow.SmallInput
                  value={actionBtn.text}
                  name='actionBtn.text'
                  error={errors.actionBtn && errors.actionBtn.text}
                  onChange={onFieldChange}
                />
                <UpsellActionButton
                  text={actionBtn.text}
                  color={actionBtn.color}
                />
              </InputRow>
              <InputRow>
                <InputRow.Label>
                  Action Button Color:
                  </InputRow.Label>
                <TwitterPicker
                  triangle='hide'
                  color={actionBtn.color}
                  onChange={({ hex }) => onActionBtnColorChange(hex)}
                />
              </InputRow>
            </div>
          )
        }}
      />

      {errors.message && <span className='error-message'>{errors.message}</span>}
      {outerError.message && <span className='error-message'>{outerError.message}</span>}
      <div className='upsell-controls'>
        <Button onClick={!updateForm ? onCreate : onUpdate} className='primary-color margin-with-float-right'>
          <i className={`fas fa-${!updateForm ? 'plus' : 'edit'}`} />
          {!updateForm ? 'Create' : 'Update'}
        </Button>
      </div>
    </SlideModal>
  );
}


const mapStateToProps = ({
  products: { products },
  upsells: { errors, list: upsells },
  fulfillments: { list: fulfillments = [] } = {}
}) => ({
  products,
  upsells,
  fulfillments,
  errors
});
export default connect(mapStateToProps, upsellActions)(UpsellForm);
