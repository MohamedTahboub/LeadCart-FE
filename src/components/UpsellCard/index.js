import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as upsellsActions from 'actions/upsells'
import UpsellForm from '../UpsellForm';
import Dialog from '../common/Dialog';
import { connect } from 'react-redux';

import { EasyAnimate } from "../common/Animation";
import { Avatar } from '../common/Cards';
import { openNewWindow } from "libs";

import './style.css'


export const UpsellCard = (props) => {
  const {
    upsell = {},
    linkedProduct: { productName, productLink } = {}
  } = props;

  const {
    name,
    orderInlist,
    id,
    active,
    price: { amount: price } = {},
    onEdit,
    onPreview,
    onDelete
  } = upsell

  const [state, setState] = useState({
    showNewUpsellForm: false,
    showDeleteDialog: false
  });
  const [show, setShow] = useState(false)
  const toggleDeleteDialog = () => {
    setState({ ...state, showDeleteDialog: !state.showDeleteDialog });
  };
  const toggleEditModal = () => {
    setShow(!show);
  };

  const onDeleteUpsell = () => {
    props.deleteUpsell(id);
  };


  const { showDeleteDialog, showNewUpsellForm } = state;

  console.log("==============showNewUpsellForm==============>", showNewUpsellForm)
  return (
    <EasyAnimate delay={orderInlist * 100} className={`upsell-card-container ${active ? 'active-product' : 'inactive-product'}`}>
      <div className='card-main-content product-avatar-holder'>
        <Avatar name={name} />
        <span className='product-name-holder'>{name}</span>
        <span
          onClick={() => productLink && openNewWindow(`/product/${productLink}/details`)}
          className={`product-salles-holder ${productLink ? 'item-clickable' : ''}`}
        >
          <i className='fas fa-link' />
          {productName}
        </span>
        <span className='product-price-holder'>{`$ ${price}`}</span>
      </div>
      <div className='card-controlls-container'>
        <i onClick={toggleEditModal} className='fas fa-edit' />
        <i className='fas fa-book-open' />
        <i onClick={toggleDeleteDialog} className='fas fa-trash-alt' />
      </div>
      <UpsellForm
        show={show}
        upsell={upsell}
        updateForm
        onClose={toggleEditModal}
      />
      <Dialog
        title='Deleting upsell'
        description={`Are you sure,you want delete ${name} upsell ?`}
        show={showDeleteDialog}
        onClose={toggleDeleteDialog}
        confirmBtnText='Delete'
        onConfirm={onDeleteUpsell}
      />
    </EasyAnimate>
  );
};
UpsellCard.propTypes = {
  name: PropTypes.string,
  orderInlist: PropTypes.number,
  active: PropTypes.bool
};

export default connect(null, upsellsActions)(UpsellCard)
  ;