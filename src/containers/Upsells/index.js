import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux'
import ids from 'shortid'
import UpsellForm from '../../components/UpsellForm';
import './style.css';
import * as upsellsActions from 'actions/upsells'
import UpsellCard from '../../components/UpsellCard'
import common from 'components/common';

const {
  InputRow,
  MainTitle,
  FlexBoxesContainer,
  Button,
  MainBlock,
  Page,
  PageHeader,
  PageContent
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


class Upsells extends Component {

  state = {
    editUpsell: ''
  }

  getProductById = (productId) => {
    const product = this.props.products.find(({ _id }) => _id === productId)

    return product ? { productName: product.name, productLink: product.url } : {}
  }

  showUpsellEditForm = editUpsell => {
    this.setState({ editUpsell });
  }
  hideUpsellEditFrom = () => {
    this.setState({ editUpsell: '' });
  }
  render() {
    const { editUpsell } = this.state
    const { upsells } = this.props

    return (
      <Page>
        <PageHeader className='space-between-elements'>
          <MainTitle >Upsells</MainTitle>
          <NewUpsell />
        </PageHeader>
        <PageContent className='flex-wrap'>
          {upsells.map((upsell, id) => (
            <UpsellCard
              key={ids.generate()}
              orderInlist={id}
              upsell={upsell}
              onEdit={this.showUpsellEditForm.bind(this, upsell._id)}
              linkedProduct={this.getProductById(upsell.linkedProduct)}
            />
          ))}
        </PageContent>
        {editUpsell && (
          <UpsellForm
            show={editUpsell}
            updateForm
            onClose={this.hideUpsellEditFrom}
          />
        )}
      </Page>
    );
  }
}


const mapStateToProps = ({ products: { products }, upsells: { list: upsells } }) => ({
  upsells,
  products
})
export default connect(mapStateToProps, upsellsActions)(Upsells);
