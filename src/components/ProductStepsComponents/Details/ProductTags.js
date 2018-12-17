import React from 'react';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';

const { InputRow } = common;


const ProductTags = ({ tags = [], onMandatoryDetailsFieldChange }) => {
  const onTagsChange = (tags) => {
    onMandatoryDetailsFieldChange({ name: 'tags', value: tags });
  };

  return (
    <InputRow>
      <InputRow.Label>Product Tags</InputRow.Label>
      <InputRow.EditableTagGroup tags={tags} onTagsChange={onTagsChange}>Product Tags</InputRow.EditableTagGroup>
    </InputRow>
  );
};
const mapStateToProps = ({ product: { mandatoryDetails } }) => ({ ...mandatoryDetails });

export default connect(mapStateToProps, producActions)(ProductTags);
