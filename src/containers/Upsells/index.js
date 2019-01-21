import React, { Component } from 'react';
import upsellsData from 'data/upsells.json';
// import Upsells from './sub/Upsells'
// import Funnels from './sub/Funnels'
import Modal from 'components/Modal';
import UpsellForm from './newUpsellModal';
import './style.css';
// import ProductDetailes from './sub/ProductDetails'

import common from 'components/common';

console.log(UpsellForm)
const {
  InputRow, UpsellCard, MainTitle, FlexBoxesContainer, Button, MainBlock
} = common;
const NewUpsell = ({ onClick, ...props }) => (
  <Button onClick={onClick} classes='primary-color'>
    <i className='fas fa-plus' />
    {' '}
    New Upsells
  </Button>
);

const DeleteDialuge = ({
  onClose, show, onConfirem, ...props
}) => (
    <Modal onClose={onClose} isVisable={show}>
      <MainTitle>Are you sure,you want delete this upsell ?</MainTitle>
      <Button onClick={onClose} classes='primary-color margin-with-float-left'>
        {' '}
        Cancel
    </Button>
      <Button onClick={onConfirem} classes='warning-color margin-with-float-right'>
        <i className='fas fa-trash-alt' />
        {' '}
        Delete
    </Button>
    </Modal>
  );
class Upsells extends Component {
  state = {
    showDeleteDialuge: false,
    showUpsellEditablePreview: false,
    showNewUpsellForm: false
  }

  toggleDeleteDialuge = () => {
    this.setState({ showDeleteDialuge: !this.state.showDeleteDialuge });
  }

  toggleUpsellEditablePreview = () => {
    this.setState({ showUpsellEditablePreview: !this.state.showUpsellEditablePreview });
  }

  toggleNewUpsellForm = () => {
    this.setState({ showNewUpsellForm: !this.state.showNewUpsellForm });
  }

  render() {
    const tabName = this.props.history.location.hash.slice(1);
    const { showDeleteDialuge, showNewUpsellForm } = this.state;
    return (
      <React.Fragment>
        <FlexBoxesContainer classes={['space-between-elements']}>
          <MainTitle >Upsells</MainTitle>
          <Button onClick={this.toggleNewUpsellForm} classes=' primary-color'>
            New Upsell
          </Button>
        </FlexBoxesContainer>
        <FlexBoxesContainer classes={['flex-wrap']}>
          {upsellsData.map((upsell) => (
            <UpsellCard
              {...upsell}
              onDelete={this.toggleDeleteDialuge}
              onEdit={this.toggleNewUpsellForm}
            />
          ))}
        </FlexBoxesContainer>
        <DeleteDialuge
          onClose={this.toggleDeleteDialuge}
          show={showDeleteDialuge}
          onConfirem={this.toggleDeleteDialuge}
        />
        <UpsellForm
          newUpsell={true}
          onClose={this.toggleNewUpsellForm}
          show={showNewUpsellForm}
          onConfirem={this.toggleNewUpsellForm}
        />
      </React.Fragment>

    );
  }
}


export default Upsells;
