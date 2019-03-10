import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux'
import ids from 'shortid'
import { Modal } from 'components/Modals';
import UpsellForm from '../../components/UpsellForm';
import './style.css';
import * as upsellsActions from 'actions/upsells'
import UpsellCard from 'components/UpsellCard'
import common from 'components/common';

const {
  InputRow, MainTitle, FlexBoxesContainer, Button, MainBlock
} = common;


const NewUpsell = () => {
  const [show, setShow] = useState(false)

  const onToggleShow = () => {
    setShow(!show)
  }
  return (
    <Fragment>
      <Button onClick={onToggleShow} className='primary-color'>
        <i className='fas fa-plus' />
        {' '}
        new upsell
    </Button>
      <UpsellForm show={show} onClose={onToggleShow} />
    </Fragment>
  );
}


const Upsells = ({ upsells, products }) =>{

// toggleDeleteDialuge = (id) => {
//   const { stagedUpsell } = this.state
//   this.setState({ showDeleteDialuge: !this.state.showDeleteDialuge, stagedUpsell: { ...stagedUpsell, id } });
// }

// toggleUpsellEditablePreview = () => {
//   this.setState({ showUpsellEditablePreview: !this.state.showUpsellEditablePreview });
// }

// openNewUpsellForm = () => {
//   this.setState({
//     showNewUpsellForm: true,
//     isNewUpsell: true
//   });
// }

// toggleEditUpsellForm = (id) => {
//   this.setState({
//     showNewUpsellForm: !this.state.showNewUpsellForm,
//     isNewUpsell: false,
//     stagedUpsell: this.props.upsells.find(({ _id }) => _id === id) || {}
//   });

// }
// onDeleteUpsell = id => {
//   const { stagedUpsell } = this.state
//   this.setState({
//     stagedUpsell: {
//       ...stagedUpsell,
//       deleted: true
//     }
//   })
//   this.props.deleteUpsell(id);
// }
// componentDidMount() {
//   // this.props.getUpsells()
// }

const getProductById = (productId) => {
  const product = products.find(({ _id }) => _id === productId)

  return product ? { productName: product.name, productLink: product.url } : {}
}

return (
  <React.Fragment>
    <FlexBoxesContainer className='space-between-elements'>
      <MainTitle >Upsells</MainTitle>
      <NewUpsell />
    </FlexBoxesContainer>
    <FlexBoxesContainer className='flex-wrap'>
      {upsells.map((upsell, id) => (
        <UpsellCard
          key={ids.generate()}
          orderInlist={id}
          upsell={upsell}
          linkedProduct={getProductById(upsell.linkedProduct)}
        />
      ))}
    </FlexBoxesContainer>
  </React.Fragment>
);
}


const mapStateToProps = ({ products: { products }, upsells: { list: upsells } }) => ({
  upsells,
  products
})
export default connect(mapStateToProps, upsellsActions)(Upsells);
