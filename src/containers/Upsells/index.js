import React, { Component } from 'react';
import { connect } from 'react-redux'
import ids from 'shortid'
import { Modal } from 'components/Modals';
import UpsellForm from './newUpsellModal';
import './style.css';
import * as upsellsActions from 'actions/upsells'

import common from 'components/common';
import { isDate } from 'moment';

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

const getProductById = ({ products, id }) => {
  const { name: productName, url: productLink } = products.find(({ id: i }) => i === id) || { url: 'unknown', name: 'not available' }
  return { productName, productLink }
}

const DeleteDialuge = ({
  onClose, show, onConfirm, ...props
}) => (
    <Modal onClose={onClose} isVisible={show}>
      <MainTitle>Are you sure,you want delete this upsell ?</MainTitle>
      <Button onClick={onClose} classes='primary-color margin-with-float-left'>
        {' '}
        Cancel
    </Button>
      <Button onClick={onConfirm} classes='warning-color margin-with-float-right'>
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
    showNewUpsellForm: false,
    products: [],
    isNewUpsell: true,
    stagedUpsell: {}
  }

  toggleDeleteDialuge = (id) => {
    const { stagedUpsell } = this.state
    this.setState({ showDeleteDialuge: !this.state.showDeleteDialuge, stagedUpsell: { ...stagedUpsell, id } });
  }

  toggleUpsellEditablePreview = () => {
    this.setState({ showUpsellEditablePreview: !this.state.showUpsellEditablePreview });
  }

  toggleNewUpsellForm = () => {
    this.setState({
      showNewUpsellForm: !this.state.showNewUpsellForm,
      isNewUpsell: true
    });
  }

  toggleEditUpsellForm = (id) => {
    this.setState({
      showNewUpsellForm: !this.state.showNewUpsellForm,
      isNewUpsell: false,
      stagedUpsell: this.props.upsells.find(({ _id }) => _id === id) || {}
    });

  }
  onDeleteUpsell = id => {
    const { stagedUpsell } = this.state
    this.setState({
      stagedUpsell: {
        ...stagedUpsell,
        deleted: true
      }
    })
    this.props.deleteUpsell(id);
  }
  componentDidMount() {
    // this.props.getUpsells()
  }

  componentDidUpdate() {
    const { upsells } = this.props
    const { stagedUpsell: { id :deletedUpsellId} } = this.state

    if (deletedUpsellId && !upsells.find(({_id:id})=>id === deletedUpsellId)) {
      this.toggleDeleteDialuge()
    }
  }
  render() {
    const {
      state: { showDeleteDialuge, showNewUpsellForm, stagedUpsell, isNewUpsell },
      props: { upsells, products }
    } = this

    return (
      <React.Fragment>
        <FlexBoxesContainer className='space-between-elements'>
          <MainTitle >Upsells</MainTitle>
          <Button onClick={this.toggleNewUpsellForm} classes=' primary-color'>
            New Upsell
          </Button>
        </FlexBoxesContainer>
        <FlexBoxesContainer className='flex-wrap'>
          {upsells.map((upsell,id) => (
            <UpsellCard
              key={ids.generate()}
              orderInlist={id}
              {...upsell}
              linkedProduct={getProductById({ products, id: upsell.linkedProduct })}
              onDelete={this.toggleDeleteDialuge.bind(this, upsell._id)}
              onEdit={this.toggleEditUpsellForm.bind(this, upsell._id)}
            />
          ))}
        </FlexBoxesContainer>
        <DeleteDialuge
          onClose={this.toggleDeleteDialuge}
          show={showDeleteDialuge}
          onConfirm={this.onDeleteUpsell.bind(this, stagedUpsell.id)}
        />
        {showNewUpsellForm && <UpsellForm
          upsell={isNewUpsell ? {} : stagedUpsell}
          onClose={this.toggleNewUpsellForm}
          show={showNewUpsellForm}
          onConfirem={this.toggleNewUpsellForm}
        />}
      </React.Fragment>

    );
  }
}


const mapStateToProps = ({ products: { products }, upsells: { list: upsells } }) => ({
  upsells,
  products
})
export default connect(mapStateToProps, upsellsActions)(Upsells);
