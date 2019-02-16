import React, { Component } from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import Modal from 'components/Modal';
import * as teamMembersActions from 'actions/teamMembers';
import { connect } from 'react-redux';
const {
  SmallButton, Button, InputRow, MainTitle
} = common;

const AddNewButton = ({ onClick }) => (
  <Button onClick={onClick} classes='primary-color medium-add-btn explort-csv-btn extra-margin-top'>
    <i className='fas fa-plus' />
    {' '}
    Add new member
  </Button>
);
class TeamMembers extends Component {
  state = { isModalVisable: false, newMemberModel: {} }

  toggleModal = () => this.setState({ isModalVisable: !this.state.isModalVisable })

  onFieldChange = ({ target: { name, value } }) => {
    this.setState({
      newMemberModel: {
        ...this.state.newMemberModel,
        [name]: value
      }
    });
  }

  createNewMember = () => {
    this.props.onCreateNewMember(this.state.newMemberModel);
    setTimeout(() => {
      this.toggleModal();
    }, 350);
  }

  render () {
    const { errors } = this.props;
    return (
      <React.Fragment>
        {this.props.members.length !== 0
          && (
            <Tabel>
              <Tabel.Head>
                <Tabel.HeadCell>First Name</Tabel.HeadCell>
                <Tabel.HeadCell>Last Name</Tabel.HeadCell>
                <Tabel.HeadCell>Email Address</Tabel.HeadCell>
                <Tabel.HeadCell>status</Tabel.HeadCell>
              </Tabel.Head>
              <Tabel.Body>
                {this.props.members.map(({
                  member: {
                    firstName, lastName, email, _id: id
                  } = {}, active
                }) => (
                  <Tabel.Row key={id}>
                    <Tabel.Cell mainContent={firstName || 'Not Set'} />
                    <Tabel.Cell mainContent={lastName || 'Not Set'} />
                    <Tabel.Cell mainContent={email} />
                    <Tabel.Cell>
                      {active
                        ? <SmallButton onClick={this.props.activateMember.bind(this, id)} classes='green-color'>Active</SmallButton>
                        : <SmallButton onClick={this.props.activateMember.bind(this, id)} classes='gray-color'>Inactive</SmallButton>
                      }
                    </Tabel.Cell>
                  </Tabel.Row>
                ))}
              </Tabel.Body>
            </Tabel>
          )
        }
        <AddNewButton onClick={this.toggleModal} />
        <Modal onClose={this.toggleModal} isVisible={this.state.isModalVisable}>
          <MainTitle>Create New Team member</MainTitle>
          <InputRow>
            <InputRow.SmallInput name='firstName' onChange={this.onFieldChange} error={errors.firstName}>First Name</InputRow.SmallInput>
            <InputRow.SmallInput name='lastName' onChange={this.onFieldChange} error={errors.lastName} className='margin-left-30'>Last Name</InputRow.SmallInput>
          </InputRow>
          <InputRow>
            <InputRow.NormalInput name='email' onChange={this.onFieldChange} error={errors.email}>Email address</InputRow.NormalInput>
          </InputRow>
          {errors.message && <span className='error-message'>{errors.message}</span>}
          <Button onClick={this.createNewMember} classes='primary-color margin-with-float-right'>
            <i className='fas fa-plus' />
            {' '}
            Create
          </Button>
        </Modal>
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ teamMembers: { members, errors } }) => ({
  members: members || [],
  errors: errors || {}
});
export default connect(mapStateToProps, teamMembersActions)(TeamMembers);
