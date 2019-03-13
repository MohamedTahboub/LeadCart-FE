import React, { Component } from 'react';

import { Modal } from 'components/Modals';

import common from 'components/common';
const {
  NewThingCard, MainTitle, InputRow, Button
} = common;

class Funnels extends Component {
  state = {
    isModalVisable: false
  }

  toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

  render () {
    return (
      <div>
        <NewThingCard onClick={this.toggleModal} thing='Funnels' />
        <Modal onClose={this.toggleModal} isVisible={this.state.isModalVisable}>
          <MainTitle>Create Upsell</MainTitle>
          <InputRow>
            <InputRow.Label>Upsell name</InputRow.Label>
            <InputRow.SmallInput></InputRow.SmallInput>
          </InputRow>
          <InputRow>
            <InputRow.Label>Upsell description</InputRow.Label>
            <InputRow.TextAreaInput></InputRow.TextAreaInput>
          </InputRow>
          <InputRow>
            <InputRow.Label>Choose a product</InputRow.Label>
            <InputRow.SmallInput></InputRow.SmallInput>
          </InputRow>
          <Button className='primary-color margin-with-float-right'>
            <i className='fas fa-plus' />
            {' '}
            New Upsells
          </Button>
        </Modal>
      </div>
    );
  }
}

export default Funnels;
