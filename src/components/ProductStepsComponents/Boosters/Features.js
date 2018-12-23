import React, { Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import './style.css';

const { InputRow } = common;


const AddInputField = ({ onAdd }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { target: { content: { value } } } = e;

    onAdd(value);
  };
  return (
    <form onSubmit={onSubmit} className='add-input-field-container'>
      <InputRow.SmallInput name='content' autoComplete='off' />
      <input type='submit' className='add-input-field' value='Add' />
    </form>
  );
};

class EditableField extends Component {
  state = { editable: false, content: '' }

  componentDidMount () {
    const { content } = this.props;
    this.setState({ content });
  }

  onChange = ({ target: { value: content } }) => this.setState({ content })

  onEdit = () => this.setState({ editable: true })


  onSave = () => {
    this.setState({ editable: false });
    this.props.onSave(this.state.content);
  }

  componentDidUpdate (prevProps) {
    const { content } = this.props;
    if (prevProps.content !== content) this.setState({ content });
  }


  render () {
    const { editable, content } = this.state;
    const { onDelete } = this.props;
    return (
      <div className='editable-field-container'>
        <input
          type='text'
          className='editable-input-field'
          onChange={this.onChange} value={content}
          disabled={!editable}
        />
        <div className='editable-field-controlls'>
          {editable ? (
            <span onClick={this.onSave} className='add-field-btn editable-save-btn'>
              <i className='fas fa-save' />
            </span>
          )
            : (
              <Fragment>
                <span onClick={this.onEdit} className='add-field-btn editable-edit-btn'>
                  <i className='fas fa-pencil-alt' />
                </span>
                <span onClick={onDelete} className='add-field-btn editable-delete-btn'>
                  <i className='fas fa-trash-alt' />
                </span>
              </Fragment>
            )}
        </div>
      </div>
    );
  }
}

class ProductFeatures extends Component {
  state = {
    features: []
  }

  componentDidMount () {
    const { bulletPoints: features = [], bulletPointsTitle: featuresTitle } = this.props;
    this.setState({
      features,
      featuresTitle
    });
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductBoostersFieldChange({ name, value });
  }

  onBulletPointsChange = (points) => {
    this.props.onProductBoostersFieldChange({ name: 'bulletPoints', value: points.map(({ value }) => value) });
  };

  onFeatureEdit = (feature, newFeature) => {
    if (newFeature.trim().length > 3) {
      const newFeatures = this.state.features.map((f) => (f === feature ? newFeature : f));
      this.setState({
        features: newFeatures
      });
      this.props.onProductBoostersFieldChange({
        name: 'bulletPoints',
        value: newFeatures
      });
    }
  }

  onFeatureRemove = (feature = '') => {
    this.setState({
      features: this.state.features.filter((f) => f !== feature)
    });
  }

  onAddFeature = (feature = '') => {
    const { features } = this.state;
    if (features.length < 6 && feature.trim().length > 2) {
      const newFeatures = [...features, feature];
      this.setState({
        features: newFeatures
      });
      this.props.onProductBoostersFieldChange({
        name: 'bulletPoints',
        value: newFeatures
      });
    }
  }


  render () {
    const { features, featuresTitle } = this.state;
    return (
      <Fragment>
        <InputRow>
          <InputRow.Label>Features Title</InputRow.Label>
          <InputRow.SmallInput name='bulletPointsTitle' value={featuresTitle} onChange={this.onFieldChange}></InputRow.SmallInput>
        </InputRow>
        <InputRow>
          <InputRow.Label>Features</InputRow.Label>
          <AddInputField onAdd={this.onAddFeature} />
        </InputRow>
        <InputRow>
          <InputRow.Label />
          <div className='features-list-container'>
            {features.map((feature, id) => (
              <EditableField
                key={id}
                onSave={(newFeature) => this.onFeatureEdit(feature, newFeature)}
                onDelete={() => this.onFeatureRemove(feature)}
                content={feature}
              />
            ))
            }
          </div>
        </InputRow>
      </Fragment>
    );
  }
}


const mapStateToProps = ({ product: { boosters } }) => ({ ...boosters });
export default connect(mapStateToProps, producActions)(ProductFeatures);
