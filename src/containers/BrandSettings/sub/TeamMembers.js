import React, { useState } from 'react';
import common from 'components/common';
import Table from 'components/common/Tables';
import { Modal } from 'components/Modals';
import * as teamMembersActions from 'actions/teamMembers';
import { connect } from 'react-redux';
import Dialog from 'components/common/Dialog';
import { notification } from 'libs';
const {
  SmallButton,
  MiniButton,
  Button,
  InputRow,
  MainTitle,
  MainBlock
} = common;

const AddNewButton = ({ onClick }) => (
  <Button onClick={onClick} className='primary-color'>
    <i className='fas fa-plus' />
    {' '}
    New Collaborators
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
        onFailed: (message) => {
          setShowDeleteModal(false);
          notification.failed(message);
        }
      }
    );
  };

  const onMemberActivationChange = (memberId, active) => {
    props.activateMember({ memberId, active: !active });
  };

  return (
    <MainBlock title='Collaborators'>
      <div className='d-col align-end'>
        <AddNewButton onClick={toggleModal} />
        {members.length !== 0
        && (
          <Table>
            <Table.Head>
              <Table.HeadCell>First Name</Table.HeadCell>
              <Table.HeadCell>Last Name</Table.HeadCell>
              <Table.HeadCell>Email Address</Table.HeadCell>
              <Table.HeadCell>status</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {
                members.map(({ member: { firstName, lastName, email, _id: memberId } = {}, active }, orderInList) => (
                  <Table.Row key={memberId} orderInList={orderInList} className='member-table-row blue'>
                    <Table.Cell mainContent={firstName || 'Not Set'} />
                    <Table.Cell mainContent={lastName || 'Not Set'} />
                    <Table.Cell mainContent={email} />
                    <Table.Cell>
                      <SmallButton
                        onClick={() => onMemberActivationChange(memberId, active)}
                        className={active ? 'green-color' : 'gray-bg'}
                      >
                        {active ? 'Active' : 'Inactive'}
                      </SmallButton>
                    </Table.Cell>
                    <MiniButton
                      toolTip='Delete'
                      className='table-row-delete-btn'
                      iconClass='fa-trash-alt'
                      onClick={() => setShowDeleteModal(memberId)}
                    />
                  </Table.Row>
                ))}
            </Table.Body>
            {showDeleteModal && (
              <Dialog
                title='Delete Team Member'
                description='Are you sure you want to delete this team member?'
                show
                onClose={() => setShowDeleteModal('')}
                confirmBtnText='Delete'
                onConfirm={() => onMemberDelete(showDeleteModal)}
              />
            )}
          </Table>
        )
        }
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
      </div>
    </MainBlock>
  );
};

const mapStateToProps = ({ teamMembers: { members, errors } }) => ({
  members: members || [],
  errors: errors || {}
});
export default connect(mapStateToProps, teamMembersActions)(TeamMembers);
