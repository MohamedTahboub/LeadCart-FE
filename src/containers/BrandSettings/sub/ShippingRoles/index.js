import React, { Fragment, useState } from 'react';
import clx from 'classnames';
import { connect } from 'react-redux';

import common from 'components/common';
import { notification } from 'libs';
import { isNewObjHasChange } from 'helpers/common';
import { ControlButtons, DeleteModal, Expandable } from './components';
import { fakeData } from './fakeData';

import './style.css';

const { Table, FlexBox, Button, Badge } = common;
const { Head, HeadCell, Body, Row, Cell } = Table;


const getNewNameWithNumber = (data = [], baseName = 'Name') => {
  const defaultNumbersName = data
    .filter(({ name }) => name.toLowerCase().includes(baseName.toLowerCase()))
    .map((ele) => Number(ele?.name.split(baseName)[1]))
    .sort((a, b) => a - b);

  const newDefaultNumber = defaultNumbersName.map((number, index) => {
    if (number !== index + 1)
      return index + 1;
  }).sort()[0] || defaultNumbersName.length + 1;

  return `${baseName} ${newDefaultNumber}`;
};


const ShippingRoles = ({ history }) => {
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


  const defaultShippingRole = (() => {
    const name = getNewNameWithNumber(fakeData, 'Shipping Role');
    return {
      name,
      costsPerZone: [
        {
          zone: '5f9832cf9b9fd77d030af88c',
          rate: 0
        }
      ]
    };
  })();

  const autoOpenEditMode = (data) => {
    setEditableShippingRoleId(data._id);
    const newObj = { ...data };
    delete newObj._id;
    delete newObj?.brand;
    delete newObj?.createdAt;
    delete newObj?.updatedAt;
    delete newObj?.__v;
    setFields(newObj);
    setSavedShippingRoleData(newObj);
  };

  const onAddNewShippingRole = () => {
    setLoading(true);
    setTimeout(() => {
      fakeData.push(defaultShippingRole);
      setLoading(false);
      notification.success('New shipping role added successfuly');
    }, 1500);
  };


  const onSave = () => {
    console.log('saved');
  };


  const onEditShippingRole = ({ name, costsPerZone, otherZonesCost = 0, enabled, _id }) => () => {
    const editableData = { name, enabled, costsPerZone, otherZonesCost };
    setCommentedEditableShippingRole({ name, enabled, costsPerZone, otherZonesCost, _id });
    if (shippingRoleHasChanges) {
      setCancelModalOpened(true);
    } else {
      setEditableShippingRoleId(_id);
      setSavedShippingRoleData(editableData);
      setFields(editableData);
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


  const onDeleteShippingRole = (taxId) => () => setDeleteShippingRoleId(taxId);
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

export default connect(mapStateToProps)(ShippingRoles);
