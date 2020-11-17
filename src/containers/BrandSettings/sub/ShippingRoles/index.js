import React, { Fragment, useState } from 'react';
import clx from 'classnames';
import { connect } from 'react-redux';

import { notification } from 'libs';
import shippingRolesSchema from 'libs/validation/shippingRoles';
import * as shippingRolesActions from 'actions/shippingRoles';
import { getNewNameWithNumber, isNewObjHasChange } from 'helpers/common';
import common from 'components/common';
import { ControlButtons, DeleteModal, Expandable } from './components';
import { fakeData } from './fakeData';

import './style.css';

const { Table, FlexBox, Button, Badge } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;


const ShippingRoles = ({ history, editShippingRole, addNewShippingRole }) => {
  const [savedShippingRoleData, setSavedShippingRoleData] = useState({});
  const [fields, setFields] = useState({});
  const [editableShipingRoleId, setEditableShippingRoleId] = useState('');
  const [deleteShippingRoleId, setDeleteShippingRoleId] = useState('');
  const [cancelModalOpened, setCancelModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [commentedEditableShippingRole, setCommentedEditableShippingRole] = useState('');

  const onChange = ({ target: { value, name } }) => setFields({ ...fields, [name]: value });
  const shippingRoleHasChanges = isNewObjHasChange(savedShippingRoleData, fields);

  const autoOpenEditMode = async (data) => {
    const { value } = await shippingRolesSchema(data);
    setEditableShippingRoleId(data._id);
    setFields(value);
    setSavedShippingRoleData(value);
  };


  const defaultShippingRole = (() => {
    const name = getNewNameWithNumber({ data: fakeData, baseName: 'shipping role', isCapitalized: true });
    return {
      name,
      costsPerZone: [
        {
          zone: '5f9832cf9b9fd77d030af88c',
          cost: 0
        }
      ]
    };
  })();


  const onAddNewShippingRole = () => {
    setLoading(true);
    addNewShippingRole(
      defaultShippingRole,
      {
        onSuccess: (data) => {
          setLoading(false);
          autoOpenEditMode(data);
          notification.success('New Shipping Role added successfuly');
        },
        onFailed: (message) => {
          setLoading(false);
          notification.failed(message);
        }
      }
    );
  };


  const onSave = async () => {
    setSaveLoading(true);
    const inTheSameExpandable = commentedEditableShippingRole._id === editableShipingRoleId;
    const { isValid, value, message } = await shippingRolesSchema(fields);

    if (isValid) {
      editShippingRole(
        { shippingRole: editableShipingRoleId, details: value },
        {
          onSuccess: () => {
            setSaveLoading(false);
            setSavedShippingRoleData(fields);
            if (cancelModalOpened) setCancelModalOpened(false);

            if (inTheSameExpandable)
              setEditableShippingRoleId('');
            else
              autoOpenEditMode(commentedEditableShippingRole);

            notification.success('You Change edited successfuly');
          },
          onFailed: (message) => {
            setSaveLoading(false);
            notification.failed(message);
          }
        }
      );
    } else {
      notification.failed(message);
      setSaveLoading(false);
    }

  };


  const onEditShippingRole = (shippingRoleData = {}) => async () => {
    const { value } = await shippingRolesSchema(shippingRoleData);
    setCommentedEditableShippingRole({ ...value, _id: shippingRoleData._id });
    if (shippingRoleHasChanges) {
      setCancelModalOpened(true);
    } else {
      setEditableShippingRoleId(shippingRoleData._id);
      setSavedShippingRoleData(value);
      setFields(value);
    }
  };


  const onConfirmCancelEdits = () => {
    if (shippingRoleHasChanges)
      setCancelModalOpened(true);
    else
      setEditableShippingRoleId('');
  };

  const onCancelEdits = () => {
    const inTheSameExpandable = commentedEditableShippingRole._id === editableShipingRoleId;
    setFields(savedShippingRoleData);
    setCancelModalOpened(false);

    if (inTheSameExpandable) {
      setEditableShippingRoleId('');
    } else {
      const targetedOffset = document.getElementById(commentedEditableShippingRole?._id).offsetTop;
      commentedEditableShippingRole?._id && history.push(`/settings/shippingRoles#${commentedEditableShippingRole?._id}`);
      commentedEditableShippingRole?._id && window.scrollTo({ top: targetedOffset, behavior: 'smooth' });
      setEditableShippingRoleId(commentedEditableShippingRole._id);
    }
  };


  const onDeleteShippingRole = (shippingRoleId) => () => setDeleteShippingRoleId(shippingRoleId);
  const onCancelDeleteShippingRole = () => setDeleteShippingRoleId('');
  const onCloseCancelModal = () => setCancelModalOpened(false);


  const getShippingRoleState = (enabled) => (
    <Badge type={enabled ? 'primary' : 'secondary'}>
      {enabled ? 'Enabled' : 'Disabled'}
    </Badge>
  );

  const deleteModalOpend = Boolean(deleteShippingRoleId);

  const ExpandableProps = {
    onSave,
    onConfirmCancelEdits,
    saveLoading,
    setEditableShippingRoleId,
    onChange,
    fields,
    savedShippingRoleData,
    onCloseCancelModal,
    cancelModalOpened,
    onCancelEdits,
    editableShipingRoleId
  };


  return (
    <FlexBox className='shipping-roles-container' column>
      <FlexBox flexEnd className='my-2'>
        <FlexBox className='v-center'>
          <Button className='primary-color' onClick={onAddNewShippingRole} disabled={loading} onprogress={loading} >Add new Shipping Schema</Button>
        </FlexBox>
      </FlexBox>

      <Table className='shipping-roles-table mt-4'>
        <Head>
          <HeadCell>Shipping Name</HeadCell>
          <HeadCell>state</HeadCell>
          <HeadCell>Control</HeadCell>
        </Head>

        <Body>
          {fakeData.map((shippingRole) => {
            const { name, enabled, _id } = shippingRole;
            const isEditableShippingRole = editableShipingRoleId === _id;
            const controlButtonsProps = { isEditableShippingRole, onDeleteShippingRole, editableShipingRoleId, shippingRoleHasChanges, onEditShippingRole, shippingRole, onConfirmCancelEdits, _id, saveLoading, onSave };

            return (
              <Fragment key={_id}>
                <Row className={clx('shipping-roles-table-row', { open: isEditableShippingRole })} id={_id}>
                  <Cell>{name}</Cell>
                  <Cell>{getShippingRoleState(enabled)}</Cell>
                  <Cell>
                    <ControlButtons {...controlButtonsProps} />
                  </Cell>
                </Row>
                <Expandable
                  open={isEditableShippingRole}
                  shippingRoleId={_id}
                  {...ExpandableProps}
                />
              </Fragment>
            );
          })}
        </Body>
      </Table>

      <DeleteModal shippingRoleId={deleteShippingRoleId} onClose={onCancelDeleteShippingRole} isVisible={deleteModalOpend} />
    </FlexBox>
  );
};

const mapStateToProps = ({ shippingRoles = {} }) => ({ shippingRoles });

export default connect(mapStateToProps, shippingRolesActions)(ShippingRoles);
