import React, { Component } from 'react';

import Modal from 'components/Modal';
import common from 'components/common';

const {
  NewThingCard, MainTitle, InputRow, Button
} = common;

class Upsells extends Component {
    state = {
      isModalVisable: false
    }

    toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

    render () {
      return (
        <div>
          <NewThingCard onClick={this.toggleModal} thing='Upsell' />
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
            <Button classes='primary-color margin-with-float-right'>
              <i className='fas fa-plus' />
              {' '}
Create Upsells
            </Button>
          </Modal>
        </div>
      );
    }
}

export default Upsells;
