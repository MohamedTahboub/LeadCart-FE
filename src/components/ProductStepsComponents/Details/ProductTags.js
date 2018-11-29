import React from 'react';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';

const { InputRow } = common;


const ProductTags = ({ productDetails: { tags = [] }, ...props }) => {
  const onTagsChange = (tags) => {
    props.onProductDetailsFieldChange({ name: 'tags', value: tags });
  };

  return (
    <InputRow>
      <InputRow.Label>Product Tags</InputRow.Label>
      <InputRow.EditableTagGroup tags={tags} onTagsChange={onTagsChange}>Product Tags</InputRow.EditableTagGroup>
    </InputRow>
  );
};
const mapStateToProps = (state) => ({
  productDetails: state.product.details,
  errors: state.product.details.errors,
});

export default connect(mapStateToProps, producActions)(ProductTags);
