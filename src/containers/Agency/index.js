import React, { Component } from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import Modal from 'components/Modal';
const {
  MainTitle, SmallButton, Button, InputRow
} = common;

const AddNewButton = ({ onClick, ...props }) => (
  <Button onClick={onClick} classes='primary-color medium-add-btn explort-csv-btn'>
    <i className='fas fa-plus' />
    {' '}
        Add new
  </Button>
);

class Agency extends Component {
    state = { isModalVisable: false }

    toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

    render () {
      return (
        <React.Fragment>
          <MainTitle>Sub-Accounts</MainTitle>
          <Tabel>
            <Tabel.Head>
              <Tabel.HeadCell>First Name</Tabel.HeadCell>
              <Tabel.HeadCell>Last Name</Tabel.HeadCell>
              <Tabel.HeadCell>Email Address</Tabel.HeadCell>
              <Tabel.HeadCell>status</Tabel.HeadCell>
            </Tabel.Head>
            <Tabel.Body>
              <Tabel.Row>
                <Tabel.Cell
                  mainContent='Mohamed'
                />
                <Tabel.Cell
                  mainContent='Tahboub'
                />
                <Tabel.Cell
                  mainContent='mohamedtahboub@outlook.com'
                />
                <Tabel.Cell>
                  <SmallButton classes='green-color'>Active</SmallButton>
                </Tabel.Cell>
              </Tabel.Row>
            </Tabel.Body>
          </Tabel>
          <AddNewButton onClick={this.toggleModal} />
          <Modal onClose={this.toggleModal} isVisable={this.state.isModalVisable}>
            <MainTitle>Create Sub-Accounts</MainTitle>
            <InputRow>
              <InputRow.SmallInput>First Name</InputRow.SmallInput>
              <InputRow.SmallInput classes={['margin-left-30']}>Last Name</InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.NormalInput>Email address</InputRow.NormalInput>
            </InputRow>
            <Button classes='primary-color margin-with-float-right'>
              <i className='fas fa-plus' />
              {' '}
                        Invite
            </Button>
          </Modal>
        </React.Fragment>
      );
    }
}


export default Agency;
