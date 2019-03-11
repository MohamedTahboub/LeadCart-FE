import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { SlideModal } from '../Modals';
import common from '../common';
import ids from 'shortid';
import UpsellFeature from '../UpsellFeature';
import UpsellActionButton from '../UpsellActionButton';
import * as upsellActions from 'actions/upsells';
import { UpsellSchema } from 'libs/validation';
import { TwitterPicker } from 'react-color';

import './style.css'

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

    setFeatures(newList) //update local changes
    onFeaturesChange(newList)// update parent with changes
  }

  return (
    <List ordered className='upsell-features-list'>
      {features.map(({
        title, description: featureDescription, id
      }, number) => (
          <UpsellFeature
            key={id}
            id={id}
            number={number + 1}
            title={title}
            description={featureDescription}
            onChange={onFeatureChange}
          />
        ))}
    </List>
  )
};

const UpsellForm = ({ upsell = {}, products, updateForm, errors: outerError, upsells, show: isVisible, ...props }) => {

  const [upsellModel, setUpsellModel] = useState(upsell);
  const [errors, setErrors] = useState(outerError)


  const onUpsellFieldsChange = ({ name, value }) => {
    console.log(name, value)
    setUpsellModel({ ...upsellModel, [name]: value })
  }

  const onCreate = async () => {
    try {

      const { isValid, value, errors } = await onUpsellEncapsulation(upsellModel);

      if (!isValid) return onUpsellFieldsChange('errors', errors);

      props.createUpsell(value);
      setUpsellModel({ ...upsellModel, created: true });
    } catch ({ message }) {
      setErrors({ message });
    }
  }

  const onUpdate = async () => {
    try {
      const { isValid, value, errors } = await onUpsellEncapsulation(upsellModel);
      if (!isValid) return this.onUpsellFieldsChange('errors', errors);

      props.updateUpsell({ body: value, upsellId: upsellModel._id });
      setUpsellModel({ updated: upsellModel._id });
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
      const [key, nestedKey] = name.split('.')
      console.log(key, nestedKey)
      const nestedValue = { [nestedKey]: value }
      name = key;
      value = upsellModel[key] ? { ...upsellModel[key], ...nestedValue } : nestedValue
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
            <Fragment>
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
                      error={errors.assets && errors.assets.assetsLink}
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
              <InputRow>
                <FeaturesList
                  features={features}
                // onFeatureEnabled={this.onFeatureEnabled}
                // onFeatureDisabled={this.onFeatureDisabled}
                // onFeatureFieldChange={this.onFeatureFieldChange}
                />
              </InputRow>
              <InputRow>
                <InputRow.Label error={errors.fulfillment}>Upsell fulfillment link:</InputRow.Label>
                <InputRow.UrlInput
                  name='fulfillment'
                  value={fulfillment}
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
            </Fragment>
          ),
          'Aesthetic Details': (
            <Fragment>
              <InputRow>
                <InputRow.Label>Upsell Layout(Vertical/horizontal):</InputRow.Label>
                <InputRow.CheckBox
                  className='upsell-layout'
                  onChange={onFieldChange.bind(this, { target: { name: 'upsellLayout', value: 'vertical' } })}
                >
                  <img
                    src="https://i.imgur.com/SwhDxF8.png"
                    width="80px"
                    alt="vertical"
                    className='upsell-layout-image'
                  />
                </InputRow.CheckBox>
                <InputRow.CheckBox
                  className='upsell-layout'
                  onChange={onFieldChange.bind(this, { target: { name: 'upsellLayout', value: 'horizontal' } })}
                >
                  <img
                    src="https://i.imgur.com/1ewqk3f.png"
                    height="80px"
                    alt="horizontal"
                    className='upsell-layout-image'
                  />
                </InputRow.CheckBox>
              </InputRow>
              <InputRow>
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
            </Fragment>
          )
        }}
      />

      {errors.message && <span className='error-message'>{errors.message}</span>}
      <Button onClick={!updateForm ? onCreate : onUpdate} className='primary-color margin-with-float-right'>
        <i className={`fas fa-${!updateForm ? 'plus' : 'edit'}`} />
        {!updateForm ? 'Create' : 'Update'}
      </Button>
    </SlideModal>
  );
}


const mapStateToProps = ({ products: { products }, upsells: { errors, list: upsells } }) => ({
  products,
  upsells,
  errors
});
export default connect(mapStateToProps, upsellActions)(UpsellForm);
