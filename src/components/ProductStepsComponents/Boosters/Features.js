import React, { useState, Component, Fragment } from 'react';
import common from 'components/common';

import { connect } from 'react-redux';
import * as productActions from 'actions/product';
import './style.css';

const { InputRow, EditableInputField } = common;


const AddInputField = ({ onAdd }) => {
  const [feature, setFeature] = useState('');

  const onChange = ({ target: { value } }) => {
    if (value) setFeature(value);
  };
  const onSubmit = () => onAdd(feature);
  return (
    <form className='add-input-field-container'>
      <InputRow.TextAreaInput
        className='feature-text-area'
        onChange={onChange}
        value={feature}
        name='content'
        max={10}
        min={0}
        countable
        autoComplete='off'
      />
      <span onClick={onSubmit} className='btn primary-color add-input-field'>Add new Feature</span>
    </form>
  );
};

class ProductFeatures extends Component {
  state = {
    features: []
  }

  componentDidMount () {
    const { features = [], featuresTitle } = this.props;
    this.setState({
      features,
      featuresTitle
    });
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductBoostersFieldChange({ name, value });
  }

  onFeatureEdit = (feature, newFeature) => {
    if (newFeature.trim().length > 3) {
      const newFeatures = this.state.features.map((f) => (f === feature ? newFeature : f));
      this.setState({
        features: newFeatures
      });
      this.props.onProductBoostersFieldChange({
        name: 'features',
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
        name: 'features',
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
          <InputRow.SmallInput name='featuresTitle' value={featuresTitle} onChange={this.onFieldChange}></InputRow.SmallInput>
        </InputRow>
        <InputRow>
          <InputRow.Label>Features</InputRow.Label>
          <AddInputField onAdd={this.onAddFeature} />
        </InputRow>
        <InputRow>
          <InputRow.Label />
          <div className='features-list-container'>
            {features.map((feature, id) => (
              <EditableInputField
                key={id}
                onSave={(newFeature) => this.onFeatureEdit(feature, newFeature)}
                onDelete={() => this.onFeatureRemove(feature)}
                content={feature}
                countable
                number={id + 1}
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
export default connect(mapStateToProps, productActions)(ProductFeatures);
