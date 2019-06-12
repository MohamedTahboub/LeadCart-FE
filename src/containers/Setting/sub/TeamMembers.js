import React, { Component, useState } from 'react';
import common from 'components/common';
import Tabel from 'components/common/Tabels';
import { Modal } from 'components/Modals';
import * as teamMembersActions from 'actions/teamMembers';
import { connect } from 'react-redux';
import Dialog from 'components/common/Dialog';
import * as flashMessages from 'actions/flashMessage';
const {
  SmallButton,
  MiniButton,
  Button,
  InputRow,
  MainTitle
} = common;

const AddNewButton = ({ onClick }) => (
  <Button onClick={onClick} className='primary-color medium-add-btn explort-csv-btn extra-margin-top'>
    <i className='fas fa-plus' />
    {' '}
    Add new member
  </Button>
);

const TeamMembers = ({ members = [], ...props }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newMember, setNewMember] = useState({});
  const [errors, setErrors] = useState({});

  const toggleModal = () => setShowCreateModal(!showCreateModal);


  const onFieldChange = ({ target: { name, value } }) => {
    setNewMember({
      ...newMember,
      [name]: value
    });
    setErrors({});
  };

  const createNewMember = () => {
    props.onCreateNewMember(
      newMember,
      {
        onSuccess: () => {
          setShowCreateModal(false);
        },
        onFailed: (err) => {
          setErrors({ modal: err });
        }
      }
    );
  };

  const onMemberDelete = (memberId) => {
    props.deleteMember(
      { memberId },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
        },
        onFailed: (err) => {
          setShowDeleteModal(false);
          props.showFlashMessage({
            type: 'failed',
            message: err
          });
        }
      }
    );
  };


  return (
    <React.Fragment>
      {members.length !== 0
        && (
          <Tabel>
            <Tabel.Head>
              <Tabel.HeadCell>First Name</Tabel.HeadCell>
              <Tabel.HeadCell>Last Name</Tabel.HeadCell>
              <Tabel.HeadCell>Email Address</Tabel.HeadCell>
              <Tabel.HeadCell>status</Tabel.HeadCell>
            </Tabel.Head>
            <Tabel.Body>
              {members.map(({
                member: {
                  firstName, lastName, email, _id: id
                } = {}, active
              }, orderInList) => (
                <Tabel.Row key={id} orderInList={orderInList} className='member-table-row'>
                  <Tabel.Cell mainContent={firstName || 'Not Set'} />
                  <Tabel.Cell mainContent={lastName || 'Not Set'} />
                  <Tabel.Cell mainContent={email} />
                  <Tabel.Cell>
                    <SmallButton
                      onClick={props.activateMember.bind(this, { id, active: !active })}
                      className={active ? 'green-color' : 'gray-color'}
                    >
                      {active ? 'Active' : 'Inactive'}
                    </SmallButton>
                  </Tabel.Cell>
                  <MiniButton
                    toolTip='Delete'
                    className='table-row-delete-btn'
                    iconClass='fa-trash-alt'
                    onClick={() => setShowDeleteModal(id)}
                  />
                </Tabel.Row>
              ))}
            </Tabel.Body>
            {showDeleteModal && (
              <Dialog
                title='Member Deletion'
                description='Are you sure,you want to delete this member?'
                show
                onClose={() => setShowDeleteModal('')}
                confirmBtnText='Delete'
                onConfirm={() => onMemberDelete(showDeleteModal)}
              />
            )}
          </Tabel>
        )
      }
      <AddNewButton onClick={toggleModal} />
      <Modal onClose={toggleModal} isVisible={showCreateModal}>
        <MainTitle>Create New Team member</MainTitle>
        <InputRow>
          <InputRow.Label error={errors.firstName}>First Name:</InputRow.Label>
          <InputRow.SmallInput
            name='firstName'
            onChange={onFieldChange}
            error={errors.firstName}
            className='margin-left-30 reset-font-size'
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.lastName}>Last Name:</InputRow.Label>
          <InputRow.SmallInput
            name='lastName'
            onChange={onFieldChange}
            error={errors.lastName}
            className='margin-left-30 reset-font-size'
          />
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.email}>Email Address:</InputRow.Label>
          <InputRow.SmallInput
            name='email'
            onChange={onFieldChange}
            error={errors.lastName}
            className='margin-left-30 reset-font-size'
          />
        </InputRow>
        {errors.modal && <span className='error-message'>{errors.modal}</span>}
        <Button onClick={createNewMember} className='primary-color margin-with-float-right'>
          <i className='fas fa-plus' />
          {' '}
          Create
        </Button>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = ({ teamMembers: { members, errors } }) => ({
  members: members || [],
  errors: errors || {}
});
export default connect(mapStateToProps, { ...teamMembersActions, ...flashMessages })(TeamMembers);
